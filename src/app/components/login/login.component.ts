import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { CartService } from 'src/app/services/cart.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;
  constructor(public afAuth: AngularFireAuth, private authService: AuthService,
    private router: Router, private userService: UserService,
    private cartService: CartService) { }

  ngOnInit() {

  }

  login() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(userCred => {
          this.user = {
            uid: userCred.user.uid,
            photoUrl: userCred.user.photoURL,
            email: userCred.user.email,
            displayName: userCred.user.displayName
          }
          // this.userService.updateUser(this.user);
          this.userService.setUser(this.user);
          this.cartService.getCartByUser(this.user.uid).subscribe(cart=> {
            if (!cart) this.cartService.createCart(this.user.uid);
          })
          
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
