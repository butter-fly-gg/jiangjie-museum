package com.jiangjie.controller;

import com.jiangjie.common.Result;
import com.jiangjie.dto.UserLoginDTO;
import com.jiangjie.dto.UserRegisterDTO;
import com.jiangjie.dto.UserUpdateDTO;
import com.jiangjie.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public Result<?> register(@Valid @RequestBody UserRegisterDTO registerRequest) {
        return userService.register(registerRequest);
    }

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public Result<?> login(@Valid @RequestBody UserLoginDTO loginRequest) {
        return userService.login(loginRequest);
    }

    /**
     * 获取用户信息
     */
    @GetMapping("/user/{userId}")
    public Result<?> getUserInfo(@PathVariable Integer userId) {
        return userService.getUserInfo(userId);
    }

    /**
     * 更新用户信息
     */
    @PutMapping("/user/{userId}")
    public Result<?> updateUserInfo(@PathVariable Integer userId, @Valid @RequestBody UserUpdateDTO updateRequest) {
        return userService.updateUserInfo(userId, updateRequest);
    }

    /**
     * 上传用户头像
     */
    @PostMapping("/user/{userId}/avatar")
    public Result<?> uploadAvatar(@PathVariable Integer userId, @RequestParam("file") MultipartFile file) {
        return userService.uploadAvatar(userId, file);
    }

    /**
     * 测试接口
     */
    @GetMapping("/hello")
    public String hello() {
        return "后端启动成功！接口可以正常访问啦！🎉";
    }
}