package com.jiangjie.dto;

import jakarta.validation.constraints.*;
import java.util.List;

/**
 * 从购物车创建订单DTO
 */
// AI辅助生成：qwen, 2026-5-03
public class CreateOrderFromCartDTO {
    
    @NotNull(message = "用户ID不能为空")
    private Integer userId;
    
    @NotEmpty(message = "购物车ID列表不能为空")
    private List<Integer> cartIds;
    
    @NotBlank(message = "收货人姓名不能为空")
    @Size(max = 50, message = "收货人姓名长度不能超过50个字符")
    private String receiverName;
    
    @NotBlank(message = "收货人手机号不能为空")
    @Pattern(regexp = "^1[3-9]\\d{9}$", message = "手机号格式不正确")
    private String receiverPhone;
    
    @NotBlank(message = "收货地址不能为空")
    @Size(max = 200, message = "收货地址长度不能超过200个字符")
    private String receiverAddress;
    
    public Integer getUserId() {
        return userId;
    }
    
    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    
    public List<Integer> getCartIds() {
        return cartIds;
    }
    
    public void setCartIds(List<Integer> cartIds) {
        this.cartIds = cartIds;
    }
    
    public String getReceiverName() {
        return receiverName;
    }
    
    public void setReceiverName(String receiverName) {
        this.receiverName = receiverName;
    }
    
    public String getReceiverPhone() {
        return receiverPhone;
    }
    
    public void setReceiverPhone(String receiverPhone) {
        this.receiverPhone = receiverPhone;
    }
    
    public String getReceiverAddress() {
        return receiverAddress;
    }
    
    public void setReceiverAddress(String receiverAddress) {
        this.receiverAddress = receiverAddress;
    }
}