package com.expenseManager.ExpenseManagerAPI.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.expenseManager.ExpenseManagerAPI.domain.Vacation;
import com.expenseManager.ExpenseManagerAPI.repositories.ExpenseRepository;

@Service
public class ExpenseServiceImpl implements ExpenseService {

	@Autowired
	ExpenseRepository expenseRepository;

	@Override
	public List<Vacation> findAll() {
		return expenseRepository.findAll();
	}

	@Override
	public List<Vacation> findByMonthAndYear(String month, int year) {
		return expenseRepository.findByMonthAndYear(month, year);
	}

	@Override
	public void saveOrUpdateExpense(Vacation vacation) {
		expenseRepository.save(vacation);
	}

	@Override
	public void deleteExpense(String id) {
		expenseRepository.delete(id);		
	}

	@Override
	public List<Vacation> findByYear(int year) {
		return expenseRepository.findByYear(year);
	}

}
