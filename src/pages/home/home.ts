import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  pages: Array<{title: string, component: any, icon: any, desc: any}>;
  photo: string;
  user_img:string;
  username: string;

  constructor(private afAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {

    this.user_img = localStorage.getItem('photo');
    this.username = localStorage.getItem('username');

  }

  ionViewWillLoad() {
    /*this.afAuth.authState.subscribe(data => {
      if (data && data.email && data.uid) {
        this.toast.create({
          message: `Welcome to APP_NAME, ${data.email}`,
          duration: 3000
        }).present();
      }
      else {
        this.toast.create({
          message: `Could not find authentication details.`,
          duration: 3000
        }).present();
      }
    })*/
  }

  openLogin()
  {
    this.navCtrl.setRoot(LoginPage);
  }




}
