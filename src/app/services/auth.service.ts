import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Employee } from '../models/Employee.class';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty';
  private apikey = 'AIzaSyD13VTeDnPMDciuG2SrWIlt_OjOcDQucuA';

  public userToken: string;

  constructor( private http: HttpClient ) {
    this.leerToken();
  }


  logout() {
    localStorage.clear();
    this.userToken = '';
  }

  login( employee: Employee ) {

    const authData = {
      ...employee,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/verifyPassword?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        return resp;
      })
    );

  }

  nuevoemployee( employee: Employee ) {

    const authData = {
      ...employee,
      returnSecureToken: true
    };

    return this.http.post(
      `${ this.url }/signupNewUser?key=${ this.apikey }`,
      authData
    ).pipe(
      map( resp => {
        this.guardarToken( resp['idToken'] );
        return resp;
      })
    );

  }


  guardarToken( idToken: string ) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    // let hoy = new Date();
    // hoy.setSeconds( 3600 );

    // localStorage.setItem('expira', hoy.getTime().toString() );


  }

  leerToken() {

    if ( localStorage.getItem('token') ) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;

  }


  estaAutenticado(): boolean {

    if ( this.userToken.length < 2 ) {
      return false;
    }

    return true;

    // const expira = Number(localStorage.getItem('expira'));
    // const expiraDate = new Date();
    // expiraDate.setTime(expira);

    // if ( expiraDate > new Date() ) {
    //   return true;
    // } else {
    //   return false;
    // }


  }


}
