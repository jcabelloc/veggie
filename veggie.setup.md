# Project Set Up

* Reference: https://angular.io/guide/quickstart

## Angular Project

### Set up tools
* Install NodeJS (it includes npm). https://nodejs.org/en/
* Install Visual Studio Code
* Install Git (includes Git Bash) (https://git-scm.com)
* Integrate Git Bash terminal into Visual Studio Code


### Install the angular CLI
You use the Angular CLI to create projects, generate application and library code, and perform a variety of ongoing development tasks such as testing, bundling, and deployment.

```bash
npm install -g @angular/cli
```

### Create the workspace and initial application
```bash
ng new veggie
```
* Consider the two following answers


? Would you like to add Angular routing? (y/N) y

? Which stylesheet format would you like to use? (Use arrow keys)
> CSS    (.css )

### Serve the App
```bash
cd veggie
ng serve --open
```
* Then, go to: http://localhost:4200/


## Angular Material Set Up
* Reference: https://material.angular.io/guide/getting-started

### Step 1: Install Angular Material, Angular CDK and Angular Animations

```bash
npm install --save @angular/material @angular/cdk @angular/animations

```

### Alternative 2: Angular Devkit 6+
```bash
ng add @angular/material
```
* Consider the following answers 

Skipping installation: Package already installed
? Choose a prebuilt theme name, or "custom" for a custom theme: Pink/Blue Grey     [ Preview: https://material.angular.io?theme=pink-bluegrey ]
? Set up HammerJS for gesture recognition? Yes
? Set up browser animations for Angular Material? (Y/n) Y


### Step 2: Configure animations
Once the animations package is installed, import BrowserAnimationsModule into your application to enable animations support.

```ts
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  ...
  imports: [BrowserAnimationsModule],
  ...
})
export class PizzaPartyAppModule { }
```

### Step 3: Import the component modules
Import the NgModule for each component you want to use:

```ts
import {MatButtonModule, MatCheckboxModule} from '@angular/material';

@NgModule({
  ...
  imports: [MatButtonModule, MatCheckboxModule],
  ...
})
export class PizzaPartyAppModule { }
```

### Step 4: Include a theme

Done in the Alternative 2 step?

### Step 5: Gesture Support
Some components (mat-slide-toggle, mat-slider, matTooltip) rely on HammerJS for gestures.

```bash
npm install --save hammerjs

```

After installing, import it on your app's entry point (e.g. src/main.ts).

### Step 6 (Optional): Add Material Icons
To use the mat-icon component with the official Material Design Icons, load the icon font in your index.html.

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
```

## Add Firestore to Veggie Project
* Reference: https://github.com/angular/angularfire2/blob/master/docs/install-and-setup.md
### Install AngularFire and Firebase
```bash
npm install @angular/fire firebase --save
```

### Add Firebase config to environments variable
* Open /src/environments/environment.ts and add your Firebase configuration. You can find your project configuration in the Firebase Console. From the project overview page, click Add Firebase to your web app.
```ts

export const environment = {
  production: false,
  firebase: {
    apiKey: '<your-key>',
    authDomain: '<your-project-authdomain>',
    databaseURL: '<your-database-URL>',
    projectId: '<your-project-id>',
    storageBucket: '<your-storage-bucket>',
    messagingSenderId: '<your-messaging-sender-id>'
  }
};
```

### Setup @NgModule for the AngularFireModule
Open /src/app/app.module.ts, inject the Firebase providers, and specify your Firebase configuration.
```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';

@NgModule({
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'app-veggie'),
    AngularFirestoreModule,
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
```

## Deploy web project on Firebase Hosting
* Reference: https://firebase.google.com/docs/hosting/quickstart

### Install the Firebase CLI using npm by running
```bash
npm install -g firebase-tools
```

### Sign into Firebase using your Google account by running
```bash
firebase login
```

### Test that authentication worked 
```bash
firebase list
```

### Initialize your project
To connect your local project to your Firebase project, run the following command from the root of your local project directory
```bash
firebase init
```
* Select to set up Hosting.
* Select a Firebase project to connect to your local project directory.
* Specify a directory to use as your public root directory: dist/veggie
* Choose a configuration for your site: (Y) single-page app
* Do not replace index.html: (N) rewrite index.html

### Deploy to your site
```bash
firebase deploy
```
### Visit your web site
https://veggie-7c023.firebaseapp.com/shop