package com.customer.customer_service.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "customers")
public class CustomerEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Auto increment in MySQL
    private Long customerId;

    @Column(nullable = false, length = 100)
    private String name;

    @Column(length = 255)
    private String address;

    @Column(unique = true, nullable = false, length = 150)
    private String email;

    @Column(nullable = false)
    private boolean status;


}
