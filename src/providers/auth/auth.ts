import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { ToastController } from 'ionic-angular';
import { LocalStorageProvider } from '../local-storage/local-storage';
import { Storage } from '@ionic/storage';

import firebase from 'firebase';

@Injectable()
export class AuthProvider {

  greska: string;
  uid: string;
  e_mail: string;
  photo_url: string;
  user_name: string;
  fb_response: any;

  constructor(private afAuth: AngularFireAuth, private toastCtrl: ToastController, private storage: Storage) {

  }

  async login(user_email, user_password) {

      return await this.afAuth.auth.signInWithEmailAndPassword(user_email, user_password);

  }

  async obrada_uspjesnog_logina(data)
  {

    this.uid = data.uid;
    this.e_mail = data.email;
    this.photo_url = data.photoURL;
    this.user_name = data.displayName;

    if(this.user_name == null)
    {
      this.user_name = this.e_mail.split("@")[0];
    }

    if(this.photo_url == null || this.photo_url == '')
    {
      this.photo_url = 'https://firebasestorage.googleapis.com/v0/b/mbistrica-c5bd3.appspot.com/o/mblogo.png?alt=media&token=32a7650c-7a01-4b51-965a-7e6c17e7fcb9';
    }

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

  obrada_uspjesnog_registriranja()
  {
    //redirect na login page
    return true;
  }


}
