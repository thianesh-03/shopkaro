import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];
  filter: string = 'all';
  searchQuery: string = '';

  constructor(private productService: ProductsService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadProducts();
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['searchQuery'] ? params['searchQuery'].toLowerCase() : '';
      this.applyFilterAndSearch();
    });
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe(
      (data: any[]) => {
        this.products = data;
        this.applyFilterAndSearch();
      },
      err => console.error("Error in fetching the data", err)
    );
  }

  applyFilterAndSearch(): void {
    this.filteredProducts = this.products.filter(product =>
      product.title.toLowerCase().includes(this.searchQuery)
    );
    this.applyFilter();
  }

  onFilterChange(event: any): void {
    this.filter = event.target.value;
    this.applyFilter();
  }

  applyFilter(): void {
    switch (this.filter) {
      case 'all':
        // No sorting needed
        break;
      case 'price':
        this.filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case 'category':
        this.filteredProducts.sort((a, b) => a.category.localeCompare(b.category));
        break;
      case 'rating':
        this.filteredProducts.sort((a, b) => b.rating.rate - a.rating.rate);
        break;
    }
  }
}