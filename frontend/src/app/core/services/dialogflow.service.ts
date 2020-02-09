import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {StorageService} from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DialogflowService {

  public baseURL = 'http://18.212.103.97:4000/api/chat';
  private nextContext = '';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(public http: HttpClient, public storageService: StorageService) {}

  public getResponse(query: string): Observable<string> {
    const data = {};
    return this.http
      .post<any>(
        this.baseURL,
        { mensaje: query, context: this.nextContext },
        this.httpOptions
      )
      .pipe(
        map(res => {
          if (res.intent === 'secureBrowsing - Phising Final') {
            console.log('¡Lección completada!');
            this.completeLesson(2);
          }
          this.nextContext = res.context;
          return res.text;
        })
      );
  }

  public completeLesson(id: number) {
    this.http
      .put('http://18.212.103.97:4000/api/lecciones', {
        leccion: id,
        // tslint:disable-next-line:radix
        usuario: parseInt(this.storageService.getCurrentUser().id)
      })
      .subscribe(result => {
        console.log(result);
      });
  }
}
