import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

  categoryForm: FormGroup;

   constructor(private _route:Router, 
    private readonly productService: ProductService,
    private formBuilder: FormBuilder,
    private readonly categoryService: ProductCategoryService) { }



  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      "categoryName": ['', Validators.required]
    });
  }


  addCategory(){

    this.categoryService.addCategory(this.categoryForm.value).subscribe({
      next: (data) => {
        this._route.navigate(['admin/category'], { state: { data } }).then();
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })

  }

}

