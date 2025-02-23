import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  roles: string[] = ['Employee', 'Admin'];
  errorMessage = "";
  constructor(private fb: FormBuilder, private authService: AuthService, private storageService: StorageService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Login Data:', this.loginForm.value);
      this.authService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
        next:val => {
          this.storageService.saveUser(val);
          const role = this.storageService.getUserRole();
          if (role) {
  
            if (role === 'ROLE_ADMIN') {
              this.router.navigate(['/admin']);
            } else if (role === 'ROLE_MODERATOR') {
              console.log('-------------------', role);
              this.router.navigate(['/home']);
            } else {
              this.router.navigate(['/employee']);
            }
          } else {
            this.errorMessage = "Invalid username or password!";
          }
          alert('Login Successful!');
        },
        error:val => {
          alert('Login Error!');
        }
      })
    }
  }
}
