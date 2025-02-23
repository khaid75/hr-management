import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  signupForm: FormGroup;
  roles: string[] = ['Employee', 'Admin'];





  constructor(private fb: FormBuilder, private servicen: StorageService, private router: Router, private authService: AuthService) {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required,],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {

      this.authService.register(this.signupForm.value.username, this.signupForm.value.email, this.signupForm.value.password).subscribe( {

        next: val=>{

          console.log('Signup Data:', this.signupForm.value, val);
          alert('Signup Successful!');
        },
        error: val=>{

          console.log('Signup Data:', this.signupForm.value, val);
          alert('ABCD Successful!');
          
        }
        
      });
 
    }
  }
}