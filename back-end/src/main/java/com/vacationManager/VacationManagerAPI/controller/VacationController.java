package com.vacationManager.VacationManagerAPI.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vacationManager.VacationManagerAPI.domain.Vacation;
import com.vacationManager.VacationManagerAPI.service.VacationService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/vacations")
public class VacationController {

	@Autowired
	VacationService vacationService;
	
	
	@GetMapping
	public ResponseEntity<?> getAll() {
		List<Vacation> result = vacationService.findAll();
		return new ResponseEntity(result, HttpStatus.OK);
	}
	
	@GetMapping("/{year}/{month}")
	public ResponseEntity<?> getByMonthYear(@PathVariable("year") int year, @PathVariable("month") String month) {
		List<Vacation> result = new ArrayList<>();
		if("All".equals(month)) {
			result = vacationService.findByYear(year);
		} else {
			result = vacationService.findByMonthAndYear(month, year);
		}
		return new ResponseEntity(result, HttpStatus.OK);
	}
	
	@PostMapping
	public ResponseEntity<?> addorUpdateVacation(@RequestBody Vacation vacation) {
		vacationService.saveOrUpdateVacation(vacation);
		return new ResponseEntity("Vacation added succcessfully", HttpStatus.OK);
	}
	
	@DeleteMapping
	public ResponseEntity<?> deleteVacation(@RequestParam("id") String id) {
		vacationService.deleteVacation(id);
		return new ResponseEntity("Vacation removed succcessfully", HttpStatus.OK);
	}
	

}
