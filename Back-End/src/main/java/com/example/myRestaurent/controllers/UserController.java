package com.example.myRestaurent.controllers;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.myRestaurent.DTO.LoginRequest;
import com.example.myRestaurent.DTO.SignupRequest;
import com.example.myRestaurent.auth.JwtUtil;
import com.example.myRestaurent.models.RoleModel;
import com.example.myRestaurent.models.UserModel;
import com.example.myRestaurent.repositories.RoleRepository;
import com.example.myRestaurent.services.UserService;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @PostMapping("/signup")
    public ResponseEntity<?> addUser(@RequestBody SignupRequest signUpRequest) throws IOException {
        UserModel user = new UserModel();
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setEmail(signUpRequest.getEmail());
        user.setPwd(passwordEncoder.encode(signUpRequest.getPwd()));
        user.setPhone(signUpRequest.getPhone());
        user.setAddress(signUpRequest.getAddress());
        user.setExperience(signUpRequest.getExperience());

        // Assign default role if no roles are provided
        List<RoleModel> roles = new ArrayList<>();
        if (signUpRequest.getRoles().isEmpty()) {
            RoleModel defaultRole = roleRepository.findByName("ROLE_USER")
                    .orElseThrow(() -> new RuntimeException("Role not found: ROLE_USER"));
            roles.add(defaultRole);
        } else {
            for (String roleName : signUpRequest.getRoles()) {
                RoleModel role = roleRepository.findByName(roleName)
                        .orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
                roles.add(role);
            }
        }

        user.setRoles(roles);

        UserModel savedUser = userService.signUp(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPwd()));

            if (authentication.isAuthenticated()) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
                UserModel user = userService.getUserByEmail(loginRequest.getEmail());
                String token = jwtUtil.createToken1(userDetails, user);

                response.put("status", HttpStatus.OK.value());
                response.put("message", "Authentication successful");
                response.put("token", token);

                // 💡 Add the roles to the response
                List<String> roles = user.getRoles()
                                         .stream()
                                         .map(RoleModel::getName)
                                         .collect(Collectors.toList());  // Java 16+, else use .collect(Collectors.toList())

                response.put("roles", roles); // send roles to frontend

                return ResponseEntity.ok(response);
            }

        } catch (BadCredentialsException ex) {
            response.put("status", HttpStatus.UNAUTHORIZED.value());
            response.put("message", "Bad credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (LockedException ex) {
            response.put("status", HttpStatus.UNAUTHORIZED.value());
            response.put("message", "Your account is locked");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (DisabledException ex) {
            response.put("status", HttpStatus.UNAUTHORIZED.value());
            response.put("message", "Your account is disabled");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        } catch (AuthenticationException ex) {
            response.put("status", HttpStatus.UNAUTHORIZED.value());
            response.put("message", "Authentication failed");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }

        response.put("status", HttpStatus.UNAUTHORIZED.value());
        response.put("message", "Authentication failed");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
    }
}