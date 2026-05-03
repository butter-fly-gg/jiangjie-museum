package com.jiangjie.dto;

import jakarta.validation.constraints.*;

/**
 * 更新购物车商品数量DTO
 */
public class UpdateCartQuantityDTO {
    
    @NotNull(message = "购物车ID不能为空")
    private Integer cartId;
    
    @Min(value = 1, message = "商品数量必须大于0")
    @Max(value = 999, message = "商品数量不能超过999")
    private Integer quantity;
    
    public Integer getCartId() {
        return cartId;
    }
    
    public void setCartId(Integer cartId) {
        this.cartId = cartId;
    }
    
    public Integer getQuantity() {
        return quantity;
    }
    
    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}