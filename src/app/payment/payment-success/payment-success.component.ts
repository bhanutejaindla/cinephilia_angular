import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule,NavbarComponent,FooterComponent],
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent {

  constructor(private router: Router) {}

  exploreMovies() {
    this.router.navigate(['/home']);
  }
}
