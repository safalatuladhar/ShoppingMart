package com.project.ecommerce.controller;

import com.project.ecommerce.model.ProductCategory;
import com.project.ecommerce.service.ProductCategoryService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("category")
public class ProductCategoryController {

    private final ProductCategoryService categoryService;


    @PostMapping()
    public ResponseEntity<ProductCategory> addCategory(@RequestBody ProductCategory category)
    {
        ProductCategory newCategory = categoryService.addCategory(category);
        return new ResponseEntity<>(newCategory, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<ProductCategory>> getAllCategory()
    {
        List<ProductCategory> categories = categoryService.getAllCategories();
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductCategory> getCategoryById(@PathVariable("id") Long id)
    {
        ProductCategory category = categoryService.findCategoryById(id);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<ProductCategory> updateCategory(@RequestBody ProductCategory category)
    {
        ProductCategory updatedCategory = categoryService.updateCategory(category);
        return new ResponseEntity<>(updatedCategory, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ProductCategory> deleteCategory(@PathVariable("id") Long id){
        categoryService.deleteCategory(id);
        return  new ResponseEntity<>(HttpStatus.OK);
    }





}
