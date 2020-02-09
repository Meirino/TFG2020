import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from './services/storage.service';
import {AuthorizatedGuard} from './guards/auth.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    StorageService,
    AuthorizatedGuard
  ]
})
export class CoreModule { }
