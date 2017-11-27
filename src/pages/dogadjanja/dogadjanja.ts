import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-dogadjanja',
  templateUrl: 'dogadjanja.html',
})
export class DogadjanjaPage {

  dogadjanja_kultura: Observable<any[]>;
  dogadjanja_sport: Observable<any[]>;
  dogadjanja_zabava: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {

    this.dogadjanja_kultura = db.list("/dogadjanja_kultura/", ref => ref.orderByChild('order_date')).valueChanges();
    this.dogadjanja_sport = db.list("/dogadjanja_sport/", ref => ref.orderByChild('order_date')).valueChanges();
    this.dogadjanja_zabava = db.list("/dogadjanja_zabava/", ref => ref.orderByChild('order_date')).valueChanges();


      /*
    db.list("/dogadjanja_sport/", {query:{orderByChild : "order_date"}}).subscribe((data_sport) => {
        this.dogadjanja_sport = data_sport;
    });

    db.list("/dogadjanja_zabava/", {query:{orderByChild : "order_date"}}).subscribe((data_zabava) => {
        this.dogadjanja_zabava = data_zabava;
    });*/

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DogadjanjaPage');
  }

}
