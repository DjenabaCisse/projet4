package com.mood.login.http.controller;

import java.util.HashSet;
import java.util.Set;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mood.login.dao.MoodRepository;
import com.mood.login.dao.UserRepository;
import com.mood.login.message.request.MoodForm;
import com.mood.login.message.response.ResponseMessage;
import com.mood.login.modele.Mood;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/mood")
public class MoodRestAPIs {

	
	@Autowired
	MoodRepository moodRepository; 
	
	@Autowired
	UserRepository userRepository;
	
	
	@PostMapping("/registermood")
	public ResponseEntity<?> registerMood (@Valid @RequestBody MoodForm moodRequest) {
		if(moodRepository.existsByName(moodRequest.getMood())) {
			return new ResponseEntity<>(new ResponseMessage("Fail -> Mood is already registered!"), HttpStatus.BAD_REQUEST);
		}
	
			Mood mood = new Mood();
			Set<String> strMoods = moodRequest.getMood(); 
			Set<Mood> moods = new HashSet<>(); 
	
			moodRepository.save(mood); 
			
	return new ResponseEntity<>(new ResponseMessage("Mood registered successfully"), HttpStatus.OK); 
	
	}
	
	
	
}
