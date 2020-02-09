import {Component, OnInit} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {User} from '../../core/models/user.model';
import {StorageService} from '../../core/services/storage.service';
import {AuthenticationService} from '../../services/auth.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public user: User;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private storageService: StorageService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.user = this.storageService.getCurrentUser();
  }
  public logout() {
    this.authenticationService.logout().subscribe(
      response => {
        if (response) {
          this.storageService.logout();
        }
      }
    );
  }
}
