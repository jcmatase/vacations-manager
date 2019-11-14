package com.expenseManager.ExpenseManagerAPI.service;

import java.util.List;

import com.expenseManager.ExpenseManagerAPI.domain.Vacation;

public interface ExpenseService {
	
	List<Vacation> findAll();
	
	List<Vacation> findByMonthAndYear(String month, int year);
	
	List<Vacation> findByYear(int year);
	
	void saveOrUpdateExpense(Vacation vacation);
	
	void deleteExpense(String id);

}
