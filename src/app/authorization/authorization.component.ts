import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizationService } from 'src/services/authorization.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  loginForm = new FormGroup({
    userid: new FormControl(null, [Validators.required]),
    upassword: new FormControl(null, [Validators.required]),
    uname: new FormControl(null),
  });

  loginError = '';
  constructor(private loginService: AuthorizationService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log("form submitted");
    if (this.loginForm.valid) {
      this.loginForm.controls['uname'].setValue(this.loginForm.value.userid);
      this.loginService.generateToken(this.loginForm.value).subscribe(
        (response: any) => {
          console.log("success");
          console.log(response);
          this.loginService.loginUser(response.authToken, response.userid);
          // window.location.href = "/pensionDetails";
          this.router.navigate(['/pensionDetails']);
        },(error:any) => {
          console.log("error");
          console.log(error);
          this.loginError = "Invalid Credentials"
        }
      );
    } else {
      this.loginError = "Missing Credentials"
    }
  }
}
