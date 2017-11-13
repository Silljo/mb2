import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from 'firebase';
import { Storage } from '@ionic/storage';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'page-komunalno',
  templateUrl: 'komunalno.html',
})


export class KomunalnoPage {

  private komunalno : FormGroup;
  slika: string;
  slika_validation: string;
  uid: string;
  datum: String = new Date().toISOString();
  prijave_komunalno_data = [];
  komunalno_segment: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private camera: Camera, private storage: Storage,
              db: AngularFireDatabase) {

    this.komunalno_segment = 'prijava';

    this.komunalno = this.formBuilder.group({
      hitnost: ['niska', Validators.required],
      mjesto: ['', Validators.required],
      opis: ['', Validators.required],
      slika: [this.slika, Validators.required],
      kontakt: ['', Validators.required],
    });

    this.storage.get('uid').then((uid) => {
      if(uid){db.list("/komunalno/", {query:{orderByChild : 'uid', equalTo: uid}}).subscribe((data) => {this.prijave_komunalno_data = data;});}
    });




  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad KomunalnoPage');
  }

  logForm(){

    var opis = this.komunalno.value.opis;
    var mjesto = this.komunalno.value.mjesto;
    var kontakt = this.komunalno.value.kontakt;
    var hitnost = this.komunalno.value.hitnost;

    this.storage.get('uid').then((uid) => {

      if(uid)
      {
        var storageRef = firebase.storage().ref('/komunalno/');

        storageRef.putString(this.slika, firebase.storage.StringFormat.DATA_URL).then(function(snapshot) {

          //var newPostKey = firebase.database().ref().child('komunalno').push().key;

          firebase.database().ref('komunalno/').push({
              status: 'Poslano',
              image_url: snapshot.downloadURL,
              opis: opis,
              mjesto: mjesto,
              kontakt: kontakt,
              hitnost: hitnost,
              uid: uid
            });

            alert("finito");
        });
      }
    });

  }

  async slika_komunalno()
  {
    try{

      const options: CameraOptions = {
        quality: 50,
        targetWidth: 1000,
        targetHeight: 1000,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        saveToPhotoAlbum: false,
        allowEdit : true,
        correctOrientation: true
      }

      await this.camera.getPicture(options).then((imageData) => {
       // imageData is either a base64 encoded string or a file URI
       // If it's base64:
       let base64Image = 'data:image/jpeg;base64,' + imageData;
       this.slika = base64Image;
       this.slika_validation = 'true';

      }, (err) => {
       // Handle error
      });
      }
      catch(e)
      {

      }
  }



}
