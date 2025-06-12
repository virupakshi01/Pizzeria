import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  constructor(private os:OrderService,private router:Router){}

  user_credentials:any;

  register(formdata:any){
    this.user_credentials=formdata;
    this.os.registerUser(this.user_credentials).subscribe({
      next:()=>{
        this.router.navigate(['/login']);
      },error:(error)=>{
        console.error("Error in navigating",error.error.message);

      }
    })
  }
}
