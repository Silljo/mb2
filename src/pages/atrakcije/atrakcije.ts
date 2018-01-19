import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-atrakcije',
  templateUrl: 'atrakcije.html',
})
export class AtrakcijePage {

  atrakcije: Observable<any[]>;

  constructor(public navCtrl: NavController, db: AngularFireDatabase) {

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
