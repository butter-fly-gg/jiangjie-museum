package com.jiangjie.controller;

import com.jiangjie.common.Result;
import com.jiangjie.entity.Reservation;
import com.jiangjie.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/api/reservation")
@CrossOrigin
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/add")
    public Result<Reservation> addReservation(@RequestBody Reservation reservation) {
        try {
            // 1. 必填校验
            if (reservation.getUserId() == null) {
                return Result.error("用户未登录");
            }
            if (reservation.getVenueId() == null) {
                return Result.error("请选择预约场馆");
            }
            if (reservation.getPhone() == null || reservation.getPhone().isEmpty()) {
                return Result.error("请填写预约手机号");
            }
            if (reservation.getPeopleCount() == null || reservation.getPeopleCount() < 1) {
                return Result.error("请选择有效同行人数");
            }
            if (reservation.getVisitDate() == null) {
                return Result.error("请选择预约日期");
            }

            // 2. 验证 venueId 是否存在
            // 注意：这里需要注入 VenueService，如果还没有创建，可以先注释掉这部分验证
            // Venue venue = venueService.getById(reservation.getVenueId());
            // if (venue == null) {
            //     return Result.error("场馆不存在，请选择有效的场馆");
            // }

            // 3. 设置默认值
            reservation.setStatus("pending");
            reservation.setCreateTime(LocalDateTime.now());
            reservation.setUpdateTime(LocalDateTime.now());
            reservation.setVerifyCode("V-" + (System.currentTimeMillis() % 1000000));
            reservation.setQrcodeUrl("/qrcode/" + reservation.getVerifyCode());

            // 4. 保存
            boolean saveSuccess = reservationService.save(reservation);
            if (!saveSuccess) {
                return Result.error("预约信息保存失败");
            }

            return Result.success("预约成功，请前往我的页面查看", reservation);

        } catch (Exception e) {
            e.printStackTrace();
            return Result.error("系统繁忙，请稍后再试：" + e.getMessage());
        }
    }

    // 获取预约详情
    @GetMapping("/detail/{id}")
    public Result<Reservation> getReservationDetail(@PathVariable Integer id) {
        Reservation reservation = reservationService.getById(id);
        if (reservation == null) {
            return Result.error("预约不存在");
        }
        return Result.success(reservation);
    }

    // 取消预约
    @PutMapping("/cancel/{id}")
    public Result<String> cancelReservation(@PathVariable Integer id) {
        Reservation reservation = reservationService.getById(id);
        if (reservation == null) {
            return Result.error("预约不存在");
        }
        reservation.setStatus("cancelled");
        reservation.setUpdateTime(LocalDateTime.now());
        boolean updated = reservationService.updateById(reservation);
        if (updated) {
            return Result.success("预约已取消");
        } else {
            return Result.error("取消失败");
        }
    }
}