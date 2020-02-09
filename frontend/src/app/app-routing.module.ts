import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './components/home/home.component';
import {AuthorizatedGuard} from './core/guards/auth.guard';
import {LoginComponent} from './components/login/login.component';
import {RegistrationComponent} from './components/registration/registration.component';
import {NavigationComponent} from './components/navigation/navigation.component';
import {PerfilComponent} from './components/perfil/perfil.component';
import {ChatComponent} from './components/chat/chat.component';


const routes: Routes = [
  { path: 'home', component: NavigationComponent, canActivate: [ AuthorizatedGuard ] },
  { path: 'profile', component: PerfilComponent, canActivate: [ AuthorizatedGuard ], outlet: 'internal' },
  { path: 'chat', component: ChatComponent, canActivate: [ AuthorizatedGuard ], outlet: 'internal' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
