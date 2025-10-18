package com.customer.customer_service.controller;

import com.customer.customer_service.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PaymentController {

    private CustomerService customerService;

    @Autowired
    public PaymentController(CustomerService customerService){
        this.customerService = customerService;
    }

}
