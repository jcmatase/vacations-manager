package com.vacationManager.VacationManagerAPI.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.vacationManager.VacationManagerAPI.domain.Vacation;

public interface VacationRepository extends MongoRepository<Vacation, String>{

	List<Vacation> findByMonthAndYear(String month, int year);
	
	List<Vacation> findByYear(int year);

}
