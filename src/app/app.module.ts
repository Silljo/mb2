import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule }from 'angularfire2/auth';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';

import { MyApp } from './app.component';
import { FIREBASE_CONFIG } from "./app.firebase.config";
import { AuthProvider } from '../providers/auth/auth';
import { LocalStorageProvider } from '../providers/local-storage/local-storage';
import { Facebook } from '@ionic-native/facebook'
import { StreamingMedia } from '@ionic-native/streaming-media';
import { IonicStorageModule } from '@ionic/storage';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { SmjestajPage } from '../pages/smjestaj/smjestaj';
import { GastroPage } from '../pages/gastro/gastro';
import { DogadjanjaPage } from '../pages/dogadjanja/dogadjanja';
import { InteraktivnaMapaPage } from '../pages/interaktivna-mapa/interaktivna-mapa';
import { AtrakcijePage } from '../pages/atrakcije/atrakcije';
import { DuhovniKutakPage } from '../pages/duhovni-kutak/duhovni-kutak';
import { KomunalnoPage } from '../pages/komunalno/komunalno';

import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Geolocation } from '@ionic-native/geolocation';
import { ConnectivityServiceProvider } from '../providers/connectivity-service/connectivity-service';
import { Network } from '@ionic-native/network';
import { GoogleMaps } from '@ionic-native/google-maps';
import { ApisProvider } from '../providers/apis/apis';
import { HttpModule } from '@angular/http';
import { Camera } from '@ionic-native/camera';
import { Firebase } from '@ionic-native/firebase';

import { TimelineComponent } from '../components/timeline/timeline';
import { TimelineTimeComponent } from '../components/timeline/timeline';
import { TimelineItemComponent } from '../components/timeline/timeline';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SmjestajPage,
    GastroPage,
    DogadjanjaPage,
    InteraktivnaMapaPage,
    AtrakcijePage,
    DuhovniKutakPage,
    TimelineComponent,
    TimelineItemComponent,
    TimelineTimeComponent,
    KomunalnoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SmjestajPage,
    GastroPage,
    DogadjanjaPage,
    InteraktivnaMapaPage,
    AtrakcijePage,
    DuhovniKutakPage,
    KomunalnoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    LocalStorageProvider,
    Facebook,
    StreamingMedia,
    LaunchNavigator,
    Geolocation,
    ConnectivityServiceProvider,
    Network,
    GoogleMaps,
    ApisProvider,
    Camera,
    Firebase
  ]
})
export class AppModule {}
