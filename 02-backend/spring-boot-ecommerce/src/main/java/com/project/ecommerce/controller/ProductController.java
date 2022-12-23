package com.project.ecommerce.controller;


import com.project.ecommerce.DTO.ProductDTO;
import com.project.ecommerce.model.Product;
import com.project.ecommerce.service.ProductService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("product")
public class ProductController {
    private final ProductService productService;


    @PostMapping()
    public ResponseEntity<ProductDTO> addCategory(@RequestBody ProductDTO productDTO)
    {
        ProductDTO newProductDTO = productService.addProduct(productDTO);
        return new ResponseEntity<>(newProductDTO, HttpStatus.CREATED);
    }

    @GetMapping()
    public ResponseEntity<List<Product>> getAllProduct()
    {
        List<Product> products = productService.getAllProduct();
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable("id") Long id)
    {
        Product product = productService.findProductById(id);
        return new ResponseEntity<>(product, HttpStatus.OK);
    }

    @PutMapping()
    public ResponseEntity<ProductDTO> updateProduct(@RequestBody ProductDTO productDTO)
    {
        ProductDTO updateProductDTO = productService.updateProduct(productDTO);
        return new ResponseEntity<>(updateProductDTO, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Product> deleteProduct(@PathVariable("id") Long id){
        productService.deleteProduct(id);
        return  new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/{cat_id}/category")
    public ResponseEntity<List<Product>> getProductByCategoryId(@PathVariable("cat_id") Long id)
    {
        List<Product> products = productService.getProductByCategoryId(id);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
}
