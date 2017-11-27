import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-atrakcije',
  templateUrl: 'atrakcije.html',
})
export class AtrakcijePage {

  atrakcije: Observable<any[]>;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {

    this.atrakcije = db.list('/atrakcije/').valueChanges();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AtrakcijePage');
  }

  detalji_atrakcije(id)
  {
    this.navCtrl.push('AtrakcijeDetaljiPage', {id: id});
  }

}
