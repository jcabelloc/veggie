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

