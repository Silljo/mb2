import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-duhovni-kutak',
  templateUrl: 'duhovni-kutak.html',
})
export class DuhovniKutakPage {

  duhovni_kutak_data = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {


    db.list("/duhovni_kutak/", {query:{orderByChild : "order_date"}}).subscribe((data) => {
        this.duhovni_kutak_data = data;
        console.log(this.duhovni_kutak_data);

    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DuhovniKutakPage');
  }

}
