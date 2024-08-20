// src/app/payment/payment.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  productName: string = '';
  productImage: string = '';

  constructor(private route: ActivatedRoute,private router: Router) {}

  ngOnInit(): void {
    // Retrieve product details from URL queryParams
    this.route.queryParams.subscribe(params => {
      this.productName = params['name'];
      this.productImage = params['image'];
    });
  }
  onPaymentSubmit(): void {
    alert('Order placed successfully!');
    this.router.navigate(['/'])
  }

}
