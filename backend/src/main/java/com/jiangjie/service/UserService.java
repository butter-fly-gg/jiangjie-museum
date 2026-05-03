package com.jiangjie.service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.jiangjie.common.Result;
import com.jiangjie.dto.UserLoginDTO;
import com.jiangjie.dto.UserRegisterDTO;
import com.jiangjie.dto.UserUpdateDTO;
import com.jiangjie.entity.User;
import com.jiangjie.mapper.UserMapper;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import org.springframework.web.multipart.MultipartFile;

import javax.crypto.SecretKey;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class UserService {
    
    @Autowired
    private UserMapper userMapper;
    
    // JWT 密钥
    private static final String SECRET_KEY = "jiangjie-museum-secret-key-2024-very-long-key-for-security";
    
    /**
     * 用户注册
     */
    public Result<?> register(@Valid UserRegisterDTO registerRequest) {
        String username = registerRequest.getUsername();
        String password = registerRequest.getPassword();
        String nickname = registerRequest.getNickname();
        String phone = registerRequest.getPhone();
        
        // 检查用户名是否已存在
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, username);
        User existingUser = userMapper.selectOne(queryWrapper);
        
        if (existingUser != null) {
            return Result.error("用户名已存在");
        }
        
        // 创建新用户
        User user = new User();
        user.setUsername(username);
        user.setPassword(encodePassword(password));
        user.setNickname(nickname != null ? nickname : username);
        user.setPhone(phone != null ? phone : "");
        user.setRole("user");
        user.setAvatar("");
        user.setCreateTime(LocalDateTime.now());
        user.setUpdateTime(LocalDateTime.now());
        
        userMapper.insert(user);
        
        return Result.success("注册成功");
    }
    
    /**
     * 用户登录
     */
    public Result<?> login(@Valid UserLoginDTO loginRequest) {
        String username = loginRequest.getUsername();
        String password = loginRequest.getPassword();
        
        // 查询用户
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, username);
        User user = userMapper.selectOne(queryWrapper);
        
        if (user == null) {
            return Result.error("用户名或密码错误");
        }
        
        // 兼容老数据：支持“明文密码”与“MD5密码”两种登录
        // 若命中老数据明文，登录成功后自动升级为MD5存储
        String encodedInput = encodePassword(password);
        String dbPassword = user.getPassword();
        boolean matchEncoded = encodedInput.equals(dbPassword);
        boolean matchPlain = password.equals(dbPassword);

        if (!matchEncoded && !matchPlain) {
            return Result.error("用户名或密码错误");
        }

        if (matchPlain && !matchEncoded) {
            user.setPassword(encodedInput);
            user.setUpdateTime(LocalDateTime.now());
            userMapper.updateById(user);
        }
        
        // 生成 JWT Token
        String token = generateToken(user.getId(), user.getUsername(), user.getRole());
        
        // 返回用户信息（不包含密码）
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", user.getId());
        userInfo.put("username", user.getUsername());
        userInfo.put("nickname", user.getNickname());
        userInfo.put("avatar", user.getAvatar());
        userInfo.put("role", user.getRole());
        userInfo.put("phone", user.getPhone());
        userInfo.put("token", token);
        
        return Result.success("登录成功", userInfo);
    }
    
    /**
     * 获取用户信息
     */
    public Result<?> getUserInfo(Integer userId) {
        User user = userMapper.selectById(userId);
        
        if (user == null) {
            return Result.error("用户不存在");
        }
        
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", user.getId());
        userInfo.put("username", user.getUsername());
        userInfo.put("nickname", user.getNickname());
        userInfo.put("avatar", user.getAvatar());
        userInfo.put("role", user.getRole());
        userInfo.put("phone", user.getPhone());
        
        return Result.success(userInfo);
    }
    
    /**
     * 更新用户信息
     */
    public Result<?> updateUserInfo(Integer userId, @Valid UserUpdateDTO updateRequest) {
        User user = userMapper.selectById(userId);
        
        if (user == null) {
            return Result.error("用户不存在");
        }
        
        String nickname = updateRequest.getNickname();
        String avatar = updateRequest.getAvatar();
        String phone = updateRequest.getPhone();
        
        if (nickname != null) {
            user.setNickname(nickname);
        }
        if (avatar != null) {
            user.setAvatar(avatar);
        }
        if (phone != null) {
            user.setPhone(phone);
        }
        user.setUpdateTime(LocalDateTime.now());
        
        userMapper.updateById(user);
        
        return Result.success("更新成功");
    }

    /**
     * 上传头像并保存URL
     */
    public Result<?> uploadAvatar(Integer userId, MultipartFile file) {
        User user = userMapper.selectById(userId);
        if (user == null) {
            return Result.error("用户不存在");
        }

        if (file == null || file.isEmpty()) {
            return Result.error("请选择头像文件");
        }

        String contentType = file.getContentType();
        if (contentType == null || !contentType.startsWith("image/")) {
            return Result.error("仅支持图片文件");
        }

        if (file.getSize() > 5 * 1024 * 1024) {
            return Result.error("图片大小不能超过5MB");
        }

        String originalFilename = file.getOriginalFilename();
        String extension = ".png";
        if (originalFilename != null && originalFilename.contains(".")) {
            extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        }

        try {
            File uploadDir = new File("uploads/avatar");
            // 防御性编程：检查目录是否存在，如果不存在则尝试创建
            if (!uploadDir.exists()) {
                boolean created = uploadDir.mkdirs();
                if (!created) {
                    // 如果创建失败，尝试创建父目录
                    File parentDir = uploadDir.getParentFile();
                    if (parentDir != null && !parentDir.exists()) {
                        parentDir.mkdirs();
                    }
                    // 再次尝试创建目标目录
                    created = uploadDir.mkdirs();
                    if (!created) {
                        return Result.error("创建头像目录失败，请检查磁盘空间和权限");
                    }
                }
            }

            String filename = "avatar_" + userId + "_" + System.currentTimeMillis() + extension;
            Path targetPath = uploadDir.toPath().resolve(filename);
            Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);

            String avatarUrl = "http://localhost:8080/uploads/avatar/" + filename;
            user.setAvatar(avatarUrl);
            user.setUpdateTime(LocalDateTime.now());
            userMapper.updateById(user);

            Map<String, Object> data = new HashMap<>();
            data.put("avatar", avatarUrl);
            return Result.success("头像上传成功", data);
        } catch (IOException e) {
            return Result.error("头像上传失败：" + e.getMessage());
        }
    }
    
    /**
     * 密码加密（使用 MD5）
     */
    private String encodePassword(String password) {
        return DigestUtils.md5DigestAsHex(password.getBytes(StandardCharsets.UTF_8));
    }
    
    /**
     * 生成 JWT Token
     */
    private String generateToken(Integer userId, String username, String role) {
        SecretKey key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
        
        return Jwts.builder()
                .setSubject(username)
                .claim("userId", userId)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 7 * 24 * 60 * 60 * 1000)) // 7天过期
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }
}
