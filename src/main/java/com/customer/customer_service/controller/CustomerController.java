package com.customer.customer_service.controller;

import com.customer.customer_service.entity.CustomerEntity;
import com.customer.customer_service.model.Customer;
import com.customer.customer_service.service.CustomerService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@Slf4j
@RequestMapping("api/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    @GetMapping(value = "/getCustomers", produces = "application/json")
    public ResponseEntity<?> getCustomers(){
        try{

            List<Customer> customers = customerService.getAllCustomers();
            return ResponseEntity.ok(customers);
        }
        catch (Exception e){
            return new ResponseEntity<>("Error retrieving customers: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(value = "/getCustomer/{id}")
    public ResponseEntity<?> getCustomerById(@PathVariable Long id){
        try {
            Optional<Customer> customer = customerService.getCustomerById(id);
            if(customer.isPresent()){
                return  ResponseEntity.ok(customer);
            }else{
                return ResponseEntity.status(404).body("Customer not found");
            }
        }catch (Exception e){
            return new ResponseEntity<>("Error retrieving customer: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }


    }

    @PostMapping(value = "/create", produces = "application/json")
    public ResponseEntity<?> create(@Valid @RequestBody Customer customer){
        try{
            customer = customerService.create(customer);
        }
        catch (Exception e){
            return new ResponseEntity<>("Error creating customer: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return ResponseEntity.ok(customer);
    }
}
