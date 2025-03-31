import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../shared/models/User';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });
  
  isLoading = false;
  showForm = true;
  registerError = '';

  constructor(private router: Router) {}

  register(): void {
    if (this.registerForm.invalid) {
      this.registerError = 'Please correct the form errors before submitting.';
      return;
    }

    const password = this.registerForm.get('password');
    const rePassword = this.registerForm.get('rePassword');

    if (password?.value !== rePassword?.value) {
      this.registerError = 'Passwords do not match.';
      return;
    }

    this.isLoading = true;
    this.showForm = false;

    const newUser: User = {
      name: {
        firstname: this.registerForm.value.name?.firstname || '',
        lastname: this.registerForm.value.name?.lastname || ''
      },
      email: this.registerForm.value.email || '',
      password: this.registerForm.value.password || '',
      products_in_cart: [],
    };

    console.log('New user:', newUser);
    console.log('Form value:', this.registerForm.value);

    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 1500);
  }
}