import { Component, Output } from '@angular/core';
import { OrderService } from '../order.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pizza-details',
  templateUrl: './pizza-details.component.html',
  styleUrls: ['./pizza-details.component.css']
})
export class PizzaDetailsComponent {
  constructor(private os:OrderService,private http:HttpClient){}

  pizzaData:any;
  // onePizza:any;
  // cart:any;

  notFetched=true;

  ngOnInit(){
    this.os.fetchOrderPizza().subscribe(x=>{
      this.pizzaData=x;
      // this.notFetched=false;
    })    
  }

// add to acrt
  addtocart(pizza: any): void {
    this.os.addToCartservice(pizza).subscribe(response => {
      pizza.qty=1;
      alert('Item added to The cart');
      console.log(response);
      
    }, (error:any) => {
      console.error('Error adding item to cart:', error);
    });

  }

}
