import { Component } from '@angular/core';
import { OrderService } from '../order.service';

@Component({
  selector: 'app-build-pizza',
  templateUrl: './build-pizza.component.html',
  styleUrls: ['./build-pizza.component.css']
})
export class BuildPizzaComponent {
  
  ingredients:any;
  checkedIngredients:any[]=[];
  totalingre:any;
  cost=0;

  constructor(private os:OrderService){}

  ngOnInit(){
    this.os.fetchIngredients().subscribe(x=>{
      this.ingredients=x;
      this.ingredients.map((data:any)=>data.checked=false);
    },(err)=>{
      console.log("Error in fetching buildpizza data",err);
      
    });
  }

  calcCost(input:any,e:any){
    if(e.target.checked){
      this.checkedIngredients.push(input);
      this.cost+= input.price;
    }else{
      this.checkedIngredients = this.checkedIngredients.filter((item:any)=>item.id != input.id);
      this.cost -=input.price; 
    }
    this.totalingre = this.checkedIngredients;
  }

  //send ingredients to cart
  sendIngredients(){
    this.os.addToCartIng(this.totalingre).subscribe(cheked=>{
      console.log("in compo ",cheked);
      
    },err=>{
      console.log('Error adding item to cart:', err);
      
    })
  }
}
