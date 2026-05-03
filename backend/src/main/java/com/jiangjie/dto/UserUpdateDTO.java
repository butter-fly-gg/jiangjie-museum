package com.jiangjie.dto;

import jakarta.validation.constraints.Size;

/**
 * 用户信息更新DTO
 */
public class UserUpdateDTO {
    
    @Size(max = 50, message = "昵称长度不能超过50个字符")
    private String nickname;
    
    private String avatar;
    
    @Size(max = 20, message = "手机号长度不能超过20个字符")
    private String phone;
    
    public String getNickname() {
        return nickname;
    }
    
    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
    
    public String getAvatar() {
        return avatar;
    }
    
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    
    public String getPhone() {
        return phone;
    }
    
    public void setPhone(String phone) {
        this.phone = phone;
    }
}