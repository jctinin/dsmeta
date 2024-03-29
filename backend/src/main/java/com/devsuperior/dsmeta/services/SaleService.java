package com.devsuperior.dsmeta.services;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.devsuperior.dsmeta.entities.Sale;
import com.devsuperior.dsmeta.repositories.SaleRepository;

@Service
public class SaleService {

	@Autowired
	private SaleRepository repository;

	public Page<Sale> findSales(String minDate, String maxDate, Pageable pageable) {

		LocalDate today = LocalDate.ofInstant(Instant.now(), ZoneId.systemDefault());

		LocalDate min = minDate.contentEquals("") ? today.minusDays(365) : LocalDate.parse(minDate);

		System.out.println(maxDate);
		LocalDate max = maxDate.contentEquals("") ? today : LocalDate.parse(maxDate);

		//System.out.println(max + " Max DATE");
		return repository.findSales(min, max, pageable);
	}

}
