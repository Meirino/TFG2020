import { Component } from '@angular/core';
import {StorageService} from './core/services/storage.service';
import {AuthenticationService} from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend-app';

  constructor(
    public storageService: StorageService,
    private authenticationService: AuthenticationService
  ) {}
}
