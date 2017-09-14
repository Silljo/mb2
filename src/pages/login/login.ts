import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';
import firebase from 'firebase';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;


  constructor(private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public facebook: Facebook, public events: Events) {
      localStorage.clear();
  }

  //Email
  login(user: User) {

    this.auth.login(user.email, user.password).then(
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

  register()
  {
    this.navCtrl.push('RegisterPage');
  }

  //Facebook
  fb_login()
  {
    this.facebook.login(['public_profile', 'email'])
      .then( response => {

        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

           firebase.auth().signInWithCredential(facebookCredential)
          .then((success) => {
              this.auth.obrada_uspjesnog_logina({'uid': success.uid, 'email': success.email, 'photoURL': success.photoURL, 'displayName': success.displayName}).then(res => {
                this.events.publish('user:signedIn', 'login');
                this.navCtrl.setRoot(HomePage);
              });
          })
          .catch((error) => {
              alert("Firebase failure: " + JSON.stringify(error));
          });

      }).catch((error) => { alert(JSON.stringify(error));  });

  }



}
