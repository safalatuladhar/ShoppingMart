import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductCategory } from 'src/app/common/product-category';
import { LoginService } from 'src/app/services/login.service';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-category-menu',
  templateUrl: './product-category-menu.component.html',
  styleUrls: ['./product-category-menu.component.css']
})
export class ProductCategoryMenuComponent implements OnInit {

  productCategories: ProductCategory[] = [];


  constructor(private productService: ProductService,
    private readonly router: Router,
    private readonly categoryService: ProductCategoryService,
    public readonly loginService: LoginService){}

  ngOnInit(){

    // this.listProductCategories();

    this .categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.productCategories = response;
        console.log(this.productCategories);
      }
    });

  }

  getProductByCategory(categoryId: number): void {
    this.productService.getProductByCategory(categoryId);

    this.router.navigate(["/category", categoryId]).then();
  }

}
