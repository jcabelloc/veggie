import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afs: AngularFirestore) { }

  updateUser(user: User) {
    return this.afs.doc<User>('users/'+user.uid).update(user);
  }

  setUser(user: User) {
    return this.afs.doc<User>('users/'+user.uid).set(user);
  }

  getAllUsers(){
    return this.afs.collection<User>('users').valueChanges();
  }

}
