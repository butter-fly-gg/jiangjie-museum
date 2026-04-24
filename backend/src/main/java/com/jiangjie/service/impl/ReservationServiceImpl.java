package com.jiangjie.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jiangjie.entity.Reservation;
import com.jiangjie.mapper.ReservationMapper;
import com.jiangjie.service.ReservationService;
import org.springframework.stereotype.Service;

@Service
public class ReservationServiceImpl extends ServiceImpl<ReservationMapper, Reservation> implements ReservationService {
    // 继承 ServiceImpl 后，save, update, remove 等方法可以直接使用
}