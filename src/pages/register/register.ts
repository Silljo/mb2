import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from "angularfire2/auth";
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  user = {} as User;

  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public events: Events) {
  }

  register(user: User) {

    this.auth.register(user.email, user.password).then(
      res => {
        //Dobili smo nešto natrag, i bilo je uspješno
        this.auth.obrada_uspjesnog_logina(res).then(res => {
          this.events.publish('user:signedIn', 'login');
          this.navCtrl.setRoot(HomePage);
        });
        //
        //
      }, err => {
        //Došlo je do greške kod logina.
        this.auth.obrada_neuspjesnog_logina(err);
      }
   );
  }
}
