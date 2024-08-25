import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { AuthService } from '../../login/login-service/auth.service';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.module';
import { ProductType } from '../model/product-type.enum';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { error } from 'console';
import { MatSort } from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-list',
  imports: [
    CommonModule,
  ],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'type', 'amount', 'code', 'actions'];
  dataSource =  new MatTableDataSource<Product>();
  hasPermissionToAdd: boolean = true;
  hasPermissionToDelete: boolean = true;
  hasPermissionToEdit: boolean = true;
  currentPage: number = 1;
  totalItems: number = 0;
  pageSize: number = 5;
  totalPages: number = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.loadProducts();
    } else {
      this.router.navigate(['/login'])
    }
  }

  loadProducts(page: number = 1,  pageSize: number = this.pageSize): void {
    this.productService.findAllProduct(page, this.pageSize).subscribe(
      (response: {items: Product[], total: number}) => {
        this.dataSource.data = response.items;
        this.totalItems = response.total;
        this.totalPages = Math.ceil(this.totalItems / this.pageSize);
        this.currentPage = page;
      },
      (error) => {
        console.error('Erro ao carregar produtos', error);
      }
    );
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if(this.dataSource.paginator){
      this.dataSource.paginator.firstPage();
    }
  }

  addNewProduct(): void {
    this.router.navigate(['/form/new']);
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/form/', product.id]);
  }

  editProduct(product: Product): void {
    this.router.navigate(['/form/edit/', product.id]);
  }

  deleteProduct(product: Product) {
    if(confirm(`Tem certeza que deseja excluir o produto ${product.title}?`)){
      this.productService.deleteProduct(product.id).subscribe(
        () => {
          this.loadProducts();
        },
        error => {
          console.error("Erro ao exclur produto", error)
        }
      )
    }
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadProducts(page, this.pageSize);
    }
  }

  onPageSizeChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    this.pageSize = Number(selectElement.value);
    this.currentPage = 1;  // Reinicia a página para 1 sempre que o tamanho mudar
    this.loadProducts(this.currentPage, this.pageSize);
  }

  getPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }

}
