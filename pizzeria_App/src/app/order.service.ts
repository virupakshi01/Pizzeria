import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class OrderService {



  constructor(private http:HttpClient) { }

  cartData:any[]=[];
  ingreData:any[]=[];
  toppingCost=0;
  total=0;
  pizza:any;
  cartItems:any[]=[];

  
  addToCartItems(){
    this.cartItems.push(this.cartData);
    this.cartItems.push(this.ingreData);
    console.log(this.cartItems);
  }

  fetchOrderPizza(){
    return this.http.get('http://localhost:3000/pizzas');
  }
  fetchIngredients(){
    return this.http.get("http://localhost:3000/ingredients");
  }

//Ingrdients Build Pizza Services//
  addToCartIng(checkedIngredients:any){
    console.log("in service checked data",checkedIngredients);
    this.ingreData=checkedIngredients;
    return this.http.post("http://localhost:3000/ingadd",checkedIngredients);
  }

  getcartIngredient(){
    return this.http.get('http://localhost:3000/cartIngre');
  }

  // Method to remove item from the cart
  removeFromCartIngre(igreId:String) {
    return this.http.delete('http://localhost:3000/deleteIngre',{ body: { igreId } });
  }


  //Pizza services
  addToCartservice(pizza: any) {
    return this.http.post('http://localhost:3000/cart', pizza);
  }


  getCartItem(){
    return this.http.get('http://localhost:3000/cartitem');
  }
  
  removeFromCart(pizzaid: string) {
    console.log("in service remove",pizzaid);
    return this.http.delete('http://localhost:3000/deleteItem', { body: { pizzaid } });
  }

  //increment cart item
  incrementCartItem(pizzaid:any) {
    console.log("in service incrementr",pizzaid);
    return this.http.put(`http://localhost:3000/increment`,{pizzaid});
  }

  //decrement cart item
  decrementCartItem(pizzaid:any) {
    console.log("in service decrement",pizzaid);
    return this.http.put(`http://localhost:3000/decrement`,{pizzaid});
  }

  //register
  registerUser(user:any){
    console.log({username:user.uname,password:user.upass});
    return this.http.post('http://localhost:3000/register',{username:user.uname,password:user.upass});
  }

  loginUser(user:any){
    console.log({username:user.uname,password:user.upass});
    return this.http.post('http://localhost:3000/login',{username:user.uname,password:user.upass});
  }
}
