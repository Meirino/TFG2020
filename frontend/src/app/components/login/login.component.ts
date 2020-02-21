import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {StorageService} from '../../core/services/storage.service';
import {AuthenticationService} from '../../services/auth.service';
import {LoginObject} from '../../core/models/loginObject';
import {User} from '../../core/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public registerForm: FormGroup;

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
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public login() {
    this.submitted = true;
    this.error = null;

    if (this.loginForm.valid) {
      this.authenticationService.login(new LoginObject(this.loginForm.value)).subscribe(
        data => {
          console.log(data);
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

  register() {
    this.submitted = true;
    this.error = null;

    console.log(this.registerForm.value);
    console.log(this.registerForm.valid);
    if (this.registerForm.valid && this.validate()) {
      this.authenticationService.register({ username: this.registerForm.get('username').value,
        password: this.registerForm.get('password').value, email: this.registerForm.get('email').value, avatarUrl: '', id: 0}).subscribe(
        data => {
          this.error = {code: 0, message: 'Registro existoso'};
        },
        error => {
          console.log(error);
          this.error = {code: 500, message: error};
        }
      );
    } else {
      this.error = {code: 0, message: 'Por favor, rellene todos los campos'};
    }
  }

  validate(): boolean {
    const pattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    console.log(pattern.test(this.registerForm.get('email').value));
    return pattern.test(this.registerForm.get('email').value);
  }
}
