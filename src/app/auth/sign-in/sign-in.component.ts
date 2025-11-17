// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
// import { Router } from '@angular/router';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-sign-in',
//   standalone: true,
//   imports: [CommonModule, ReactiveFormsModule],
//   templateUrl: './sign-in.component.html',
//   styleUrls: ['./sign-in.component.css']
// })
// export class SignInComponent {

//   loginForm!: FormGroup;
//   showPassword = false;
//   error = '';

//   constructor(private fb: FormBuilder, private router: Router) {}

//   ngOnInit() {
//     this.loginForm = this.fb.group({
//       phone: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
//       password: ['', Validators.required]
//     });
//   }

//   get f() {
//     return this.loginForm.controls;
//   }

//   togglePass() {
//     this.showPassword = !this.showPassword;
//   }

//   onSubmit() {
//     if (this.loginForm.invalid) {
//       this.error = "Please enter valid credentials";
//       return;
//     }

//     let users = JSON.parse(localStorage.getItem('users') || '[]');

//     const user = users.find(
//       (u: any) =>
//         u.phone === this.loginForm.value.phone &&
//         u.password === this.loginForm.value.password
//     );

//     if (!user) {
//       this.error = "Invalid phone number or password";
//       return;
//     }

//     localStorage.setItem('currentUser', JSON.stringify(user));

//     alert("Login Successful!");

//     this.router.navigate(['/home']);
//   }
// }
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  // Model for form data
  loginData = {
    phone: '',
    password: ''
  };

  showPassword = false;
  error = '';

  constructor(private router: Router) {}

  togglePass() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(form: any) {
    // Reset error message
    this.error = '';

    // Check if form is valid
    if (form.invalid) {
      this.error = "Please enter valid credentials";
      return;
    }

    // Get users from localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');

    // Find matching user
    const user = users.find(
      (u: any) =>
        u.phone === this.loginData.phone &&
        u.password === this.loginData.password
    );

    if (!user) {
      this.error = "Invalid phone number or password";
      return;
    }

    // Store current user and navigate
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert("Login Successful!");
    this.router.navigate(['/home']);
  }
}
