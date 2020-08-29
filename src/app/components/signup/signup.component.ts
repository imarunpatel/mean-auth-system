import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router
  ) {
    this.signupForm = this.fb.group({
      name: [null],
      email: [null],
      password: [null]
    })
   }

  ngOnInit(): void {
  }

  registerUser() {
    this.authService.signUp(this.signupForm.value).subscribe(
      ((res) => {
        if (res) {
          this.signupForm.reset()
          this.router.navigate(['log-in']);
        }
      })
    )
  }

}
