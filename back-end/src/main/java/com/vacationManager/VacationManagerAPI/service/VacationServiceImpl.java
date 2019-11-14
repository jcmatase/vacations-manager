package com.vacationManager.VacationManagerAPI.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vacationManager.VacationManagerAPI.domain.Vacation;
import com.vacationManager.VacationManagerAPI.repositories.VacationRepository;

@Service
public class VacationServiceImpl implements VacationService {

	@Autowired
	VacationRepository vacationRepository;

	@Override
	public List<Vacation> findAll() {
		return vacationRepository.findAll();
	}

	@Override
	public List<Vacation> findByMonthAndYear(String month, int year) {
		return vacationRepository.findByMonthAndYear(month, year);
	}

	@Override
	public void saveOrUpdateVacation(Vacation vacation) {
		vacationRepository.save(vacation);
	}

	@Override
	public void deleteVacation(String id) {
		vacationRepository.delete(id);
	}

	@Override
	public List<Vacation> findByYear(int year) {
		return vacationRepository.findByYear(year);
	}

}
