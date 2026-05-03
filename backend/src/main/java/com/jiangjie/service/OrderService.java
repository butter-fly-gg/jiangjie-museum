package com.jiangjie.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.jiangjie.common.Result;
import com.jiangjie.dto.CreateDirectOrderDTO;
import com.jiangjie.dto.CreateOrderFromCartDTO;
import com.jiangjie.dto.SettleOrderDTO;
import com.jiangjie.entity.Cart;
import com.jiangjie.entity.Order;
import com.jiangjie.entity.Product;
import com.jiangjie.mapper.CartMapper;
import com.jiangjie.mapper.OrderMapper;
import com.jiangjie.mapper.ProductMapper;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

@Service
public class OrderService {
    
    @Autowired
    private OrderMapper orderMapper;
    
    @Autowired
    private CartMapper cartMapper;
    
    @Autowired
    private ProductMapper productMapper;
    
    /**
     * 从购物车创建订单
     */
    public Result<?> createOrderFromCart(@Valid CreateOrderFromCartDTO createRequest) {
        Integer userId = createRequest.getUserId();
        List<Integer> cartIds = createRequest.getCartIds();
        String receiverName = createRequest.getReceiverName();
        String receiverPhone = createRequest.getReceiverPhone();
        String receiverAddress = createRequest.getReceiverAddress();
        
        BigDecimal totalPrice = BigDecimal.ZERO;
        
        // 计算总价
        for (Integer cartId : cartIds) {
            Cart cart = cartMapper.selectById(cartId);
            if (cart == null || !cart.getUserId().equals(userId)) {
                continue;
            }
            
            Product product = productMapper.selectById(cart.getProductId());
            if (product == null) {
                // 商品不存在，跳过该购物车项
                continue;
            }
            totalPrice = totalPrice.add(product.getPrice().multiply(new BigDecimal(cart.getQuantity())));
        }
        
        if (totalPrice.compareTo(BigDecimal.ZERO) <= 0) {
            return Result.error("请选择商品");
        }
        
        // 创建订单
        Order order = new Order();
        order.setUserId(userId);
        order.setOrderNo(generateOrderNo());
        order.setTotalPrice(totalPrice);
        order.setStatus("pending");
        order.setReceiverName(receiverName);
        order.setReceiverPhone(receiverPhone);
        order.setReceiverAddress(receiverAddress);
        order.setCreateTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());
        
        orderMapper.insert(order);
        
        // 清空选中的购物车项
        for (Integer cartId : cartIds) {
            cartMapper.deleteById(cartId);
        }
        
        return Result.success("订单创建成功", order);
    }

    /**
     * 从商品页直接创建订单
     */
    public Result<?> createDirectOrder(@Valid CreateDirectOrderDTO createRequest) {
        Integer userId = createRequest.getUserId();
        Integer productId = createRequest.getProductId();
        String productName = createRequest.getProductName();
        String productCover = createRequest.getProductCover();
        BigDecimal unitPrice = createRequest.getUnitPrice();
        Integer quantity = createRequest.getQuantity();
        
        int safeQuantity = (quantity == null || quantity <= 0) ? 1 : quantity;
        
        if (unitPrice.compareTo(BigDecimal.ZERO) <= 0) {
            return Result.error("价格必须大于0");
        }

        Order order = new Order();
        order.setUserId(userId);
        order.setOrderNo(generateOrderNo());
        order.setTotalPrice(unitPrice.multiply(BigDecimal.valueOf(safeQuantity)));
        order.setStatus("pending");
        order.setReceiverName("商城下单");
        order.setReceiverPhone("");
        order.setReceiverAddress(buildGoodsMeta(productName, productCover, unitPrice, safeQuantity));
        order.setCreateTime(LocalDateTime.now());
        order.setUpdateTime(LocalDateTime.now());

        orderMapper.insert(order);
        return Result.success("订单创建成功", order);
    }

    private String buildGoodsMeta(String productName, String productCover, BigDecimal unitPrice, Integer quantity) {
        String safeName = productName == null ? "" : productName.replace("|", "/");
        String safeCover = productCover == null ? "" : productCover.replace("|", "/");
        String safePrice = unitPrice == null ? "0.00" : unitPrice.toString();
        String safeQuantity = quantity == null ? "1" : quantity.toString();
        return "GOODS|" + safeName + "|" + safeCover + "|" + safePrice + "|" + safeQuantity;
    }
    
    /**
     * 获取用户订单列表
     */
    public Result<?> getUserOrders(Integer userId) {
        LambdaQueryWrapper<Order> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Order::getUserId, userId)
                   .orderByDesc(Order::getCreateTime);
        List<Order> orders = orderMapper.selectList(queryWrapper);
        
        return Result.success(orders);
    }
    
    /**
     * 获取订单详情
     */
    public Result<?> getOrderDetail(Integer orderId, Integer userId) {
        Order order = orderMapper.selectById(orderId);
        
        if (order == null || !order.getUserId().equals(userId)) {
            return Result.error("订单不存在");
        }
        
        return Result.success(order);
    }
    
    /**
     * 取消订单
     */
    public Result<?> cancelOrder(Integer orderId, Integer userId) {
        Order order = orderMapper.selectById(orderId);
        
        if (order == null || !order.getUserId().equals(userId)) {
            return Result.error("订单不存在");
        }
        
        if (!"pending".equals(order.getStatus())) {
            return Result.error("只能取消待付款订单");
        }
        
        order.setStatus("cancelled");
        order.setUpdateTime(LocalDateTime.now());
        orderMapper.updateById(order);
        
        return Result.success("订单已取消");
    }

    /**
     * 结算订单
     */
    public Result<?> settleOrder(Integer orderId, Integer userId, @Valid SettleOrderDTO settleRequest) {
        Order order = orderMapper.selectById(orderId);
        if (order == null || !order.getUserId().equals(userId)) {
            return Result.error("订单不存在");
        }
        if ("cancelled".equals(order.getStatus())) {
            return Result.error("已取消订单不能结算");
        }
        
        String receiverName = settleRequest.getReceiverName();
        String receiverPhone = settleRequest.getReceiverPhone();
        String receiverAddress = settleRequest.getReceiverAddress();
        
        if (receiverName == null || receiverName.isBlank()
                || receiverPhone == null || receiverPhone.isBlank()
                || receiverAddress == null || receiverAddress.isBlank()) {
            return Result.error("收货信息不完整");
        }

        order.setReceiverName(receiverName);
        order.setReceiverPhone(receiverPhone);
        order.setReceiverAddress(receiverAddress);
        order.setStatus("paid");
        order.setUpdateTime(LocalDateTime.now());
        orderMapper.updateById(order);
        return Result.success("订单结算成功", order);
    }

    /**
     * 删除订单
     */
    public Result<?> deleteOrder(Integer orderId, Integer userId) {
        Order order = orderMapper.selectById(orderId);
        if (order == null || !order.getUserId().equals(userId)) {
            return Result.error("订单不存在");
        }
        orderMapper.deleteById(orderId);
        return Result.success("订单删除成功");
    }
    
    /**
     * 生成订单号
     */
    private String generateOrderNo() {
        String timestamp = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss"));
        String random = String.format("%04d", new Random().nextInt(10000));
        return "ORD" + timestamp + random;
    }
}
