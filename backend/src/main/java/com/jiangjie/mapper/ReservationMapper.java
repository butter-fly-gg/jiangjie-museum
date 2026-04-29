package com.jiangjie.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.jiangjie.entity.Reservation;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface ReservationMapper extends BaseMapper<Reservation> {
    // MyBatis-Plus 已经提供了基本的 CRUD，这里暂时不需要写代码
}