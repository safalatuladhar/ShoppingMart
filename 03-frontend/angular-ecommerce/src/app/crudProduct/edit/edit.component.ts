import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/interface/category.interface';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent {
  categoryForm: FormGroup;
  categoryId: number;
  category: Category;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private readonly productService: ProductService,
    private formBuilder: FormBuilder,
    private readonly categoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      categoryName: ['', Validators.required],
      id: [''],
    });

    const categoryId = this.route.snapshot.paramMap.get("id");
    if(categoryId) {
      this.categoryId = +categoryId;
    }

    this.getCategoryById();

    setTimeout(() => {
      this.categoryForm.controls['id'].setValue(this.category.id);
      this.categoryForm.controls['categoryName'].setValue(this.category.categoryName);
    }, 1000);
  }

  getCategoryById(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (response) => {
        this.category = response;
      }
    });
  }

  updateCategory(): void {
    this.categoryService.updateCategory(this.categoryForm.value)
      .subscribe({
        next: () => {
          this.router.navigate(['admin/category']).then();
        }
      })
  }
}
