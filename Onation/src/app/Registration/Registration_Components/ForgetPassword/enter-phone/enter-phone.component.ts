import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enter-phone',
  templateUrl: './enter-phone.component.html',
  styleUrl: './enter-phone.component.css'
})
export class EnterPhoneComponent {
  constructor(private router:Router){}
  showsendcode(){
    this.router.navigate(['/SendCode'])
  }
  showemail(){
    this.router.navigate(['/EnterEmail'])
  }
}
