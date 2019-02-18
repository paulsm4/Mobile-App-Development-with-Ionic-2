* Mobile App Development with Ionic 2, Chris Griffith, 2017

* Initial "Hello world" (testApp):
  - NodeJS 10.15.1
    npm update npm -g => 6.8.0
    npm update ionic -g => 4.10.3
    npm update cordova -g => 8.1.2
    Android Studio > Update => 3.3.1
    Android SDK Build Tools 28.0.3, Android SDK Platform-Tools 28.0.1, Android SDK Tools 26.1.1
    Installed SDK platforms:
      Android 8.1 (Oreo, API 27), Android 4.4 (Kitkat, SDK 19), Android 4.2 (Jelly Bean, SDK 17)

  - Handsets:
    - Samsung SM-J727A, Android 8.1.0
    - LG MyTouch: Android 2.3.6

  - ionic start testApp
    cd testApp
    <= Creates "hello world"
    code .
    <= Start VSCode.  Installed Ionic Extensions.  Debug > Add Configuration > Ionic (multiple "Run" options)
    ionic serve
    <= Automatically brings up Chrome, http://localhost:8100/home.  Can also start from VSCode.
    ionic cordova platform add android
    <= Current syntax (OLD: "ionic platform add android")
    ionic cordova emulate android -l -c 
    <= Will ask for IP, compile project, start emulator, launch app:
[cordova]  d:\paul\proj\HelloIonic2\testApp\platforms\android\app\build\outputs\apk\debug\app-debug.apk
[cordova]  ANDROID_HOME=d:\Android\sdk
[cordova]  JAVA_HOME=D:\Program Files\Java\jdk1.8.0_121
[cordova]  No emulator specified, defaulting to Nexus_5X_API_25
[cordova]  Waiting for emulator to start...
[cordova]  emulator: Requested console port 5584: Inferring adb port 5585.
[cordova]  HAX is working and emulator runs in fast virt mode.
...

  - ionic info =>
Ionic:
   ionic (Ionic CLI)             : 4.10.3 (C:\Users\paulsm\AppData\Roaming\npm\node_modules\ionic)
   Ionic Framework               : @ionic/angular 4.0.1
   @angular-devkit/build-angular : 0.12.4
   @angular-devkit/schematics    : 7.2.4
   @angular/cli                  : 7.2.4
   @ionic/angular-toolkit        : 1.4.0
Cordova:
   cordova (Cordova CLI) : 8.1.2 (cordova-lib@8.1.1)
   Cordova Platforms     : android 7.1.4
   Cordova Plugins       : cordova-plugin-ionic-keyboard 2.1.3, cordova-plugin-ionic-webview 3.1.2, (and 4 other plugins)
System:
   NodeJS : v10.15.1 (D:\Program Files\nodejs\node.exe)
   npm    : 6.8.0
   OS     : Windows 8.1

  - Project size:
    - testApp:              380MB, 36,004 files, 5,392 folders
    - testApp/node_modules: 367MB, 34,840 files, 4,807 folders
    - .git:                 1.53MB    132 files     95 folders
      <= The *bulk* of the project is from node_modules (volatile; easily restored by ionic CLI or "npm install")

  - Ionic AppFlow signup:
https://dashboard.ionicframework.com/signup
https://ionicframework.com/docs/appflow/devapp
    <= TBD: Download/install "DevApp" on handset
===================================================================================================

* Chap7: Building our Ionic2Do App (auto-generated scaffolding):

  - This is the 1st chapter that digs into any custom code

  - Spends a fair amount of time comparing Ionic 1 with Ionic 2...
    ... but, unfortunately, the examples in the book are *themselves* out-of-date
    <= Unfortunately, the book was obsolete before the ink was even dry on the first edition:

  - Differences between Ionic 1 and Ionic 2
    <= marginally useful...
    - KEY TAKE AWAYS:
      - Ionic 2++ and Angular 2++ both re-written from ground up
      - Both now use Typescript (vs. JS); Ionic uses SASS (vs. CSS)
      - Shift to "component-focused development paradigm
        <= This shift largely responsible for changes from Ionic 2(beta) to Ionic++ (now Ionic 4.10)

  - Updates for Ionic4:
https://github.com/chrisgriffith/ionic4book-todo     // Chap 7
https://github.com/chrisgriffith/ionic4book-parks    // Chap 8
https://github.com/chrisgriffith/ionic4book-weather  // Chap 9

  - Differences between Ionic 2 (book) "ionic2Do" sample code and Ionic 4 equivalent:
    - Do *not* add TaskListPage (as "rootDir") in app.component.ts
      <= Instead:
         - src/app/app-routing.module.ts:
             { path: 'task-list', loadChildren: './task-list/task-list.module#TaskListPageModule' }
         - src/app/task-list/task-list{.module.ts, .page.ts, .page.html

  - Ionic4 project structure:
    ionic2Do/           # config.xml (Ionic), ionic.config.json, angular.json, packages/package-lock.json, etc.
      e2e/              # Angular end-end testing
      node_modules/     # NPM dependencies (largest directory)
      platforms/        # Cordova android, ios, etc.
      plugins/          # Cordova plugins: device, keyboard, webview, etc.
      resources/        
      typings/          
      src/              # main.ts, index.html, global.scss, karma.conf.js (Angular unit testing)
        app/            # Application root: app.module.ts, app-routing.module.ts, app.component{.html, .ts, .spec.ts}
          home/         # Scaffolding "home" component: home{.module, ts, .page.html, .page.scss, .page.ts}
        assets/         # shapes, icons, etc.     
        environments/   # prod, default 
        theme/          # variables.scss             
      www/              # <<empty>>  

  - Ionic4 application structure:
    - src/index.html =>
      --------------
        <app-root></app-root>
      - src/app/app.component.html =>
          <ion-app>
            <ion-router-outlet></ion-router-outlet>

    - Scaffolding components:
      - src/app/app.component.ts
      - src/app/home/home.page.ts

    - src/app/app.module.ts:
      ----------------------
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

    - src/app/app-routing.module.ts:
      -----------------------------
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'task-list', pathMatch: 'full' },
  { path: 'task-list', loadChildren: './task-list/task-list.module#TaskListPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

    - src/app/home/home.module.ts:
      ---------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { HomePage } from './home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage
      }
    ])
  ],
  declarations: [HomePage]
})
export class HomePageModule {}

    - src/app/home/home.page.ts:
      -------------------------
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

}

    - src/app/home/home.page.html:
      ---------------------------
<ion-header>
  <ion-toolbar>
    <ion-title>
      Ionic Blank
    </ion-title>
  </ion-toolbar>
</ion-header>

<ion-content padding>
  The world is your oyster.
  <p>If you get lost, the <a target="_blank" rel="noopener" href="https://ionicframework.com/docs/">docs</a> will be your guide.</p>
</ion-content>
   
  - NavController, rootPage, etc et al: deprecated in Ionic 3.5:
https://forum.ionicframework.com/t/getrootnav-deprecated-use-getrootnavbyid-whats-the-value-of-the-root-nav-id/96271
https://stackoverflow.com/questions/51828017/navcontroller-doesnt-work-in-ionic-4
https://www.joshmorony.com/converting-ionic-3-push-pop-navigation-to-angular-routing-in-ionic-4/

===================================================================================================

* Chap7: Customize auto-generated scaffolding => "todo" app (first cut):

0. Create project, auto-generate scaffolding, start VSCode:
   - cd $PROJ
     ionic start ionic2Do blank
     cd ionic2Do
     code .

1. Change app title:
   - src/index.html: change "Ionic App" => "Ionic 2 Do App"

2. Configure "TaskListPage":
   - app.component.ts: NO CHANGE
     <= Unlike book, "app.component.ts" is *NOT* modified; it does *NOT* reference the TaskListPage
        "rootPage", "IonicModule.forRoot()" etc are now *OBSOLETE* (deprecated in Ionic 3.5; removed in Ionic 4.0)
        Instead, "TaskListPage" now referenced as a "page component" from app-routing.module.ts

   - ionic generate page task-list
     <= This creates src/app/task-list/task-list{.module.ts, .page.ts, .page.html, .page.scss and .spec.page.gs};
        Also updates app-routing.module.ts

   - Delete src/app/home/*; (HomePageModule); update app-routing.module.ts

   - Create app/task.ts
     <= Q: ???Shouldn't this really go under app/src (e.g. "app/src/model/task.ts")?!?
     - app/task.ts:
       -----------
export interface Task {
    id?: string;
    title: string;
    status: string;
}

   - Customize task-list.page.html:
     - src/app/task-list/task-list.page.html
       -------------------------------------
<ion-header>
  <ion-toolbar>
    <ion-title>Tasks</ion-title>
    <ion-buttons slot="primary">
      <ion-button (click)="addTask()">
        <ion-icon slot="start" name="add"></ion-icon>
        Add Task
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-header>

<ion-content padding>
  <ion-list>
    <ion-item *ngFor="let task of tasks">{{task.title}}</ion-item>
  </ion-list>
</ion-content>

   - Customize task-list.page.ts component:
     - src/app/task-list/task-list.page.ts
       -----------------------------------
import { Component, OnInit } from '@angular/core';
import { Task } from './../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  // First-cut: Simple array.  Later, we'll substitute Observable<Task[]>
  tasks: Array<any> = [];

  constructor() { }

  ngOnInit() {
    // First-cut: hard-code initial data.  Later, we'll substitute a Firebase query
    this.tasks = [
      {title: 'Milk', status: 'open'},
      {title: 'Eggs', status: 'open'},
      {title: 'Syrup', status: 'open'},
      {title: 'Pancake Mix', status: 'open'}
    ];
  }

  addTask() {
    const theNewTask: string = prompt('New Task');
    if (theNewTask !== '') {
      this.tasks.push({ title: theNewTask, status: 'open' });
    }
  }

}

   - task-list.module.ts ngModule: OK AS-IS:
     - src/app/task-list/task-list.module.ts
       -------------------------------------
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TaskListPage } from './task-list.page';

const routes: Routes = [
  {
    path: '',
    component: TaskListPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [TaskListPage]
})
export class TaskListPageModule {}

3. Test "ionic2Do" app (first cut):
   - VSCode > Debug > Add config
     <= Associates list of debug options: {Run Android on device, Run Android on emulator, Serve to browser (ionic servie, Simulate Android on browser, ...}
   <= Displays "Task list" page - with canned items - OK
      Add item => ALSO OK

<<Git checkin>>


