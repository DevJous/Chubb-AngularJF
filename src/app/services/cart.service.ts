import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: Product[] = [];
  private counterSubject = new BehaviorSubject<number>(0);
  counter$ = this.counterSubject.asObservable();

  constructor() { }

  addProduct(product: Product): void {
    const itemToModify = this.items.find((item) => item.id === product.id);

    if(itemToModify != undefined) {
      itemToModify.count = itemToModify.count! + 1;

    } else {
      product.count = 1;

      this.items.push(product);
    }
  }

  getItems(): any[] {
    return this.items;
  }

  clearCart(): void {
    this.items = [];
  }

  removeProduct(product: any): void {
    const index = this.items.indexOf(product);
    if (index > -1) {
      this.items.splice(index, 1);
    }
  }

  incrementCounter() {
    this.counterSubject.next(this.counterSubject.getValue() + 1);
  }

  restartCounter() {
    this.counterSubject.next(0);
  }
}
