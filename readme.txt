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
