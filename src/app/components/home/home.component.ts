import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/Contact';
import {MatSnackBar} from '@angular/material';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  contact: Contact = {
    name : '',
    email: '',
    subject: '',
    message: ''

  };
  constructor(private snackBar: MatSnackBar,
    private contactService: ContactService
    ) { }

  ngOnInit() {
  }

  onSubmit({value, valid}: {value: any, valid: boolean}) {
    if (!valid) {
      this.snackBar.open('Incomplete information', 'Try again', {
        duration: 2000,
      });
      return;
    }
    this.contactService.createContact(this.contact).then(
      docRef => {
        this.contact = {
          name : '',
          email: '',
          subject: '',
          message: ''
        }
        this.snackBar.open('Message submitted', 'Thank you!', {
          duration: 3000,
          });;
    });

  }
}
