import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { CoreModule } from './core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {AuthenticationService} from './services/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { HomeComponent } from './components/home/home.component';
import { RegistrationComponent } from './components/registration/registration.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NavigationComponent } from './components/navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { PerfilComponent } from './components/perfil/perfil.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MatGridListModule } from '@angular/material/grid-list';
import { DetallesComponent } from './components/detalles/detalles.component';
import {
  MzButtonModule,
  MzCardModule,
  MzHalfwayFabModule,
  MzIconMdiModule,
  MzIconModule,
  MzInputModule, MzNavbarModule
} from 'ngx-materialize';

import { ChatComponent } from './components/chat/chat.component';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegistrationComponent,
    NavigationComponent,
    PerfilComponent,
    DetallesComponent,
    ChatComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatCardModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatToolbarModule,
    MatMenuModule,
    MatSidenavModule,
    LayoutModule,
    MatIconModule,
    MatListModule,
    MatTabsModule,
    MatGridListModule,
    MzCardModule,
    MzButtonModule,
    MzHalfwayFabModule,
    MzIconModule,
    MzInputModule,
    MzIconMdiModule,
    MzNavbarModule,
    HttpClientModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
