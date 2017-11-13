import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { LocalStorageProvider } from '../local-storage/local-storage';
import { Storage } from '@ionic/storage';
import { FCM } from '@ionic-native/fcm';

import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  greska: string;
  uid: string;
  e_mail: string;
  photo_url: string;
  user_name: string;
  fb_response: any;

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController, private storage: Storage, private fcm: FCM) {

  }

  async login(user_email, user_password) {
      return await this.afAuth.auth.signInWithEmailAndPassword(user_email, user_password);
  }

  async obrada_uspjesnog_logina(uid, email, photo, naziv)
  {

    this.fcm.subscribeToTopic('test_topic');

    this.fcm.getToken().then(token=>{
      console.log(token);
    })

    //Ovdje piknemo da vidimo da li postoji u bazi
    var ref_profle = firebase.database().ref("/user_profiles/");
    ref_profle.once('value').then(function(dataSnapshot) {

      //Ako ne postoji e onda ga spremamo
      if (!dataSnapshot.hasChild(uid)) {

        if(naziv == null){naziv = email.split("@")[0];}
        if(photo == null || photo == ''){photo = 'https://firebasestorage.googleapis.com/v0/b/mbistrica-c5bd3.appspot.com/o/mblogo.png?alt=media&token=32a7650c-7a01-4b51-965a-7e6c17e7fcb9';}

        firebase.database().ref('/user_profiles/' + uid).set({
            uid: uid,
            email: email,
            slika: photo,
            display_name: naziv
        });

        //I treba ga subscrajbati na sve topice
        this.fcm.subscribeToTopic('test_topic');
      }

    });

    await this.storage.set('uid', this.uid);
    await this.storage.set('e_mail', this.e_mail);
    await this.storage.set('photo_url', this.photo_url);
    await this.storage.set('user_name', this.user_name);

    return;

  }

  obrada_neuspjesnog_logina(data)
  {

    if(data.code == "auth/invalid-email"){this.greska = 'Pogrešna e-mail adresa.';}
    else if(data.code == 'auth/argument-error'){this.greska = 'Predani paramteri (e-mail adresa/lozinka) nisu ispravni.';}
    else if(data.code == 'auth/network-request-failed'){this.greska = 'Prijava nije moguća (provjerite internet vezu).';}
    else if(data.code == 'auth/user-disabled'){this.greska = 'Korisnik obrisan.';}
    else if(data.code == 'auth/email-already-in-use'){this.greska = 'Unesena e-mail adresa se već koristi.';}
    else if(data.code == 'auth/weak-password'){this.greska = 'Jačina lozinke nije dovoljna. Unesite novu lozinku';}
    else if(data.code == 'auth/operation-not-allowed'){this.greska = 'Odabrana operacija nije dozvoljena';}
    else{this.greska = 'Pogrešni korisnički podaci. Pokušajte ponovno.';}

    let toast = this.toastCtrl.create({
      message: this.greska,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();


  }

  async register(user_email, user_password)
  {
    return await this.afAuth.auth.createUserWithEmailAndPassword(user_email, user_password);
  }


}
