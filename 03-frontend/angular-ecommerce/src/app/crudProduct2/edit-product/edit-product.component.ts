import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductCategoryService } from 'src/app/services/product-category.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent {
  productForm: FormGroup;
  productId: number;
  product: Product;

  constructor(
    private route: ActivatedRoute,
    private readonly productService: ProductService,
    private formBuilder: FormBuilder,
    private router: Router,
    private readonly categoryService: ProductCategoryService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      sku: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      unitPrice: ['', Validators.required],
      imageUrl: ['', Validators.required],
      unitsInStock: ['', Validators.required],
      id: [''],
      category_id: [''], 
    });

    const productId = this.route.snapshot.paramMap.get('id');
    if (productId) {
      this.productId = +productId;
    }

    this.getProductById();

    setTimeout(() => {
      console.log(this.product.id);
      this.productForm.controls['id'].setValue(this.product.id);
      this.productForm.controls['sku'].setValue(this.product.sku);
      this.productForm.controls['name'].setValue(this.product.name);
      this.productForm.controls['description'].setValue(this.product.description);
      this.productForm.controls['unitPrice'].setValue(this.product.unitPrice);
      this.productForm.controls['imageUrl'].setValue(this.product.imageUrl);
      this.productForm.controls['unitsInStock'].setValue(this.product.unitsInStock);
      this.productForm.controls['category_id'].setValue(this.product.category.id);
    }, 1000);
  }

  getProductById(): void {
    this.productService.getProductById(this.productId).subscribe({
      next: (response) => {
        this.product = response;
        console.log(response); 
      },
    });
  }

  updateProduct(): void {
    // console.log(this.productForm.value);
    this.productService.updateProduct(this.productForm.value).subscribe(
      {
        next: () => {
          this.router.navigate(['admin/product']).then();
        }
      }
    )
  }
}
