import { Component, Input } from '@angular/core';
import { OrderService } from '../order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cartData: any;
  toppings: any;
  total: number = 0;
  quantity: any;
  subtotal: any;
  incItem: any;
  toppingtotal: number = 0;
  IngreSubtotal: number = 0;

  constructor(private os: OrderService) { }
  itemCost: any;

  ngOnInit() {
    this.os.getCartItem().subscribe(data => {
      this.cartData = data;
      this.calculateTotalPrice();
    })

    this.os.getcartIngredient().subscribe(data => {
      this.toppings = data;
      this.calculateIngreTotalPrice()
    })
    this.cartData = this.os.cartData;
    this.toppings = this.os.ingreData;
    this.toppingtotal = this.os.toppingCost;
  }


  //increment quantity
  increse(item: any) {
    this.os.incrementCartItem(item._id).subscribe(inc => {
      this.quantity = inc;
      // this.getTotal();
      this.ngOnInit();
    })
  }


  //decrement quantity
  decrese(item: any) {
    console.log(item)
    this.os.decrementCartItem(item._id).subscribe(dec => {
      // this.quantity = dec;
      this.ngOnInit();
    })
  }


  //clear cart data
  clear() {
    this.cartData = [];
    this.toppings = [];
    this.toppingtotal = 0;
    this.total = 0;
    this.subtotal = 0;
    this.IngreSubtotal = 0;
  }

  // remove pizza from Cart
  remove(item: any): void {
    console.log("in remove ", item);

    this.os.removeFromCart(item._id).subscribe(response => {
      console.log("try to remove", item.id);

      console.log('Item removed from cart:');
    }, error => {
      console.error('Error removing item from cart:', error);
    });

    this.ngOnInit();
  }


  //remove Ingredient From Cart 
  removeIngr(item: any): void {
    console.log("in remove ", item._id);
    const conform = window.confirm('conform to delete');
    if (conform) {
      this.os.removeFromCartIngre(item._id).subscribe(response => {
        console.log('Item removed from cart:', response);
      }, error => {
        console.error('Error removing item from cart:', error);    //getting error
      });
    }
    // this.getTotal();
    this.ngOnInit();
  }


  //calculate pizaa price and quantity
  calculatePrice(item: any): number {
    return item.price * item.qty;
  }

  //calculate  subtotal for pizza 
  calculateTotalPrice(): void {
    this.subtotal = 0;
    this.subtotal = this.cartData.reduce((subtotal: any, item: any) => subtotal + this.calculatePrice(item), 0);
    console.log("print", this.subtotal)
  }

  //calculate Ingredients price a
  calculateIngrePrice(t: any) {
    return t.price * 1;
  }

  //calculate  subtotal for Ingrdients
  calculateIngreTotalPrice() {
    this.IngreSubtotal = 0;
    this.IngreSubtotal = this.toppings.reduce((IngreSubtotal: any, t: any) => IngreSubtotal + this.calculateIngrePrice(t), 0);
  }
}
