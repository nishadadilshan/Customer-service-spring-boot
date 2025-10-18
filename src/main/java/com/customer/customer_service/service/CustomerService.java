package com.customer.customer_service.service;

import com.customer.customer_service.entity.CustomerEntity;
import com.customer.customer_service.model.Customer;
import com.customer.customer_service.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;
    
    public Customer create(Customer customer) {
        CustomerEntity customerEntity = customerRepository.save(toEntity(customer));
        return toModel(customerEntity);
    }

    public List<Customer> getAllCustomers() {
        List<CustomerEntity> entities = customerRepository.findAll();
        return entities.stream()
                .map(CustomerService::toModel)
                .collect(Collectors.toList());
    }

    public Optional<Customer> getCustomerById(Long id){
        Optional<CustomerEntity> customerEntity = customerRepository.findById(id);
        return customerEntity.map(CustomerService::toModel);
    }
    
    public boolean deleteCustomer(Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    @Transactional
    public Optional<Customer> updateCustomer(Long id, Customer customer) {
        Optional<CustomerEntity> existingEntity = customerRepository.findById(id);
        if (existingEntity.isPresent()) {
            CustomerEntity entity = existingEntity.get();
            // Update the fields
            entity.setName(customer.getName());
            entity.setAddress(customer.getAddress());
            entity.setEmail(customer.getEmail());
            entity.setStatus(customer.isStatus());
            
            CustomerEntity updatedEntity = customerRepository.save(entity);
            return Optional.of(toModel(updatedEntity));
        }
        return Optional.empty();
    }

    // Convert Entity -> Model
    public static Customer toModel(CustomerEntity entity) {

        Customer model = new Customer();
        model.setCustomerId(entity.getCustomerId());
        model.setName(entity.getName());
        model.setAddress(entity.getAddress());
        model.setEmail(entity.getEmail());
        model.setStatus(entity.isStatus());
        return model;
    }

    // Convert Model -> Entity
    public static CustomerEntity toEntity(Customer model) {

        CustomerEntity entity = new CustomerEntity();
        entity.setCustomerId(model.getCustomerId());
        entity.setName(model.getName());
        entity.setAddress(model.getAddress());
        entity.setEmail(model.getEmail());
        entity.setStatus(model.isStatus());
        return entity;
    }


}
