package com.project.ecommerce.service;

import com.project.ecommerce.DTO.ProductDTO;
import com.project.ecommerce.model.Product;
import com.project.ecommerce.repository.ProductCategoryRepository;
import com.project.ecommerce.repository.ProductRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private  ProductRepository productRepository;

    @Autowired
    private ProductCategoryRepository categoryRepository;



    public ProductDTO addProduct(ProductDTO productDTO)
    {
        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        Long id = productDTO.getCategory_id();
        if(id != null)
        {
            product.setCategory(categoryRepository.findById(id).get());
        }
        Product prod = productRepository.save(product);
        return productDTO;
    }

    public List<Product> getAllProduct()
    {
        return productRepository.findAll();
    }
    //
    public Product findProductById(Long id)
    {
        return productRepository.findProductById(id);
    }
    //
    public ProductDTO updateProduct(ProductDTO productDTO)
    {

        Product product = new Product();
        BeanUtils.copyProperties(productDTO, product);
        Long id = productDTO.getCategory_id();
        if(id != null)
        {
            product.setCategory(categoryRepository.findById(id).get());
        }
        Product prod = productRepository.save(product);
        return productDTO;
    }

    public void deleteProduct(Long id)
    {
        productRepository.deleteById(id);
    }

    public List<Product> getProductByCategoryId(Long id)
    {
        return productRepository.findProductByCategoryId(id);
    }
}
