package com.exercise.demo.Service;

import com.exercise.demo.Entity.User;
import com.exercise.demo.Repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User registerUser(User user) {
        // In a real application, you would hash the password here
        return userRepo.save(user);
    }

    public User findByUsername(String username) {
        return userRepo.findByUsername(username);
    }

    public User findByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    public boolean authenticateUser(String username, String password) {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            return false;
        }
        // In a real application, you would verify the hashed password
        return user.getPassword().equals(password);
    }

    public boolean existsByUsername(String username) {
        return userRepo.findByUsername(username) != null;
    }

    public boolean existsByEmail(String email) {
        return userRepo.findByEmail(email) != null;
    }
}
