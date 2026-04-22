package com.jiangjie.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.jiangjie.common.Result;
import com.jiangjie.entity.Cart;
import com.jiangjie.entity.Product;
import com.jiangjie.mapper.CartMapper;
import com.jiangjie.mapper.ProductMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CartService {
    
    @Autowired
    private CartMapper cartMapper;
    
    @Autowired
    private ProductMapper productMapper;
    
    /**
     * 添加商品到购物车
     */
    public Result<?> addToCart(Integer userId, Integer productId, Integer quantity,
                               String productName, String productCover, Object priceRaw, String category) {
        // 商品不存在时，自动创建基础商品数据
        Product product = ensureProductExists(productId, productName, productCover, priceRaw, category);
        Integer effectiveProductId = product.getId();
        
        // 检查库存
        if (product.getStock() != null && product.getStock() < quantity) {
            return Result.error("库存不足");
        }
        
        // 检查购物车中是否已有该商品
        LambdaQueryWrapper<Cart> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Cart::getUserId, userId)
                   .eq(Cart::getProductId, effectiveProductId);
        Cart existingCart = cartMapper.selectOne(queryWrapper);
        
        if (existingCart != null) {
            // 更新数量
            existingCart.setQuantity(existingCart.getQuantity() + quantity);
            cartMapper.updateById(existingCart);
        } else {
            // 新增购物车记录
            Cart cart = new Cart();
            cart.setUserId(userId);
            cart.setProductId(effectiveProductId);
            cart.setQuantity(quantity);
            cartMapper.insert(cart);
        }
        
        return Result.success("已加入购物车");
    }

    private Product ensureProductExists(Integer productId, String productName, String productCover,
                                        Object priceRaw, String category) {
        Product product = productMapper.selectById(productId);
        if (product != null) {
            return product;
        }

        if (productName != null && !productName.isBlank()) {
            LambdaQueryWrapper<Product> byName = new LambdaQueryWrapper<>();
            byName.eq(Product::getName, productName).last("LIMIT 1");
            Product existingByName = productMapper.selectOne(byName);
            if (existingByName != null) {
                return existingByName;
            }
        }

        Product newProduct = new Product();
        newProduct.setName((productName == null || productName.isBlank()) ? ("商品" + productId) : productName);
        newProduct.setCover(productCover);
        newProduct.setPrice(parsePrice(priceRaw));
        newProduct.setOriginalPrice(newProduct.getPrice());
        newProduct.setStock(9999);
        newProduct.setSales(0);
        newProduct.setDescription(newProduct.getName());
        newProduct.setCategory((category == null || category.isBlank()) ? "文创" : category);
        newProduct.setTags("自动创建");
        newProduct.setSort(0);
        newProduct.setCreateTime(LocalDateTime.now());
        productMapper.insert(newProduct);
        return newProduct;
    }

    private BigDecimal parsePrice(Object priceRaw) {
        if (priceRaw == null) {
            return BigDecimal.ONE;
        }
        try {
            BigDecimal price = new BigDecimal(String.valueOf(priceRaw));
            return price.compareTo(BigDecimal.ZERO) > 0 ? price : BigDecimal.ONE;
        } catch (Exception e) {
            return BigDecimal.ONE;
        }
    }
    
    /**
     * 获取用户购物车列表
     */
    public Result<?> getCartList(Integer userId) {
        LambdaQueryWrapper<Cart> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Cart::getUserId, userId)
                   .orderByDesc(Cart::getCreateTime);
        List<Cart> cartList = cartMapper.selectList(queryWrapper);
        
        // 关联查询商品信息
        cartList.forEach(cart -> {
            Product product = productMapper.selectById(cart.getProductId());
            cart.setProductId(product.getId());
        });
        
        return Result.success(cartList);
    }
    
    /**
     * 更新购物车商品数量
     */
    public Result<?> updateCartQuantity(Integer cartId, Integer quantity) {
        Cart cart = cartMapper.selectById(cartId);
        if (cart == null) {
            return Result.error("购物车记录不存在");
        }
        
        if (quantity <= 0) {
            // 数量小于等于0，删除该记录
            cartMapper.deleteById(cartId);
        } else {
            cart.setQuantity(quantity);
            cartMapper.updateById(cart);
        }
        
        return Result.success("更新成功");
    }
    
    /**
     * 删除购物车商品
     */
    public Result<?> deleteCartItem(Integer cartId) {
        cartMapper.deleteById(cartId);
        return Result.success("删除成功");
    }
    
    /**
     * 清空购物车
     */
    public Result<?> clearCart(Integer userId) {
        LambdaQueryWrapper<Cart> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(Cart::getUserId, userId);
        cartMapper.delete(queryWrapper);
        return Result.success("购物车已清空");
    }
}
