import { Component, OnInit } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
/**
 * Dans le ficher typscript de ma page accueil je gère l'accès aux différent élément de mon appliction

 */
export class AccueilPage implements OnInit {
 /**
   * Constructeur avec 2 paramètre
   * router : Outil de navigation 
   * menuCtrl: Permet de controler la page de menu
   */
  constructor(private storage : Storage,private geolocation : Geolocation, private plt : Platform,private menuCtrl : MenuController, private route : Router) { 
    this.menuCtrl.enable(true);
   
  }

  ngOnInit() {
  }
  
  ionViewWillEnter() {
    this.loadMaps();
    
  }
 
  ouvRdv(){
    this.route.navigateByUrl('/tabs/tabs/rdv')
  }
  ouvDossier(){
    this.route.navigateByUrl('/tabs/tabs/mon-dossier')
  }
  ouvHopitaux(){
    this.route.navigateByUrl('/tabs/tabs/hopitaux')

  }
  ouvTest(){
    this.route.navigateByUrl('/tabs/tabs/test')

  }
  loadMaps(){ 
    let latlng
    
      this.geolocation.getCurrentPosition().then(resp=>{
        this.storage.set('geolatitude', resp.coords.latitude)
        this.storage.set('geolongitude', resp.coords.longitude)
        console.log("moi "+resp.coords.longitude)
        latlng = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude)
    
  })
}
  
}
