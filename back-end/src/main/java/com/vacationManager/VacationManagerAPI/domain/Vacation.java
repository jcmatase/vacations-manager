package com.vacationManager.VacationManagerAPI.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Vacation {

	@Id
	String id;
	String reason;
	String requestedDay;
	String month;
	int year;
	int status;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getRequestedDay() {
		return requestedDay;
	}
	public void setRequestedDay(String requestedDay) { this.requestedDay = requestedDay; }

	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}

	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}

	public int getStatus() { return status; }
	public void setStatus(int status) { this.status = status; }
}
