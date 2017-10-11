import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConnectivityServiceProvider } from '../../providers/connectivity-service/connectivity-service';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, CameraPosition, MarkerOptions, Marker, HtmlInfoWindow } from '@ionic-native/google-maps';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-interaktivna-mapa',
  templateUrl: 'interaktivna-mapa.html',
})
export class InteraktivnaMapaPage {

  map: GoogleMap;
  mapElement: HTMLElement;

  interaktivna_mapa_opcenito: any = {};
  interaktivna_mapa_smjestaj: any = {};

  markers_opcenito = [];
  markers_opcenito_checkbox: boolean = true;

  markers_dogadjanja = [];
  markers_dogadjanja_checkbox: boolean = true;

  markers_smjestaj = [];
  markers_smjestaj_checkbox: boolean = true;

  markers_gastro = [];
  markers_gastro_checkbox: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private googleMaps: GoogleMaps, db: AngularFireDatabase) {

    db.list('/interaktivna_mapa/').subscribe(podaci => { this.interaktivna_mapa_opcenito = podaci; });
    db.list('/smjestaj_detalji/').subscribe(podaci => { this.interaktivna_mapa_smjestaj = podaci;  });

  }

  ionViewDidLoad() {
   this.loadMap();
  }

 loadMap() {
    this.mapElement = document.getElementById('map');
    this.map = this.googleMaps.create(this.mapElement);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {

        var label = document.getElementById("label");

        this.map.setOptions({
          'mapType': 'MAP_TYPE_SATELLITE',
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
            'mapToolbar': true   // currently Android only
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            'target': {
              lat: 46.00507,
              lng: 16.119108
            },
            zoom: 15
          },
          'preferences': {
            'zoom': {
              'maxZoom': 19
            },
            'padding': {
              'left': 5,
              'top': 60,
              'bottom': 5,
              'right': 5
            }
          }
        });

        this.map.setTrafficEnabled(true);

        //Filanje sa regularnim informacijama
        for (let item of this.interaktivna_mapa_opcenito) {
          this.map.addMarker({

              icon: item.slika, animation: 'BOUNCE', zIndex: 9999,
              position: { lat: item.lat, lng: item.lng } }).then(marker => {

              this.markers_opcenito = this.markers_opcenito.concat(marker);

              marker.setTitle(item.naziv);
              marker.setSnippet(item.opis + "\nAdresa: " + item.adresa);

              //Kad se klikne
              marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {

                  //Pomakni kameru rotiraj
                  marker.showInfoWindow();
                  this.map.animateCamera({target: {lat: item.lat, lng: item.lng}, zoom: 17, tilt: 60, bearing: 140, duration: 1500});
              });

            });
         }

         for (let item_smjestaj of this.interaktivna_mapa_smjestaj) {

           this.map.addMarker({

               icon: item_smjestaj.interaktivna_mapa_slika, animation: 'BOUNCE', zIndex: 9999,
               position: { lat: item_smjestaj.location_lat, lng: item_smjestaj.location_lon } }).then(marker => {

               this.markers_smjestaj = this.markers_smjestaj.concat(marker);

               marker.setTitle(item_smjestaj.naziv_objekta);
               marker.setSnippet(item_smjestaj.opis + "\nAdresa: " + item_smjestaj.adresa);

               //Kad se klikne
               marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
                   //Pomakni kameru rotiraj
                   marker.showInfoWindow();
                   this.map.animateCamera({target: {lat: item_smjestaj.location_lat, lng: item_smjestaj.location_lon}, zoom: 17, tilt: 60, bearing: 140, duration: 1500});
               });

               //Dugi klik na INFO
               marker.on(GoogleMapsEvent.INFO_CLICK).subscribe(() => {
                      this.navCtrl.push('SmjestajDetaljiPage', {id: item_smjestaj.id});
                   });
               });


          }

      });
  }

  show_hide_markers(value)
  {

    if(!this.markers_opcenito_checkbox)
    {
      this.markers_opcenito.forEach(item => {
        item.setVisible(false);
      });
    }
    else
    {
      this.markers_opcenito.forEach(item => {
        item.setVisible(true);
      });
    }

    if(!this.markers_smjestaj_checkbox)
    {
      this.markers_smjestaj.forEach(item => {
        item.setVisible(false);
      });
    }
    else
    {
      this.markers_smjestaj.forEach(item => {
        item.setVisible(true);
      });
    }

  }


}
