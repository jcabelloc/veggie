import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../models/User';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public afAuth: AngularFireAuth) { }
  user: User = null;
  /* Decprecated 
  getAuth1(){
    return this.afAuth.authState.pipe(
      map( auth => {
        this.user = {}
        this.user.name = auth.displayName;
        this.user.username = auth.email;
        return this.user;
      })
    )
  }
  */
 
  getAuth(){
    return this.afAuth.authState;
  }
}
