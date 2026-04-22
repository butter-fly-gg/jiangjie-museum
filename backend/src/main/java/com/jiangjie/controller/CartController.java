package com.jiangjie.controller;

import com.jiangjie.common.Result;
import com.jiangjie.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    /**
     * 添加商品到购物车
     */
    @PostMapping("/add")
    public Result<?> addToCart(@RequestBody Map<String, Object> params) {
        Integer userId = toInteger(params.get("userId"));
        Integer productId = toInteger(params.get("productId"));
        Integer quantity = toInteger(params.get("quantity"));
        String productName = (String) params.get("productName");
        String productCover = (String) params.get("productCover");
        Object priceRaw = params.get("price");
        String category = (String) params.get("category");
        
        if (userId == null || productId == null) {
            return Result.error("参数错误");
        }
        if (quantity == null || quantity <= 0) {
            quantity = 1;
        }

        return cartService.addToCart(userId, productId, quantity, productName, productCover, priceRaw, category);
    }

    private Integer toInteger(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof Integer) {
            return (Integer) value;
        }
        try {
            return Integer.parseInt(String.valueOf(value));
        } catch (NumberFormatException e) {
            return null;
        }
    }
    
    /**
     * 获取购物车列表
     */
    @GetMapping("/list/{userId}")
    public Result<?> getCartList(@PathVariable Integer userId) {
        return cartService.getCartList(userId);
    }
    
    /**
     * 更新购物车商品数量
     */
    @PutMapping("/update")
    public Result<?> updateCartQuantity(@RequestBody Map<String, Integer> params) {
        Integer cartId = params.get("cartId");
        Integer quantity = params.get("quantity");
        
        if (cartId == null || quantity == null) {
            return Result.error("参数错误");
        }
        
        return cartService.updateCartQuantity(cartId, quantity);
    }
    
    /**
     * 删除购物车商品
     */
    @DeleteMapping("/delete/{cartId}")
    public Result<?> deleteCartItem(@PathVariable Integer cartId) {
        return cartService.deleteCartItem(cartId);
    }
    
    /**
     * 清空购物车
     */
    @DeleteMapping("/clear/{userId}")
    public Result<?> clearCart(@PathVariable Integer userId) {
        return cartService.clearCart(userId);
    }
}
