import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-smjestaj',
  templateUrl: 'smjestaj.html',
})

export class SmjestajPage {

  smjestaj: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {

    this.smjestaj = db.list('/smjestaj/');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmjestajPage');

  }

  detalji_smjestaja(id)
  {
    this.navCtrl.push('SmjestajDetaljiPage', {id: id});
  }

}
