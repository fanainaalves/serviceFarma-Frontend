import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.module';
import { ProductType } from '../model/product-type.enum';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {

  // productForm: FormGroup;
  // productTypes = Object.values(ProductType);
  // isEdit: boolean = false;
  // productId: number | null = null;

  // constructor(
  //   private fb: FormBuilder,
  //   private productService: ProductService,
  //   private router: Router,
  //   private route: ActivatedRoute
  // ) {
  //   this.productForm = this.fb.group({
  //     title: ['', Validators.required],
  //     type: ['', Validators.required],
  //     amount: [0, [Validators.required, Validators.min(1)]],
  //     code: [0, [Validators.required]]
  //   });
  // }

  // ngOnInit(): void {
  //   // this.productTypes = Object.values(ProductType);
  //   this.route.paramMap.subscribe(params => {
  //     const id = params.get('id');
  //     if (id) {
  //       this.isEdit = true;
  //       this.productId = +id;
  //       this.loadProduct(this.productId);
  //     }
  //   });
  //   this.loadTypes()
  // }

  // loadProduct(id: number): void {
  //   this.productService.findProductById(id).subscribe((product: Product) => {
  //     this.productForm.patchValue(product);
  //   },
  //   error => {
  //     console.error('Erro ao carregar produto', error);
  //   }
  // );
  // }

  // onSubmit(): void {

  //   if (this.productForm.valid) {
  //     return;
  //   }

  //   const productData: Product = this.productForm.value;
  //   if(this.isEdit && this.productId){
  //     productData.id = this.productId;
  //     this.productService.updateProduct(productData).subscribe(
  //       () => {
  //         console.log('Produto atualizado com sucesso');
  //         this.router.navigate(['/list']);
  //       },
  //       error => {
  //         console.error('Erro ao atualizar produto', error);
  //       }
  //     );
  //   } else {
  //     this.productService.createProduct(productData).subscribe(
  //       () => {
  //         console.log('Produto criado com sucesso');
  //         this.router.navigate(['/list']);
  //       },
  //       error => {
  //         console.error('Erro ao criar produto', error);
  //       }
  //     )
  //   }
  // }

  // loadTypes(){
  //   this.productTypes = Object.values(ProductType);
  //   console.log("passei aqui: ",Object.values(ProductType))
  //   // return Object.values(ProductType);
  // }

  // cancel(): void {
  //   this.router.navigate(['/list']);
  // }

  productForm: FormGroup;
  productTypes = Object.values(ProductType);
  isEdit: boolean = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      type: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      code: [0, [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.productId = +id;
        this.loadProduct(this.productId);
      }
    });
    this.loadTypes();
  }

  loadProduct(id: number): void {
    this.productService.findProductById(id).subscribe(
      (product: Product) => {
        this.productForm.patchValue(product);
      },
      error => {
        console.error('Erro ao carregar produto', error);
      }
    );
  }

  onSubmit(): void {
    if (this.productForm.invalid) {
      return;
    }

    const productData: Product = this.productForm.value;

    if (this.isEdit && this.productId) {
      productData.id = this.productId;
      this.productService.updateProduct(productData).subscribe(
        () => {
          console.log('Produto atualizado com sucesso');
          this.router.navigate(['/list']);
        },
        error => {
          console.error('Erro ao atualizar produto', error);
        }
      );
    } else {
      this.productService.createProduct(productData).subscribe(
        () => {
          console.log('Produto criado com sucesso');
          this.router.navigate(['/list']);
        },
        error => {
          console.error('Erro ao criar produto', error);
        }
      );
    }
  }

  loadTypes(): void {
    this.productTypes = Object.values(ProductType);
  }

  cancel(): void {
    this.router.navigate(['/list']);
  }
}
