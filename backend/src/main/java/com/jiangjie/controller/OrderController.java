package com.jiangjie.controller;

import com.jiangjie.common.Result;
import com.jiangjie.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    
    @Autowired
    private OrderService orderService;
    
    /**
     * 从购物车创建订单
     */
    @PostMapping("/create")
    public Result<?> createOrder(@RequestBody Map<String, Object> params) {
        Integer userId = (Integer) params.get("userId");
        List<Integer> cartIds = (List<Integer>) params.get("cartIds");
        String receiverName = (String) params.get("receiverName");
        String receiverPhone = (String) params.get("receiverPhone");
        String receiverAddress = (String) params.get("receiverAddress");
        
        if (userId == null || cartIds == null || cartIds.isEmpty()) {
            return Result.error("参数错误");
        }
        
        return orderService.createOrderFromCart(userId, cartIds, receiverName, receiverPhone, receiverAddress);
    }

    /**
     * 从商品页直接创建订单
     */
    @PostMapping("/create-direct")
    public Result<?> createDirectOrder(@RequestBody Map<String, Object> params) {
        Integer userId = (Integer) params.get("userId");
        Integer productId = (Integer) params.get("productId");
        String productName = (String) params.get("productName");
        String productCover = (String) params.get("productCover");
        Integer quantity = (Integer) params.get("quantity");
        Object unitPriceRaw = params.get("unitPrice");

        if (userId == null || productName == null || unitPriceRaw == null) {
            return Result.error("参数错误");
        }

        return orderService.createDirectOrder(userId, productId, productName, productCover, unitPriceRaw, quantity);
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
                                 @RequestBody Map<String, String> params) {
        String receiverName = params.get("receiverName");
        String receiverPhone = params.get("receiverPhone");
        String receiverAddress = params.get("receiverAddress");
        return orderService.settleOrder(orderId, userId, receiverName, receiverPhone, receiverAddress);
    }

    /**
     * 删除订单
     */
    @DeleteMapping("/delete/{orderId}")
    public Result<?> deleteOrder(@PathVariable Integer orderId, @RequestParam Integer userId) {
        return orderService.deleteOrder(orderId, userId);
    }
}
