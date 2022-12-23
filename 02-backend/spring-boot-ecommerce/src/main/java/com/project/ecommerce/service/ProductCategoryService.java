package com.project.ecommerce.service;

import com.project.ecommerce.repository.ProductCategoryRepository;
import com.project.ecommerce.model.ProductCategory;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ProductCategoryService {
    @Autowired
    private final ProductCategoryRepository categoryRepository;


    public ProductCategory addCategory(ProductCategory category)
    {

        return categoryRepository.save(category);
    }

    public List<ProductCategory> getAllCategories()
    {
        return categoryRepository.findAll();
    }
//
    public ProductCategory findCategoryById(Long id)
    {
        return categoryRepository.findCategoryById(id);
    }
//
    public ProductCategory updateCategory(ProductCategory categoryDTO)
    {
        return categoryRepository.save(categoryDTO);
    }

    public void deleteCategory(Long id)
    {
        categoryRepository.deleteById(id);
    }

}
