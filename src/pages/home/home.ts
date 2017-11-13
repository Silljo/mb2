import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Slides } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../../pages/login/login';
import { ApisProvider } from '../../providers/apis/apis';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import firebase from 'firebase';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  @ViewChild(Slides) slides: Slides;

  pages: Array<{title: string, component: any, icon: any, desc: any}>;
  photo: string;
  user_img:string;
  username: string;
  podaci: any;
  podaci_vrijeme: FirebaseObjectObservable<any[]>;
  podaci_vrijeme_prognoza: FirebaseObjectObservable<any[]>;
  podaci_vrijeme_data: any;
  vrijeme_slike: any;
  vrijeme_data_ikona: string;
  vrijeme_opis: string;
  vrijeme_temp: string;
  vrijeme_temp_max: string;
  vrijeme_temp_min: string;
  slika_pozadina: string;

  prognoza: Array<any>;

  podaci_prognoza_formated: Array<any>;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams, public api: ApisProvider, db: AngularFireDatabase) {


    this.user_img = localStorage.getItem('photo');
    this.username = localStorage.getItem('username');

    this.podaci = db.object('/pocetna/');

    this.podaci.subscribe(data => {
      this.vrijeme_slike = data['slike_trenutno_vrijeme'];
      this.slika_pozadina = data['slika_pozadina'];
    });

    this.podaci_vrijeme = db.object('/weather/');

    this.podaci_vrijeme.subscribe(data_vrijeme => {

      this.podaci_vrijeme_data = JSON.parse(data_vrijeme['current'].data);

      this.vrijeme_data_ikona = this.podaci_vrijeme_data.weather[0].icon;
      this.vrijeme_opis = this.podaci_vrijeme_data.weather[0].description.charAt(0).toUpperCase() + this.podaci_vrijeme_data.weather[0].description.slice(1);
      this.vrijeme_temp = this.podaci_vrijeme_data.main.temp;
      this.vrijeme_temp_max = this.podaci_vrijeme_data.main.temp_max;
      this.vrijeme_temp_min = this.podaci_vrijeme_data.main.temp_min;

      this.podaci_vrijeme_prognoza = JSON.parse(data_vrijeme['forecast'].data).list;

      this.prognoza = [{
        0: this.podaci_vrijeme_prognoza[1],
        1: this.podaci_vrijeme_prognoza[2],
        2: this.podaci_vrijeme_prognoza[3],
        3: this.podaci_vrijeme_prognoza[4],
        4: this.podaci_vrijeme_prognoza[5]
      }, {
        0: this.podaci_vrijeme_prognoza[6],
        1: this.podaci_vrijeme_prognoza[7],
        2: this.podaci_vrijeme_prognoza[8],
        3: this.podaci_vrijeme_prognoza[9],
        4: this.podaci_vrijeme_prognoza[10]
      },{
        0: this.podaci_vrijeme_prognoza[11],
        1: this.podaci_vrijeme_prognoza[12],
        2: this.podaci_vrijeme_prognoza[13],
        3: this.podaci_vrijeme_prognoza[14],
        4: this.podaci_vrijeme_prognoza[15]
      },{
        0: this.podaci_vrijeme_prognoza[16],
        1: this.podaci_vrijeme_prognoza[17],
        2: this.podaci_vrijeme_prognoza[18],
        3: this.podaci_vrijeme_prognoza[19],
        4: this.podaci_vrijeme_prognoza[20]
      },{
        0: this.podaci_vrijeme_prognoza[21],
        1: this.podaci_vrijeme_prognoza[22],
        2: this.podaci_vrijeme_prognoza[23],
        3: this.podaci_vrijeme_prognoza[24],
        4: this.podaci_vrijeme_prognoza[25]
      },{
        0: this.podaci_vrijeme_prognoza[26],
        1: this.podaci_vrijeme_prognoza[27],
        2: this.podaci_vrijeme_prognoza[28],
        3: this.podaci_vrijeme_prognoza[29],
        4: this.podaci_vrijeme_prognoza[30]
      }];

    });

  }



  ionViewWillLoad() {
    /*this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to APP_NAME, ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: `Could not find authentication details.`,
          duration: 3000
        }).present();
      }
    })*/
  }

}
