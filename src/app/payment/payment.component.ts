// src/app/payment/payment.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
})
export class PaymentComponent implements OnInit {
  productName: string = '';
  productImage: string = '';
  productPrice: number = 0;
  quantity: number = 1;
  totalPrice: number = 0;

  private basePrice: number = 0;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    // Retrieve product details from URL queryParams
    this.route.queryParams.subscribe((params) => {
      this.productName = params['name'];
      this.productImage = params['image'];
      this.productPrice = +params['price'];
      this.basePrice = +params['price'] || 0;
      this.productPrice = this.basePrice;
      this.calculateTotalPrice();  
    });
  }

  onPaymentSubmit(): void {
    alert('Order placed successfully!');
    this.router.navigate(['/']);
  }

  increment(): void {
    this.quantity++;
    this.calculateTotalPrice();
  }

  decrement(): void {
    if (this.quantity > 1) {
      this.quantity--;
      this.calculateTotalPrice();
    }
  }
  calculateTotalPrice(): void {
    this.totalPrice = this.productPrice * this.quantity;
  }
}
