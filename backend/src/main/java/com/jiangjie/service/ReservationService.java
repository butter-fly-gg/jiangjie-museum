package com.jiangjie.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.jiangjie.entity.Reservation;

public interface ReservationService extends IService<Reservation> {
    // 如果需要复杂的业务逻辑（比如检查库存、生成核销码），可以在这里定义方法
}