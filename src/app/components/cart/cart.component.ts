import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartItems = this.cartService.getItems();
  }

  removeFromCart(item: any): void {
    this.cartService.removeProduct(item);
    this.loadCartItems();
  }

  generateInvoice(): void {
    const invoiceCode = this.generateRandomInvoiceCode();
    this.cartService.clearCart();
    this.cartService.restartCounter()
    this.loadCartItems();
    alert(`Factura generado con el codigo: ${invoiceCode}`);
  }

  private generateRandomInvoiceCode(): string {
    return 'FACT-' + Math.floor(100000 + Math.random() * 900000);
  }
}
