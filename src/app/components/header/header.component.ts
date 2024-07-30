import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userName: string = '';
  cartItemCount: number = 0;

  constructor(
    private authService: AuthService, 
    private cartService: CartService,
    private route: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.cartItemCount = this.cartService.getItems().length;
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }
}
