package com.vacationManager.VacationManagerAPI.service;

import java.util.List;

import com.vacationManager.VacationManagerAPI.domain.Vacation;

public interface VacationService {
	
	List<Vacation> findAll();
	
	List<Vacation> findByMonthAndYear(String month, int year);
	
	List<Vacation> findByYear(int year);
	
	void saveOrUpdateVacation(Vacation vacation);
	
	void deleteVacation(String id);

}
