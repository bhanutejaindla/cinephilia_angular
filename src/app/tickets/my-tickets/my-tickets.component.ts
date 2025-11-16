import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-tickets',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent {

  activeTickets: any[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit() {
    this.activeTickets = this.bookingService
      .getAll()
      .filter(t => t.status === 'BOOKED');
  }

}
