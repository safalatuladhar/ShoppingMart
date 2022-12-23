import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/interface/category.interface';
import { ProductCategoryService } from 'src/app/services/product-category.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  categories: Category[];
  constructor(private readonly categoryService: ProductCategoryService) {}

  ngOnInit(): void {
    this.getCategories();
    
  }

  getCategories(): void {
    this.categoryService.getAllCategory().subscribe({
      next: (response) => {
        this.categories = response;
      },
      error: (err: HttpErrorResponse) => {
        alert(err.message);
      }
    })
  }

  deleteCategory(categoryId: number): void {
    this.categoryService.deleteCategory(categoryId).subscribe({
      next: () => {
        this.getCategories()
      }
    })
  }
}
