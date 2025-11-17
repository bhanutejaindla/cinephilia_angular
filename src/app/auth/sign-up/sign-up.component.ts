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

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  signupForm!: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        this.passwordStrengthValidator
      ]],
      confirmPassword: ['', Validators.required]
    }, { 
      validators: this.passwordMatchValidator 
    });
  }

  // Custom validator for password strength
  passwordStrengthValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumeric = /[0-9]/.test(value);
    const hasSpecialChar = /[@$!%*?&#]/.test(value);

    const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecialChar;
    
    return valid ? null : { 
      passwordStrength: {
        hasUpperCase,
        hasLowerCase,
        hasNumeric,
        hasSpecialChar
      }
    };
  }

  // Custom validator to check if passwords match
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (!password || !confirmPassword) return null;

    return password.value === confirmPassword.value ? null : { passwordMismatch: true };
  }

  get f() {
    return this.signupForm.controls;
  }

  // Helper to check password match error
  get passwordMismatch(): boolean {
    return this.signupForm.hasError('passwordMismatch') && 
           this.f['confirmPassword'].touched;
  }

  togglePass() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPass() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      this.signupForm.markAllAsTouched();
      return;
    }

    // Check if email already exists
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const exists = users.find((u: any) => u.email === this.signupForm.value.email);
    
    if (exists) {
      alert("Email already registered!");
      return;
    }

    // Save user (excluding confirmPassword)
    const { confirmPassword, ...userData } = this.signupForm.value;
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert("Account created successfully! Redirecting to Sign In...");
    this.router.navigate(['/sign-in']);
  }
}
