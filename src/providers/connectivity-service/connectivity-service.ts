import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ConnectivityServiceProvider {

  toast_msg: any;

  constructor(private network: Network, private toast: ToastController){

    // watch network for a disconnect
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {

      this.toast_msg = this.toast.create({
        message: 'Uređaj nema pristup mreži',
        position: 'bottom'
      });

      this.toast_msg.present();


    });

    // watch network for a connection
    let connectSubscription = this.network.onConnect().subscribe(() => {

      if(this.toast_msg)
      {
          this.toast_msg.dismiss();
      }

      let toast = this.toast.create({
        message: 'Uređaj uspješno povezan na mrežu',
        duration: 3000,
        position: 'bottom'
      });

      toast.present();

    });

  }

}
