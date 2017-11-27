import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { Observable } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-smjestaj',
  templateUrl: 'smjestaj.html',
})

export class SmjestajPage {

  smjestaj: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {

    this.smjestaj = db.list('/smjestaj/').valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmjestajPage');

  }

  detalji_smjestaja(id)
  {
    this.navCtrl.push('SmjestajDetaljiPage', {id: id});
  }

}
