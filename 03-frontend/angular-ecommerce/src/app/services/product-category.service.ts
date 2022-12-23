import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../interface/category.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductCategoryService implements OnInit {
  private baseUrl = 'http://localhost:8080/product';

  private categoryUrl = 'http://localhost:8080/product/product-category';

  private adminBaseUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {}

  //admin

  getAllCategory(): Observable<Category[]> {
    const adminproductUrl = `${this.adminBaseUrl}/category`;

    return this.httpClient.get<Category[]>(adminproductUrl);
  }

  addCategory(product: Category): Observable<Category> {
    const adminproductUrl = `${this.adminBaseUrl}/category`;

    return this.httpClient.post<Category>(adminproductUrl, product);
  }

  getCategoryById(categoryId: number): Observable<Category> {
    const adminproductUrl = `${this.adminBaseUrl}/category/${categoryId}`;

    return this.httpClient.get<Category>(adminproductUrl);
  }

  updateCategory(product: Category): Observable<Category> {
    const adminproductUrl = `${this.adminBaseUrl}/category`;

    return this.httpClient.put<Category>(adminproductUrl, product);
  }

  deleteCategory(categoryId: number): Observable<Category> {
    const adminproductUrl = `${this.adminBaseUrl}/category/${categoryId}`;

    return this.httpClient.delete<Category>(adminproductUrl);
  }

  ngOnInit(): void {}
}
