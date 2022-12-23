package com.project.ecommerce.repository;


import com.project.ecommerce.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserById(Long id);

//    User findByUserName(String username);

    public User findByUserNameAndPassword(String username, String Password );


}
