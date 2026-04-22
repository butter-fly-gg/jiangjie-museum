package com.jiangjie.controller;

import com.jiangjie.common.Result;
import com.jiangjie.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    /**
     * 用户注册
     */
    @PostMapping("/register")
    public Result<?> register(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");
        String nickname = params.get("nickname");
        String phone = params.get("phone");

        if (username == null || username.trim().isEmpty()) {
            return Result.error("用户名不能为空");
        }
        if (password == null || password.trim().isEmpty()) {
            return Result.error("密码不能为空");
        }

        return userService.register(username, password, nickname, phone);
    }

    /**
     * 用户登录
     */
    @PostMapping("/login")
    public Result<?> login(@RequestBody Map<String, String> params) {
        String username = params.get("username");
        String password = params.get("password");

        if (username == null || username.trim().isEmpty()) {
            return Result.error("用户名不能为空");
        }
        if (password == null || password.trim().isEmpty()) {
            return Result.error("密码不能为空");
        }

        return userService.login(username, password);
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
    public Result<?> updateUserInfo(@PathVariable Integer userId, @RequestBody Map<String, String> params) {
        String nickname = params.get("nickname");
        String avatar = params.get("avatar");
        String phone = params.get("phone");

        return userService.updateUserInfo(userId, nickname, avatar, phone);
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