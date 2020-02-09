import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StorageService} from '../../core/services/storage.service';
import {AuthenticationService} from '../../services/auth.service';
import {LoginObject} from '../../../../../frontend/src/app/models/login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public submitted = false;
  public error: {code: number, message: string} = null;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private storageService: StorageService,
              private router: Router) { }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public login() {
    this.submitted = true;
    this.error = null;

    console.log(this.loginForm.value);
    console.log(this.loginForm.valid);
    if (this.loginForm.valid) {
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
        data => {
          this.storageService.setCurrentSession(data);
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.error = {code: 500, message: error};
        }
      );
    } else {
      this.error = {code: 0, message: 'No es un correo válido'};
    }
  }

}
