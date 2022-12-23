package com.project.ecommerce.service;

import com.project.ecommerce.model.Role;

import com.project.ecommerce.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.List;

@Service
public class RoleService {
    @Autowired
    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Role addRole(Role role)
    {
        return roleRepository.save(role);
    }

    public List<Role> getAllRoles()
    {
        return roleRepository.findAll();
    }

    public Role getRoleById(Long id)
    {
        return roleRepository.findRoleById(id);
    }


    public Role updateRole(Role role)
    {
        return roleRepository.save(role);
    }

    public void deleteRole(Long id)
    {
        roleRepository.deleteById(id);
    }
}
