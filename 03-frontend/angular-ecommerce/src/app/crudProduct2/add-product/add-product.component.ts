import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/interface/category.interface';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {

   productForm: FormGroup;
   categories: Category[];

  constructor(
    private _route: Router,
    private readonly productService: ProductService,
    private formBuilder: FormBuilder,
    private readonly categoryService: ProductCategoryService,
  ) {}

    ngOnInit(): void {

       this.productForm = this.formBuilder.group({
      "sku": ['', Validators.required],
      "name": ['', Validators.required],
      "description": ['', Validators.required],
      "unitPrice": ['', Validators.required],
      "imageUrl": ['', Validators.required],
      "unitsInStock": ['', Validators.required],
      "category_id": ['', Validators.required],    
    });

    this.getCategories();
  
  }

  getCategories() {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categories = response;
      }
    })
  }






  addProduct(){
    console.log(this.productForm.value);
    this.productService.addProduct(this.productForm.value).subscribe({
      next: (data) => {
        this._route.navigate(['admin/product'], { state: { data } }).then();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })

}

}

