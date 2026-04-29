package com.jiangjie.service;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.jiangjie.entity.Reservation;
import com.jiangjie.mapper.ReservationMapper;
import org.springframework.stereotype.Service;

@Service
public class ReservationService extends ServiceImpl<ReservationMapper, Reservation> {
    // 里面什么都不用写，和其他Service保持一致
}