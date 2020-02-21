import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, Subject, throwError} from 'rxjs';
import {Session} from '../core/models/session.model';
import {catchError, map} from 'rxjs/operators';
import {User} from '../core/models/user.model';
import {LoginObject} from '../core/models/loginObject';

// tslint:disable-next-line:class-name
export interface loginRes {
  token: string;
  user: {
    id: number;
    username: string;
    email: string;
    avatar_url: string;
  };
}

@Injectable()
export class AuthenticationService {
  public baseURL = 'http://localhost:8081/api/v1/users/';
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
        return new Session(res.token, new User(res.user.username, res.user.email, res.user.avatar_url, res.user.id));
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
