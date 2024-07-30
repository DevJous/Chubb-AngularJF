import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string = '';
  cartItemCount: number | undefined;
  subscription: Subscription | undefined;

  constructor(
    private authService: AuthService, 
    private cartService: CartService,
    private route: Router) {}

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.cartItemCount = this.cartService.getItems().length;

    this.subscription = this.cartService.counter$.subscribe(counter => {
      this.cartItemCount = counter;
    });
  }

  ngOnDestroy(): void {
    this.subscription!.unsubscribe();
  }

  logout(): void {
    this.authService.logout();
    this.route.navigate(['/login']);
  }

}
