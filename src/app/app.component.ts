import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SmjestajPage } from '../pages/smjestaj/smjestaj';
import { GastroPage } from '../pages/gastro/gastro';
import { DogadjanjaPage } from '../pages/dogadjanja/dogadjanja';
import { InteraktivnaMapaPage } from '../pages/interaktivna-mapa/interaktivna-mapa';

import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { AngularFireAuth } from 'angularfire2/auth';
import { Storage } from '@ionic/storage';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = InteraktivnaMapaPage;
  pages: Array<{title: string, component: any, icon: string}>;
  user_img:string;
  username: string;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private streamingMedia: StreamingMedia,
              private afAuth: AngularFireAuth, private toast: ToastController, private storage: Storage, public events: Events,
              public conn: ConnectivityServiceProvider) {

    this.initializeApp();

    this.pages = [
      { title: 'Početna', component: HomePage, icon: 'md-home'},
      { title: 'Smještaj', component: SmjestajPage, icon: 'md-home'},
      { title: 'Gastro', component: GastroPage, icon: 'md-home'},
      { title: 'Događanja', component: DogadjanjaPage, icon: 'md-home'},
      { title: 'Interaktivna mapa', component: InteraktivnaMapaPage, icon: 'md-home'}
    ];

    events.subscribe('user:signedIn', (userEventData) => {

      this.storage.get('photo_url').then((photo_url) => {this.user_img = photo_url;});
      this.storage.get('user_name').then((user_name) => {this.username = user_name;});

    });

    this.storage.get('photo_url').then((photo_url) => {this.user_img = photo_url;});
    this.storage.get('user_name').then((user_name) => {this.username = user_name;});

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to APP_NAME, ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        //Nema nikakvih podataka da je korisnik ulogiran...

      }
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  openRadio():void
  {

    var audioUrl = 'http://85.10.55.147:8026/stream/';

    // Play an audio file with options (all options optional)
    var options = {
      bgColor: "#E1E1E1",
      bgImage: "http://www.rmb.hr/wp-content/uploads/2015/06/RMB1.png",
      bgImageScale: "fit", // other valid values: "stretch"
      initFullscreen: false, // true(default)/false iOS only
      successCallback: function() {
        alert("Player closed without error.");
      },
      errorCallback: function(errMsg) {
        alert("Error! " + errMsg);
      }
    };
    this.streamingMedia.playAudio(audioUrl, options);
  }

}
