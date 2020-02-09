import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject, throwError} from 'rxjs';
import {LoginObject} from '../../../../frontend/src/app/models/login';
import {Session} from '../core/models/session.model';
import {User} from '../../../../frontend/src/app/models/user';
import {catchError, map} from 'rxjs/operators';

// tslint:disable-next-line:class-name
export interface loginRes {
  success: boolean;
  message: string;
  token: string;
  userdata: {
    id: number;
    user_name: string;
    email: string;
  };
}

@Injectable()
export class AuthenticationService {
  public baseURL = 'http://localhost:8000/api/v1/';
  private logInErrorSubject = new Subject<string>();

  constructor(public http: HttpClient, public router: Router) {
  }

  public getLoginErrors(): Subject<string> {
    return this.logInErrorSubject;
  }

  login(loginObj: LoginObject): Observable<Session> {
    return this.http.post<loginRes>(this.baseURL + 'login', loginObj).pipe(
      map(res => {
        console.log(res);
        return new Session(res.token, new User(res.userdata.user_name, res.userdata.email, res.userdata.id));
      }),
      catchError(this.handleError)
    );
  }

  logout(): Observable<boolean> {
    const currentUser = localStorage.getItem('currentUser');
    const session = JSON.parse(currentUser) as Session;
    if (session) {
      try {
        return this.http
          .get<boolean>(this.baseURL + 'logout', { headers: {authorization: 'Bearer ' + session.token}});
      } catch (error) {
        this.logInErrorSubject.next('Algo ha salido mal :(');
      }
    }
  }

  register(newUser: User): Observable<boolean> {
    return this.http.post<boolean>(this.baseURL + 'register', {
      email: newUser.email,
      username: newUser.username,
      password: newUser.password
    }).pipe(
      map(
        (res) => {
          return res;
        }
      ),
      catchError(this.handleError)
    );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del servidor
      if (error.status === 409) {
        errorMessage = 'Ya existe un usuario registrado con ese correo.';
      }
      if (error.status === 500) {
        errorMessage = 'Algo salió mal.';
      }
      if (error.status === 404) {
        errorMessage = 'Usuario no encontrado. Revise los datos.';
      }
      if (error.status === 401 || error.status === 403) {
        errorMessage = 'Credenciales incorrectas.';
      }
    }
    return throwError(errorMessage);
  }
}
