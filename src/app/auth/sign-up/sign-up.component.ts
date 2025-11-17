// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormGroup , FormBuilder,Validators,ReactiveFormsModule} from '@angular/forms';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-sign-up',
//   standalone: true,
//   imports: [CommonModule,ReactiveFormsModule],
//   templateUrl: './sign-up.component.html',
//   styleUrl: './sign-up.component.css'
// })
// export class SignUpComponent {
//   signupForm!: FormGroup;
//   showPassword = false;
//   showConfirmPassword = false;

//   constructor(private fb: FormBuilder, private router: Router) {}

//   ngOnInit() {
//     this.signupForm = this.fb.group({
//       username: ['', Validators.required],
//       phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
//       email: ['', [Validators.required, Validators.email]],
//       password: ['',[
//         Validators.required,
//         Validators.minLength(8),
//         Validators.pattern(/(?=.*[a-z])(?=.*[A-Z])/), // Upper + lower
//         Validators.pattern(/(?=.*\d)/),              // Digit
//         Validators.pattern(/(?=.*[@$!%*?&])/),        // Special char
//       ]
//     ],
//       confirmPassword: ['', Validators.required],
//   });
// }

// get f() {
//   return this.signupForm.controls;
// }

// togglePass() {
//   this.showPassword = !this.showPassword;
// }

// toggleConfirmPass() {
//   this.showConfirmPassword = !this.showConfirmPassword;
// }
// onSubmit() {
//     if (this.signupForm.invalid) {
//       this.signupForm.markAllAsTouched();
//       return;
//     }

//     if (this.signupForm.value.password !== this.signupForm.value.confirmPassword) {
//       alert("Passwords do not match!");
//       return;
//     }

//     let users = JSON.parse(localStorage.getItem('users') || '[]');

//     const exists = users.find((u: any) => u.email === this.signupForm.value.email);
//     if (exists) {
//       alert("Email already registered!");
//       return;
//     }

//     users.push(this.signupForm.value);
//     localStorage.setItem('users', JSON.stringify(users));

//     alert("Account created! Redirecting to Sign In...");
//     this.router.navigate(['/sign-in']);
//   }
// }

<div class="signup-container">

  <!-- LEFT SIDE (BACKGROUND IMAGE + LOGO) -->
  <div class="left-panel">
    <div class="logo">Cinemania<br>Delight</div>
  </div>

  <!-- RIGHT SIDE FORM -->
  <div class="form-panel">
    <h2>SIGN UP</h2>

    <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">

      <label>User Name</label>
      <input type="text" formControlName="username" placeholder="John Doe">
      <p *ngIf="f['username'].touched && f['username'].invalid">Required</p>

      <label>Enter Phone Number</label>
      <input type="text" formControlName="phone" placeholder="+91 | 9876543210">
      <p *ngIf="f['phone'].touched && f['phone'].invalid">Invalid phone number</p>

      <label>Email</label>
      <input type="email" formControlName="email" placeholder="john.doe@gmail.com">
      <p *ngIf="f['email'].touched && f['email'].invalid">Invalid email</p>

      <label>Password</label>
      <div class="password-box">
        <input [type]="showPassword ? 'text' : 'password'" formControlName="password">
        <button type="button" (click)="togglePass()">👁</button>
      </div>
      <p *ngIf="f['password'].touched && f['password'].invalid">
        Must contain uppercase, lowercase, number, special char
      </p>

      <label>Confirm Password</label>
      <div class="password-box">
        <input [type]="showConfirmPassword ? 'text' : 'password'" formControlName="confirmPassword">
        <button type="button" (click)="toggleConfirmPass()">👁</button>
      </div>

      <button class="signup-btn" type="submit">SIGN UP</button>

    </form>

    <div class="signin-link">
      <a routerLink="/sign-in">Sign In ?</a>
    </div>

  </div>
</div>
