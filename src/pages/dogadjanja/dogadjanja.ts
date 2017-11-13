import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
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

    db.list("/dogadjanja_kultura/", {query:{orderByChild : "order_date"}}).subscribe((data_kultura) => {
        this.dogadjanja_kultura = data_kultura;
    });

    db.list("/dogadjanja_sport/", {query:{orderByChild : "order_date"}}).subscribe((data_sport) => {
        this.dogadjanja_sport = data_sport;
    });

    db.list("/dogadjanja_zabava/", {query:{orderByChild : "order_date"}}).subscribe((data_zabava) => {
        this.dogadjanja_zabava = data_zabava;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DogadjanjaPage');
  }

}
