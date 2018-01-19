import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-dogadjanja',
  templateUrl: 'dogadjanja.html',
})
export class DogadjanjaPage {

  dogadjanja_kultura: Observable<any[]>;
  dogadjanja_sport: Observable<any[]>;
  dogadjanja_zabava: Observable<any[]>;
  dogadjanja: any;

  constructor(public navCtrl: NavController, db: AngularFireDatabase, private local_notifications: LocalNotifications) {

    this.dogadjanja = 'kultura';

    this.dogadjanja_kultura = db.list("/dogadjanja_kultura/", ref => ref.orderByChild('order_date')).valueChanges();
    this.dogadjanja_sport = db.list("/dogadjanja_sport/", ref => ref.orderByChild('order_date')).valueChanges();
    this.dogadjanja_zabava = db.list("/dogadjanja_zabava/", ref => ref.orderByChild('order_date')).valueChanges();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DogadjanjaPage');
  }

  add_notification_reminder(datum, vrijeme, naziv, lokacija, icon)
  {
    //new Date(2017, 10, 27, 15)
    //alert(datum);

    var godina = datum.substring(6, 10).replace(0, '');
    var mjesec = datum.substring(3, 5).replace(0, '');
    var dan = datum.substring(0, 2).replace(0, '');

    var sati = vrijeme.substring(0, 2).replace(0, '');
    var minute = vrijeme.substring(3, 6).replace(0, '');

    //alert(new Date(godina, mjesec-1, dan, sati-1, minute, 0));
    this.local_notifications.schedule({
      id: 1,
      title: naziv,
      text: lokacija + ' (' + vrijeme + ' sati)',
      at: new Date(new Date().getTime() + 3600),
      icon: icon
    });
  }

}
