package com.jiangjie.controller;

import com.jiangjie.common.Result;
import com.jiangjie.dto.CreateOrderFromCartDTO;
import com.jiangjie.dto.CreateDirectOrderDTO;
import com.jiangjie.dto.SettleOrderDTO;
import com.jiangjie.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

// AI辅助生成：Qwen3.5, 2026-4-22
@RestController
@RequestMapping("/api/order")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    /**
     * 从购物车创建订单
     */
    @PostMapping("/create")
    public Result<?> createOrder(@Valid @RequestBody CreateOrderFromCartDTO createRequest) {
        return orderService.createOrderFromCart(createRequest);
    }

    /**
     * 从商品页直接创建订单
     */
    @PostMapping("/create-direct")
    public Result<?> createDirectOrder(@Valid @RequestBody CreateDirectOrderDTO createRequest) {
        return orderService.createDirectOrder(createRequest);
    }
    
    /**
     * 获取用户订单列表
     */
    @GetMapping("/list/{userId}")
    public Result<?> getUserOrders(@PathVariable Integer userId) {
        return orderService.getUserOrders(userId);
    }
    
    /**
     * 获取订单详情
     */
    @GetMapping("/detail/{orderId}")
    public Result<?> getOrderDetail(@PathVariable Integer orderId, @RequestParam Integer userId) {
        return orderService.getOrderDetail(orderId, userId);
    }
    
    /**
     * 取消订单
     */
    @PutMapping("/cancel/{orderId}")
    public Result<?> cancelOrder(@PathVariable Integer orderId, @RequestParam Integer userId) {
        return orderService.cancelOrder(orderId, userId);
    }

    /**
     * 结算订单并补充收货信息
     */
    @PutMapping("/settle/{orderId}")
    public Result<?> settleOrder(@PathVariable Integer orderId, @RequestParam Integer userId,
                                 @Valid @RequestBody SettleOrderDTO settleRequest) {
        return orderService.settleOrder(orderId, userId, settleRequest);
    }

    /**
     * 删除订单
     */
    @DeleteMapping("/delete/{orderId}")
    public Result<?> deleteOrder(@PathVariable Integer orderId, @RequestParam Integer userId) {
        return orderService.deleteOrder(orderId, userId);
    }
}
