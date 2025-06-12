import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private os:OrderService , private router:Router){}

  userdata:any;
  login(formdata:any){
    this.userdata = formdata;
    console.log("in login compoo ayys",this.userdata);
    
    this.os.loginUser(this.userdata).subscribe({
      next:()=>{
        this.router.navigate(['/home']);
      },error:(error)=>{
        console.error("Error in navigating",error.error.message);
        
      }
    })
  }
}
