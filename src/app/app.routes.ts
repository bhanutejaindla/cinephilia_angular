import { Routes } from '@angular/router';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { SeatsComponent } from './seats/seats.component';

export const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomeComponent },
  { path: 'schedule/:id', component: ScheduleComponent },
  { path: 'seats/:id', component: SeatsComponent },
  {
    path: 'payment-confirmation',
    loadComponent: () =>
        import('./payment/payment-confirmation/payment-confirmation.component')
        .then(m => m.PaymentConfirmationComponent)
  },

  {
    path: 'payment-success',
    loadComponent: () =>
        import('./payment/payment-success/payment-success.component')
        .then(m => m.PaymentSuccessComponent)
  }

];
