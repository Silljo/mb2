import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { User } from "../../models/user";
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../../pages/home/home';
import firebase from 'firebase';
import { Facebook } from '@ionic-native/facebook';



@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;


  constructor(public navCtrl: NavController, public navParams: NavParams, public auth: AuthProvider, public facebook: Facebook, public events: Events) {

  }

  //Email
  login(user: User) {

    this.auth.login(user.email, user.password).then(
      res => {
        //Dobili smo nešto natrag, i bilo je uspješno
        this.auth.obrada_uspjesnog_logina(res.uid, res.email, res.photoURL, res.displayName).then(
          (finish) => this.navCtrl.setRoot(HomePage),
          (error) => alert("Greška"),
        );
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
              this.auth.obrada_uspjesnog_logina(success.uid, success.email, success.photoURL, success.displayName).then(
                (finish =>
                  {
                    this.navCtrl.setRoot(HomePage);
                    //Subscribamo ili ne ?
                    this.auth.subscribe_topics();
                  }),
                (error) => alert("Greška")
              );

          })
          .catch((error) => {
              alert("Firebase failure: " + JSON.stringify(error));
          });

      }).catch((error) => { alert('Loše ' + error);  });

  }

}
