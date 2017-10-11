import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Slides } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../../pages/login/login';
import { ApisProvider } from '../../providers/apis/apis';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

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

  prognoza: Array<any>;
  dogadjanja_zabava: FirebaseListObservable<any[]>;
  dogadjanja_kultura: FirebaseListObservable<any[]>;
  dogadjanja_sport: FirebaseListObservable<any[]>;

  dogadjanja_prikaz = [];

  podaci_prognoza_formated: Array<any>;

  items = [
    {
      title: 'Courgette daikon',
      content: 'Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.',
      icon: 'calendar',
      time: {subtitle: '4/16/2013', title: '21:30'}
    },
    {
      title: 'Courgette daikon',
      content: 'Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.',
      icon: 'calendar',
      time: {subtitle: 'January', title: '29'}
    },
    {
      title: 'Courgette daikon',
      content: 'Parsley amaranth tigernut silver beet maize fennel spinach. Ricebean black-eyed pea maize scallion green bean spinach cabbage jícama bell pepper carrot onion corn plantain garbanzo. Sierra leone bologi komatsuna celery peanut swiss chard silver beet squash dandelion maize chicory burdock tatsoi dulse radish wakame beetroot.',
      icon: 'calendar',
      time: {title: 'Short Text'}
    }
]

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams, public api: ApisProvider, db: AngularFireDatabase) {

    this.user_img = localStorage.getItem('photo');
    this.username = localStorage.getItem('username');

    this.podaci = db.object('/pocetna/');

    this.podaci.subscribe(data => {
      this.vrijeme_slike = data['slike_trenutno_vrijeme'];
    });

    this.podaci_vrijeme = db.object('/weather/');

    this.podaci_vrijeme.subscribe(data_vrijeme => {

      this.podaci_vrijeme_data = JSON.parse(data_vrijeme['current'].data);

      this.vrijeme_data_ikona = this.podaci_vrijeme_data.weather[0].icon;
      this.vrijeme_opis = this.podaci_vrijeme_data.weather[0].description;
      this.vrijeme_temp = this.podaci_vrijeme_data.main.temp;
      this.vrijeme_temp_max = this.podaci_vrijeme_data.main.temp_max;
      this.vrijeme_temp_min = this.podaci_vrijeme_data.main.temp_min;

      this.podaci_vrijeme_prognoza = JSON.parse(data_vrijeme['forecast'].data).list;

      this.prognoza = [{
        0: this.podaci_vrijeme_prognoza[0],
        1: this.podaci_vrijeme_prognoza[1],
        2: this.podaci_vrijeme_prognoza[2],
        3: this.podaci_vrijeme_prognoza[3],
        4: this.podaci_vrijeme_prognoza[4]
      }, {
        0: this.podaci_vrijeme_prognoza[5],
        1: this.podaci_vrijeme_prognoza[6],
        2: this.podaci_vrijeme_prognoza[7],
        3: this.podaci_vrijeme_prognoza[8],
        4: this.podaci_vrijeme_prognoza[9]
      },{
        0: this.podaci_vrijeme_prognoza[10],
        1: this.podaci_vrijeme_prognoza[11],
        2: this.podaci_vrijeme_prognoza[12],
        3: this.podaci_vrijeme_prognoza[13],
        4: this.podaci_vrijeme_prognoza[14]
      },{
        0: this.podaci_vrijeme_prognoza[15],
        1: this.podaci_vrijeme_prognoza[16],
        2: this.podaci_vrijeme_prognoza[17],
        3: this.podaci_vrijeme_prognoza[18],
        4: this.podaci_vrijeme_prognoza[19]
      },{
        0: this.podaci_vrijeme_prognoza[20],
        1: this.podaci_vrijeme_prognoza[21],
        2: this.podaci_vrijeme_prognoza[22],
        3: this.podaci_vrijeme_prognoza[23],
        4: this.podaci_vrijeme_prognoza[24]
      },{
        0: this.podaci_vrijeme_prognoza[25],
        1: this.podaci_vrijeme_prognoza[26],
        2: this.podaci_vrijeme_prognoza[27],
        3: this.podaci_vrijeme_prognoza[28],
        4: this.podaci_vrijeme_prognoza[29]
      }];

    });

    this.dogadjanja_zabava = db.list('/dogadjanja_zabava/', {query: {limitToLast: 50, orderByValue: true}});
    this.dogadjanja_kultura = db.list('/dogadjanja_kultura/', {query: {limitToLast: 50, orderByValue: true}});
    this.dogadjanja_sport = db.list('/dogadjanja_sport/', {query: {limitToLast: 50, orderByValue: true}});

    console.log(this.dogadjanja_sport);

    this.dogadjanja_zabava.subscribe(items => {
      items.forEach(item => {
          this.dogadjanja_prikaz.push({id: item.id, slika: item.slika, slika_avatar: item.slika_avatar, tip: item.tip, naziv: item.naziv, opis: item.opis, lokacija: item.lokacija});
      });
    });

    this.dogadjanja_kultura.subscribe(items => {
      items.forEach(item => {
          this.dogadjanja_prikaz.push({id: item.id, slika: item.slika, slika_avatar: item.slika_avatar, tip: item.tip, naziv: item.naziv, opis: item.opis, lokacija: item.lokacija});
      });
    });

    this.dogadjanja_sport.subscribe(items => {
      items.forEach(item => {
          this.dogadjanja_prikaz.push({id: item.id, slika: item.slika, slika_avatar: item.slika_avatar, tip: item.tip, naziv: item.naziv, opis: item.opis, lokacija: item.lokacija});
      });
    });


    console.log(this.dogadjanja_prikaz);

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

  openLogin()
  {
    this.navCtrl.setRoot(LoginPage);
  }




}
