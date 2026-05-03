package com.jiangjie.dto;

import jakarta.validation.constraints.*;
import java.math.BigDecimal;

/**
 * 添加商品到购物车DTO
 */
public class AddToCartDTO {
    
    @NotNull(message = "用户ID不能为空")
    private Integer userId;
    
    @NotNull(message = "商品ID不能为空")
    private Integer productId;
    
    @Min(value = 1, message = "商品数量必须大于0")
    @Max(value = 999, message = "商品数量不能超过999")
    private Integer quantity;
    
    private String productName;
    
    private String productCover;
    
    private BigDecimal price;
    
    private String category;
    
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
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
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
    
    public BigDecimal getPrice() {
        return price;
    }
    
    public void setPrice(BigDecimal price) {
        this.price = price;
    }
    
    public String getCategory() {
        return category;
    }
    
    public void setCategory(String category) {
        this.category = category;
    }
}