import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-transaction-list',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent {

  transactions: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.transactions = this.bookingService.getAll();
  }

}
