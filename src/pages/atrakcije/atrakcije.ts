import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-atrakcije',
  templateUrl: 'atrakcije.html',
})
export class AtrakcijePage {

  atrakcije: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {

    this.atrakcije = db.list('/atrakcije/');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtrakcijePage');
  }

  detalji_atrakcije(id)
  {
    this.navCtrl.push('AtrakcijeDetaljiPage', {id: id});
  }

}
