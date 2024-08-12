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
    MatPaginator,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    CommonModule,
  ],
  standalone: true,
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {

  displayedColumns: string[] = ['title', 'type', 'amount', 'code', 'actions'];
  dataSource = new MatTableDataSource<Product>();
  hasPermissionToAdd: boolean = true;
  hasPermissionToDelete: boolean = true;
  hasPermissionToEdit: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.findAllProduct().subscribe(
      (products: Product[]) => {
        this.dataSource.data = products;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    this.router.navigate(['/medicamentos/novo']);
  }

  viewProduct(product: Product): void {
    this.router.navigate(['/medicamentos/editar', product.id]);
  }

  editProduct(product: Product): void {
    this.router.navigate(['/medicamentos/editar', product.id]);
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
}
