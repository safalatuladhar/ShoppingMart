package com.project.ecommerce.DTO;

import com.project.ecommerce.model.Role;
import lombok.Data;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;
@Data
public class UserDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String userName;

    private Set<Role> roles = new HashSet<>();

}
