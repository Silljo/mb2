import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'page-gastro',
  templateUrl: 'gastro.html',
})
export class GastroPage {

  gastro_hrana: any = {};
  gastro_pice: any = {};
  gastro: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase) {

    this.gastro_hrana = db.list('/gastro_hrana/').valueChanges();;
    this.gastro_pice = db.list('/gastro_pice/').valueChanges();;
    this.gastro = 'hrana';

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GastroPage');
  }

  gastro_detalji(tip, id)
  {
    this.navCtrl.push('GastroDetaljiPage', {id: id, tip: tip});
  }

}
