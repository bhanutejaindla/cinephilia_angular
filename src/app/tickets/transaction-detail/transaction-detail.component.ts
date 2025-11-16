import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BookingHistoryService } from '../../core/booking-history.service';

@Component({
  selector: 'app-transaction-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent],
  templateUrl: './transaction-detail.component.html',
  styleUrls: ['./transaction-detail.component.css']
})
export class TransactionDetailComponent {

  ticket: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private bookingHistory: BookingHistoryService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.params['id']);

    // 🔥 Get real ticket using service
    this.ticket = this.bookingHistory.getById(id);

    // Safety check if user tries to open invalid ticket
    if (!this.ticket) {
      alert("Ticket not found!");
      this.router.navigate(['/my-tickets']);
    }
  }

  goBack() {
    this.router.navigate(['/my-tickets']);
  }
}
