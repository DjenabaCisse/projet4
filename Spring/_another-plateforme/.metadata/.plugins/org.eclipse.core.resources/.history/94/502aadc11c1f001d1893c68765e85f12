package com.mood.login.dao;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mood.login.modele.Mood;
import com.mood.login.modele.MoodName;

public interface MoodRepository extends JpaRepository <Mood, Long>{

	boolean existsByName(Set<String> mood);

}
