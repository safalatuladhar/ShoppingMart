package com.project.ecommerce.controller;

import com.project.ecommerce.DTO.UserDTO;
import com.project.ecommerce.model.User;
import com.project.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")

public class UserController {
    @Autowired
    private final UserService userService;


    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("register")
    public ResponseEntity<User> registerNewUser(@RequestBody User user)
    {
        User newUser = userService.registerNewUser(user);

        return new ResponseEntity<>(newUser, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<User>> getAllUsers()
    {
        List<User> users = userService.getAllUsers();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") Long id)
    {
        User User = userService.getUserById(id);
        return new ResponseEntity<>(User, HttpStatus.OK);
    }

    @PutMapping("/update")
    public ResponseEntity<User> updateUser(@RequestBody User User)
    {
        User updatedUser = userService.updateUser(User);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id)
    {
        userService.deleteUser(id);
        return new ResponseEntity<>( HttpStatus.OK);
    }

    @PostMapping("/login")
    public UserDTO loginUser(@RequestBody User user) throws Exception {
        String tempUserId = user.getUserName();
        String tempPass = user.getPassword();
        UserDTO userDTO = null;
        if (tempUserId != null && tempPass != null){
            userDTO =  userService.fetchUserByUsernameAndPassword(tempUserId, tempPass);
        }

        if (userDTO == null){
            throw new Exception("Bad credentials");
        }

        return userDTO;
    }
}
