package com.expenseManager.ExpenseManagerAPI.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.expenseManager.ExpenseManagerAPI.domain.Vacation;

public interface ExpenseRepository extends MongoRepository<Vacation, String>{

	List<Vacation> findByMonthAndYear(String month, int year);
	
	List<Vacation> findByYear(int year);

}
