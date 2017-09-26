import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-dogadjanja',
  templateUrl: 'dogadjanja.html',
})
export class DogadjanjaPage {

  dogadjanja_kultura: any = {};
  dogadjanja_sport: any = {};
  dogadjanja_zabava: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {

    this.dogadjanja_kultura = db.list('/dogadjanja_kultura/', {query: {limitToLast: 50, orderByValue: true}});
    this.dogadjanja_sport = db.list('/dogadjanja_sport/', {query: {limitToLast: 50, orderByValue: true}});
    this.dogadjanja_zabava = db.list('/dogadjanja_zabava/', {query: {limitToLast: 50, orderByValue: true}});

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DogadjanjaPage');
  }

}
