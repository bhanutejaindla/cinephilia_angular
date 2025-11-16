import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookingHistoryService {
  
  private history: any[] = [];

  addTicket(ticket: any) {
    this.history.push({
      id: Date.now(),
      ...ticket
    });
  }

  getAll() {
    return this.history;
  }

  getById(id: number) {
    return this.history.find(t => t.id === id);
  }
}
