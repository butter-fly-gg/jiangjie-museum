package com.jiangjie.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@TableName("product")
public class Product {
    
    @TableId(type = IdType.AUTO)
    private Integer id;
    
    private String name;
    
    private String cover;
    
    private BigDecimal price;
    
    private BigDecimal originalPrice;
    
    private Integer stock;
    
    private Integer sales;
    
    private String description;
    
    private String category;
    
    private String tags;
    
    private Integer sort;
    
    private LocalDateTime createTime;
}
