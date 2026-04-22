package com.jiangjie.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("orders")
public class Order {
    
    @TableId(type = IdType.AUTO)
    private Integer id;
    
    private Integer userId;
    
    private String orderNo;
    
    private BigDecimal totalPrice;

    private String status;
    
    private String receiverName;
    
    private String receiverPhone;
    
    private String receiverAddress;
    
    private LocalDateTime createTime;
    
    private LocalDateTime updateTime;
}
