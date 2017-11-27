import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-duhovni-kutak',
  templateUrl: 'duhovni-kutak.html',
})
export class DuhovniKutakPage {

  duhovni_kutak_data: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {

    this.duhovni_kutak_data = db.list("/duhovni_kutak/", ref => ref.orderByChild('order_date')).valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuhovniKutakPage');
  }

}
