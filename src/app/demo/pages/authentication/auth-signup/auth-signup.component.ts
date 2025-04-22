import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from 'src/app/demo/service/auth/auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';  // Importer ReactiveFormsModule
import { HttpClientModule } from '@angular/common/http'; 
@Component({
  selector: 'app-auth-signup',
  standalone: true,
  imports: [RouterModule,BrowserModule,
      ReactiveFormsModule,  
      HttpClientModule ],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export default class AuthSignupComponent {
  signupForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Methode de soumission du formulaire
  onSubmit(): void {
    if (this.signupForm.valid) {
      const user = this.signupForm.value;
      this.authService.signup(user).subscribe(
        response => {
          this.router.navigate(['auth/signin']);  // Redirection après inscription réussie
        },
        error => {
          console.error('Error during signup', error);
        }
      );
    }}
}

