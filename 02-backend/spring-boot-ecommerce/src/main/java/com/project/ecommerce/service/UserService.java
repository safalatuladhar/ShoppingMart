package com.project.ecommerce.service;

import com.project.ecommerce.model.Role;
import com.project.ecommerce.model.User;

import java.util.List;

import com.project.ecommerce.repository.RoleRepository;
import com.project.ecommerce.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserService {
    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private final RoleRepository roleRepository;

    public User getUserById(Long id) {
        return userRepository.findUserById(id);
    }

    public User registerNewUser(User user)
    {
        Role role = roleRepository.findRoleByRoleCode("User");
//      role.UserRole(user);
        user.UserRole(role);
        return userRepository.save(user);
    }

    public List<User> getAllUsers()
    {
        return userRepository.findAll();
    }

    public User updateUser(User user)
    {
        return userRepository.save(user);
    }

    public void deleteUser(Long id)
    {
        userRepository.deleteById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public User fetchUserByUsernameAndPassword(String username, String password){
        return userRepository.findByUserNameAndPassword(username, password);
    }
}