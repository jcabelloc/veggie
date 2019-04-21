import { Injectable } from '@angular/core';
import { Contact } from '../models/Contact';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor( private afs: AngularFirestore) { }

  createContact(contact: Contact){
    return this.afs.collection<Contact>('contacts').add(contact);
  }

}
