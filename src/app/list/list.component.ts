import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule} from '@angular/material/card';
import { AuthService } from '../auth/auth.service';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.module';
import { ProductType } from '../model/product-type.enum';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-list',
  imports: [
    MatPaginator,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule
  ],
  standalone:true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'type', 'amount', 'code', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  hasPermissionToAdd: boolean = false;
  hasPermissionToEdit: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productService: ProductService,
    private authService: AuthService,
    private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
    this.dataSource.paginator = this.paginator;

    this.hasPermissionToAdd = this.authService.hasPermission('ADD_PRODUCT');
    this.hasPermissionToEdit = this.authService.hasPermission('EDIT_PRODUCT');
  }

  loadProducts(type?: ProductType, search?: string): void {
    this.productService.getProducts(type, search).subscribe(
      (data: Product[]) => {
        this.dataSource.data = data;
      },
      error => {
        console.error('Error fetching products', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addNewProduct(): void {
    this.router.navigate(['/medicamentos/novo']);
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/medicamentos/editar', product.id]);
  }

  editProduct(product: Product): void {
    this.router.navigate(['/medicamentos/editar', product.id]);
  }
}
