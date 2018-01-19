import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { DuhovniKutakPage } from '../pages/duhovni-kutak/duhovni-kutak';
import { DogadjanjaPage } from '../pages/dogadjanja/dogadjanja';


import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { Firebase } from '@ionic-native/firebase';

import * as firebase from 'firebase';

export class NotificationModel {
    public body: string;
    public title: string;
    public tap: boolean
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;
  pages: Array<{title: string, component: any, icon: string, icon_color: string}>;
  user_img: string;
  username: string;
  email: string;
  data_user = <any>{};
  redirekcija: boolean;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private streamingMedia: StreamingMedia,
              private afAuth: AngularFireAuth, private toast: ToastController, public events: Events,
              public conn: ConnectivityServiceProvider, private db: AngularFireDatabase, public firebase_plugin: Firebase) {

    this.initializeApp();

    this.pages = [
      { title: 'Početna', component: HomePage, icon: 'md-home', icon_color: ''},
      { title: 'Smještaj', component: 'SmjestajPage', icon: 'md-briefcase', icon_color: 'narandjasta'},
      { title: 'Gastro', component: 'GastroPage', icon: 'md-restaurant', icon_color: 'roza'},
      { title: 'Događanja', component: DogadjanjaPage, icon: 'md-list-box', icon_color: 'zelena'},
      { title: 'Interaktivna mapa', component: 'InteraktivnaMapaPage', icon: 'ios-map', icon_color: 'bijela'},
      { title: 'Atrakcije', component: 'AtrakcijePage', icon: 'ios-camera', icon_color: 'siva'},
      { title: 'Duhovni kutak', component: DuhovniKutakPage, icon: 'md-body', icon_color: 'crna'},
      { title: 'Komunalno', component: 'KomunalnoPage', icon: 'md-warning', icon_color: 'plava'}
    ];

  }

  private subscribeToPushNotificationEvents(): void {

        // Handle token refresh
        this.firebase_plugin.onTokenRefresh().subscribe(
            token => {
                console.log(`The new token is ${token}`);
                //this.saveToken(token);
            },
            error => {
                console.error('Error refreshing token', error);
            });

        // Handle incoming notifications
        this.firebase_plugin.onNotificationOpen().subscribe(
            (notification: NotificationModel) => {

                !notification.tap
                    ? alert('The user was using the app when the notification arrived...')
                    : alert('The app was closed when the notification arrived...');

                    alert(notification.title);
                    alert(notification.body);

                    /*
                let notificationAlert = this.alertCtrl.create({
                    title: notification.title,
                    message: notification.body,
                    buttons: ['Ok']
                });
                notificationAlert.present();*/
            },
            error => {
                console.error('Error getting the notification', error);
            });
    }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.platform.registerBackButtonAction(() => {
            if(this.nav.canGoBack()){
              this.nav.pop();
            }else{
              //don't do anything
            }
          });

      /*
      this.firebase_plugin.onNotificationOpen().subscribe(notification => {

        if(notification.modul)
        {
          if(notification.modul == 'komunalno')
          {
            this.rootPage = KomunalnoPage;
          }
            this.redirekcija = true;
        }

        //alert(JSON.stringify(notification.modul));

      });
      */
    });

    //Ajmo pohraniti sve vezano za korisnika sta bi nam trebalo u nekom trenutku
    this.afAuth.authState.subscribe(data => {

      if (data && data.email && data.uid) {

        //Ajmo po sliku usera i naziv
        this.db.object("/user_profiles/" + data.uid).valueChanges().subscribe((data_user) => {

          if(data_user)
          {
            this.username = data_user['display_name'];
            this.user_img = data_user['slika'];
            this.email = data_user['email'];

            //Kad smo sigurni da je sve u bazi onda i updejtamo token men
            this.firebase_plugin.getToken().then(token_firebase => {

              firebase.database().ref('/user_profiles/' + data.uid).update({
                  token: token_firebase
                });

            }) // save the token server-side and use it to push notifications to this device
            .catch(error => console.log('Error getting token: ' + error));

          }

        });

        if(!this.redirekcija)
        {
            this.rootPage = HomePage;
        }



        /*
        firebase.database().ref('/user_profiles/' + data.uid).update({
            user_token: '1111111'
          });*/





      }
      else {
        //Nema nikakvih podataka da je korisnik ulogiran...
        this.rootPage = LoginPage;
      }
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if(page.component.name != this.nav.getActive().name)
    {
        this.nav.setRoot(page.component);
    }


  }

  openRadio():void
  {
    var audioUrl = 'http://85.10.55.147:8026/stream/';

    // Play an audio file with options (all options optional)
    var options = {
      bgColor: "#FFFFFF",
      bgImage: "https://firebasestorage.googleapis.com/v0/b/mbistrica-c5bd3.appspot.com/o/rmb_logo.png?alt=media&token=7854878d-55b2-4856-b790-748ab7484513",
      bgImageScale: "fit", // other valid values: "stretch"
      initFullscreen: true, // true(default)/false iOS only
      successCallback: function() {

      },
      errorCallback: function(errMsg) {

      }
    };
    this.streamingMedia.playAudio(audioUrl, options);
  }

  login()
  {
    this.nav.setRoot(LoginPage);
  }

  user_postavke()
  {
    this.nav.setRoot('UserPostavkePage');
  }

}
