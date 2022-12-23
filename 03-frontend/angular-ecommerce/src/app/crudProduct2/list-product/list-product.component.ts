import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/common/product';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css'],
})
export class ListProductComponent implements OnInit{
  products: Product[];
  constructor(private readonly productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
  
  }

  getProducts(): void{
      this.productService.getAllProduct().subscribe({
        next: (response) => {
          this.products = response;
        },
        error: (err: HttpErrorResponse) => {
          alert(err.message);
        },
      });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe({
      next: () => {
        this.getProducts()
      }
    });
  }
}
