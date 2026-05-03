package com.jiangjie.controller;

import com.jiangjie.common.Result;
import com.jiangjie.dto.AddToCartDTO;
import com.jiangjie.dto.UpdateCartQuantityDTO;
import com.jiangjie.service.CartService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    
    @Autowired
    private CartService cartService;
    
    /**
     * 添加商品到购物车
     */
    // AI辅助生成：Qwen3.5, 2026-4-22
    @PostMapping("/add")
    public Result<?> addToCart(@Valid @RequestBody AddToCartDTO addToCartRequest) {
        return cartService.addToCart(addToCartRequest);
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
    public Result<?> updateCartQuantity(@Valid @RequestBody UpdateCartQuantityDTO updateRequest) {
        return cartService.updateCartQuantity(updateRequest);
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
