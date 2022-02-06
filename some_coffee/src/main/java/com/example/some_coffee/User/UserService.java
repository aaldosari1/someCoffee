package com.example.some_coffee.User;

import com.example.some_coffee.Role.Role;
import com.example.some_coffee.Role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String userName) throws UsernameNotFoundException {
        User user = userRepository.findByUserName(userName);
        if (user == null) { // to handle the exception
            throw new UsernameNotFoundException("User not found in the database");
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role -> {
            authorities.add(new SimpleGrantedAuthority(role.getName()));
        });
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), authorities);

    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public User getUser(String id) {
        Long userId = Long.parseLong(id);
        return userRepository.findById(userId).orElse(null);
    }


    public User addUser(Form form) {

        User user = form.getUser();
        Long roleId = form.getRoleId();
        Role role = roleRepository.findById(roleId).orElse(null);
        user.getRoles().add(role);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);

    }

    public void deleteUser(String id) {
        Long userId = Long.parseLong(id);
        userRepository.deleteById(userId);
    }

    public void updateUser(String id, User data) {
        Long userId = Long.parseLong(id);
        User user = userRepository.findById(userId).orElse(null);


        if (user != null) {
            user.setName(data.getName());
            user.setUserName(data.getUserName());
            user.setPassword(data.getPassword());
            user.setAge(data.getAge());
            user.setPhone(data.getPhone());
            user.setEmail(data.getEmail());
            userRepository.save(user);
        }
    }
}
