package com.jiangjie.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("reservation") // 对应数据库表名
public class Reservation {

    @TableId(type = IdType.AUTO)
    private Integer id;

    private Integer userId;       // 用户ID
    private Integer venueId;      // 场馆ID
    private String phone;         // 手机号
    private java.sql.Date visitDate; // 预约日期
    private String visitTime;     // 时间段
    private Integer peopleCount;  // 人数
    private String status;        // 状态
    private String verifyCode;    // 核销码
    private String qrcodeUrl;     // 二维码
    private BigDecimal totalPrice;// 总价

    private LocalDateTime createTime;
    private LocalDateTime updateTime;
}