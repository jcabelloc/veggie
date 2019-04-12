import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private authService: AuthService,
    private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(data => {
          this.router.navigate(['home']);
        });

  }

  logout() {
    this.afAuth.auth.signOut().then(
      e => {
        this.router.navigate(['home']);

      }
    );
  }



}
