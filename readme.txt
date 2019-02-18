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

===================================================================================================

* Chap7: implement "markAsDone()" and "removeTask()" todo functionality: 
  - Tried implementing "<ion-item-sliding>"; results "unsatisfactory" in Chrome/browser
    <= Unable to see the icons for "markAsDone()" or "removeTask()" without "swiping" the screen first

  - CHANGES:
    - task-list.page.html:
      -------------------
    ...
    <!-- 3) List + buttons (without "ion-item-sliding"): -->
    <ion-item *ngFor="let task of tasks" #slidingItem>
      <ion-label [ngClass]="{taskDone: task.status === 'done'}">{{task.title}}</ion-label>
          <button ion-button (click)="markAsDone(task, slidingItem)" color="secondary">
            <ion-icon name="checkmark" slot="icon-only"></ion-icon>
          </button>
          <button ion-button (click)="removeTask(task, slidingItem)" color="danger">
            <ion-icon name="trash" slot="icon-only"></ion-icon>
          </button>
      </ion-item>

    - task-list.page.ts:
      -----------------
import { IonItemSliding } from '@ionic/angular';
...
  markAsDone(task: Task, slidingItem: IonItemSliding) {
    console.log('TaskListPage::markAsDone()');
    task.status = 'done';
  }

  removeTask(task: Task, slidingItem: IonItemSliding) {
    console.log('TaskListPage::removeTask()');
    task.status = 'removed';
    const index = this.tasks.indexOf(task);
    if (index > -1) {
      this.tasks.splice(index, 1);
    }
  }

    - task-list.page.scss:
      -------------------
.taskDone {
    text-decoration: line-through;
}
    <= Mark "done" items with strike-through
       .html template: <ion-label [ngClass]="{taskDone: task.status === 'done'}">{{task.title}}</ion-label>

===================================================================================================

* Chap7: Complete prototype:

1. Update UI:
   - Restore "<ion-sliding-item>"
   - Change <ion-button> => <ion-item-option>
   - Add "Full-swipe gesture" (ionswipe) for removeTask()
     <= This didn't work well: because of "slidingItem"; *everything* was a "swipe" ... 
        ... and, consequently, every action always wound up be "removeTask()".
        Commented this out from trask-list.page.html

2.  Use Firebase:
https://devdactic.com/ionic-4-firebase-angularfire/
   - Register for developer account, https://firebase.google.com
     - Firebase plans: { Spark Plan: free, FLame plan: $25/mo, Blaze plan: Pay as you go}
     <= Spark Plan, [Start Now]

   - Basic steps:
     1. Login https://firebase.google.com, Add Project > 
          Name= Ionic2Do => ProjectID= ionic2do-ca67e > [Create Project]

     2. Develop > Database > Cloud Firestore > [Create Database]

     3. Dashboard > Project Overview > Settings > Add web app:
<script src="https://www.gstatic.com/firebasejs/5.8.3/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA2sb0y8DBVCpnaVm4itKdxrAsvCThEwpo",
    authDomain: "ionic2do-ca67e.firebaseapp.com",
    databaseURL: "https://ionic2do-ca67e.firebaseio.com",
    projectId: "ionic2do-ca67e",
    storageBucket: "ionic2do-ca67e.appspot.com",
    messagingSenderId: "349906342137"
  };
  firebase.initializeApp(config);
</script>
      <= Save this snippet

     4. Dashboard > Database > [Rules] >
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write;
    }
  }
}  <= This is "Test Mode (wide open)

     5. Install Node modules:
          npm install firebase --save  => 5.8.3
          npm install @angular/fire --save  => 5.1.1

     6. Update src/app/app.modules.ts:
import { AngularFireModule } from '@angular/fire';

import { AngularFirestoreModule } from '@angular/fire/firestore';

import { environment } from '../environments/environment';

...
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
    ...
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule]
  ,
  providers: [
    AngularFirestoreModule,
    ...

     7. Update environments/environment.prod.ts, environment.ts:
export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyA2sb0y8DBVCpnaVm4itKdxrAsvCThEwpo',
    authDomain: 'ionic2do-ca67e.firebaseapp.com',
    databaseURL: 'https://ionic2do-ca67e.firebaseio.com',
    projectId: 'ionic2do-ca67e',
    storageBucket: 'ionic2do-ca67e.appspot.com',
    messagingSenderId: '349906342137'
  }
};
      
     8. Update task-list.page.ts:
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
...
export class TaskListPage implements OnInit {
...
  tasks: Observable<Task[]>;
  itemsCollectionRef: AngularFirestoreCollection<Task>;

  constructor(
    // Firebase:
    public firestore: AngularFirestore
  ) { }
  ...
  ngOnInit() {
    this.itemsCollectionRef = this.firestore.collection('tasks');
    this.tasks = this.itemsCollectionRef.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }
  ...
  addTask () {
    const theNewTask: string = prompt('New Task');
    if (theNewTask !== '') {
       this.itemsCollectionRef.add({ title: theNewTask, status: 'open' });
    }
  }
  ...
  markAsDone (task: Task, slidingItem: IonItemSliding) {
   this.itemsCollectionRef
      .doc(task.id)
      .update({
         status: task.status
       });
    slidingItem.close();
  }
  ...
  removeTask(task: Task, slidingItem: IonItemSliding) {
    this.itemsCollectionRef.doc(task.id).delete();
    slidingItem.close();
  }

     9. Update task-list.page.html (for async/observable):
    <ion-item-sliding #slidingItem *ngFor="let task of tasks | async">

    10. Test:
        a) VSCode > Debug > Serve to the browser
           <= Verify app comes up
        b) Add some items
           <= Verify new items appear
        c) https://firebase.google.com > Project=ionic2Do > Dashboard > 
             Database > Data > 
             <= Verify new items appear in Cloud Firestore

