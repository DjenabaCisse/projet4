package com.mood.login.modele;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;

@Entity
@Table(name = "moods")
public class Mood {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    @Enumerated(EnumType.STRING)
	    @NaturalId
	    @Column(length = 60)
	    private MoodName mood;
	    
	    @ManyToMany(fetch = FetchType.LAZY)
	    @JoinTable(name = "user_moods",
	    	joinColumns = @JoinColumn(name="user_id"))
	    private Set<Mood> moods = new HashSet<>(); 
	    
	    



		public Mood() {}


		public Mood(MoodName mood) {
			this.mood = mood ; 
		}


		public Long getId() {
			return id;
		}


		public void setId(Long id) {
			this.id = id;
		}


		public MoodName getMood() {
			return mood;
		}


		public void setMood(MoodName mood) {
			this.mood = mood;
		}
		
	    public Set<Mood> getMoods() {
			return moods;
		}


		public void setMoods(Set<Mood> moods) {
			this.moods = moods;
		}

	 

}
