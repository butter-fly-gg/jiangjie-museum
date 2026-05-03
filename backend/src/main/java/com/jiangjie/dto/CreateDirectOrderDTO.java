package com.jiangjie.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

/**
 * 直接创建订单DTO
 */
// AI辅助生成：qwen3.5, 2026-5-03
public class CreateDirectOrderDTO {

    @NotNull(message = "用户ID不能为空")
    private Integer userId;
    
    private Integer productId;
    
    @NotBlank(message = "商品名称不能为空")
    @Size(max = 100, message = "商品名称长度不能超过100个字符")
    private String productName;
    
    private String productCover;
    
    @NotNull(message = "商品单价不能为空")
    private BigDecimal unitPrice;
    
    @Min(value = 1, message = "商品数量必须大于0")
    @Max(value = 999, message = "商品数量不能超过999")
    private Integer quantity;
    
    public Integer getUserId() {
        return userId;
    }
    
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    
    public Integer getProductId() {
        return productId;
    }
    
    public void setProductId(Integer productId) {
        this.productId = productId;
    }
    
    public String getProductName() {
        return productName;
    }
    
    public void setProductName(String productName) {
        this.productName = productName;
    }
    
    public String getProductCover() {
        return productCover;
    }
    
    public void setProductCover(String productCover) {
        this.productCover = productCover;
    }
    
    public BigDecimal getUnitPrice() {
        return unitPrice;
    }
    
    public void setUnitPrice(BigDecimal unitPrice) {
        this.unitPrice = unitPrice;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}