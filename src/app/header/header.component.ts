import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated = false;
  searchForm: FormGroup;

  constructor(
    private router: Router, 
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group({
      searchQuery: ['']
    });

    this.authService.isAuthenticated().subscribe(
      (status) => {
        this.isAuthenticated = status;
      }
    );
  }

  ngOnInit() {
    // You can add any initialization logic here if needed
  }

  onSearch() {
    const query = this.searchForm.get('searchQuery')?.value;
    if (query) {
      this.router.navigate(['/products'], { queryParams: { searchQuery: query } });
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}