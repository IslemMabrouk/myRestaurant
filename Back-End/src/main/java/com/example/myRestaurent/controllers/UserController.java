package com.example.myRestaurent.controllers;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import com.example.myRestaurent.servicesImpl.UserServiceImpl;

@RestController
@RequestMapping("/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private UserServiceImpl userServiceImpl;
	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	UserDetailsService userDetailsService;
	@Autowired
	AuthenticationManager authenticationManager;
	
	private final JwtUtil jwtUtil = new JwtUtil();

	@PostMapping("/signup")
	public UserModel addUser(@RequestBody SignupRequest signUpRequest) throws IOException {

		UserModel user = new UserModel();
		user.setFirstName(signUpRequest.getFirstName());
		user.setLastName(signUpRequest.getLastName());
		user.setEmail(signUpRequest.getEmail());
		user.setPwd(signUpRequest.getPwd());


		// Charger les rôles
		List<RoleModel> roles = new ArrayList<>();
		for (String roleName : signUpRequest.getRoles()) {
			RoleModel role = roleRepository.findByName(roleName)
					.orElseThrow(() -> new RuntimeException("Role not found: " + roleName));
			roles.add(role);
		}

		user.setRoles(roles);

		return userService.signUp(user);
	}

	@PostMapping("/login")
	public ResponseEntity<?> authenticate(@RequestBody LoginRequest loginRequest) {
		Map<String, Object> map = new HashMap<>();

		try {
			Authentication authentication = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPwd()));

			if (authentication.isAuthenticated()) {
				UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
				UserModel user = userServiceImpl.getUserByEmail(loginRequest.getEmail());
				String token = jwtUtil.createToken1(userDetails, user);
				map.put("status", HttpStatus.OK.value());
				map.put("message", "Authentication successful");
				map.put("token", token);
				return ResponseEntity.ok(map);
			} else {
				map.put("status", HttpStatus.UNAUTHORIZED.value());
				map.put("message", "Authentication failed");
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
			}
		} catch (BadCredentialsException ex) {
			map.put("status", HttpStatus.UNAUTHORIZED.value());
			map.put("message", "Bad credentials");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
		} catch (LockedException ex) {
			map.put("status", HttpStatus.UNAUTHORIZED.value());
			map.put("message", "Your account is locked");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
		} catch (DisabledException ex) {
			map.put("status", HttpStatus.UNAUTHORIZED.value());
			map.put("message", "Your account is disabled");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
		} catch (AuthenticationException ex) {
			map.put("status", HttpStatus.UNAUTHORIZED.value());
			map.put("message", "Authentication failed");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(map);
		}
	}

}
