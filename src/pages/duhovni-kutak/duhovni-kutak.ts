import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Rx';
import { LocalNotifications } from '@ionic-native/local-notifications';

@Component({
  selector: 'page-duhovni-kutak',
  templateUrl: 'duhovni-kutak.html',
})
export class DuhovniKutakPage {

  duhovni_kutak_data: Observable<any[]>;

  constructor(public navCtrl: NavController, db: AngularFireDatabase, private local_notifications: LocalNotifications) {
    this.duhovni_kutak_data = db.list("/duhovni_kutak/", ref => ref.orderByChild('order_date')).valueChanges();
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
