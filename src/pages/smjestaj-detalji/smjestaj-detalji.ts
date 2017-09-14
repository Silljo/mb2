import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-smjestaj-detalji',
  templateUrl: 'smjestaj-detalji.html'
})
export class SmjestajDetaljiPage {


  id: any;
  smjestaj: FirebaseObjectObservable<any[]>;
  adresa: string;
	kontakt_email: string;
	kontakt_mobitel:string;
	kontakt_telefon: string;
	mjesto: string;
	naziv_objekta: string;
	opis: string;
	ponuda_ikone: Array<any>;
	slika: string;
	zvjezdica: string;
  galerija_img: string;


  constructor(public navCtrl: NavController, public navParams: NavParams, db: AngularFireDatabase, public viewCtrl: ViewController) {

    this.id = navParams.get('id');

    this.smjestaj = db.object('/smjestaj_detalji/' + this.id);

    this.smjestaj.subscribe(data => {
        this.adresa = data['adresa'];
        this.kontakt_email = data['kontakt_email'];
        this.kontakt_mobitel = data['kontakt_mobitel'];
        this.kontakt_telefon = data['kontakt_telefon'];
        this.mjesto = data['mjesto'];
        this.naziv_objekta = data['naziv_objekta'];
        this.opis = data['opis'];
        this.ponuda_ikone = data['ponuda_ikone'];
        this.slika = data['slika'];
        this.zvjezdica = data['zvjezdica'];
        this.galerija_img = data['galerija_img'];

    });


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SmjestajDetaljiPage');
  }

  close_pop()
  {
    this.navCtrl.pop();
  }


}
