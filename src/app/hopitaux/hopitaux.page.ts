import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-hopitaux',
  templateUrl: './hopitaux.page.html',
  styleUrls: ['./hopitaux.page.scss'],
})
export class HopitauxPage implements OnInit {
  /**
 * Dans le ficher typscript de ma page hopitaux je gère le map permettant d'identifié les hopitaux dans 
 * un rayon de 1 kilomètre de l'emplacement du patient
 */
  @ViewChild ('map',{static : false}) mapElement : ElementRef;
  map : google.maps.Map;
  hopitaux : google.maps.Marker;
  infowindow = new  google.maps.InfoWindow;
  constructor(private geolocation : Geolocation, private plt : Platform) { }
  ngOnInit() {
  }
  /**
   * Cette fonction me permet d'actualiser le maps après chaque évènement de click sur la page html hôpitaux
   */

  ionViewWillEnter(){
    this.loadMaps();
    this.nearby();
  }
  /**
   * Fonction permet charger le maps avec l'emplacement du patient
   */
  loadMaps(){ 
    let latlng
    this.plt.ready().then(()=>{
      this.geolocation.getCurrentPosition().then(resp=>{
        this.focusMap(resp.coords.latitude,resp.coords.longitude);
        this.addMarker(resp.coords.latitude,resp.coords.longitude,"Vous");
        latlng = new google.maps.LatLng(resp.coords.latitude,resp.coords.longitude)
      })
  })
    
 
    let mapOptions : google.maps.MapOptions = {
      center : latlng,
      zoom : 2,
      mapTypeId : google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions );
  }
 
  focusMap(lat, lng){
     let latlng = new google.maps.LatLng(lat, lng);
     this.map.setCenter(latlng);
     this.map.setZoom(12)
  }

  addMarker(lat, lng, info){
    let latlng = new google.maps.LatLng(lat, lng);
    this.hopitaux = new google.maps.Marker({
      map : this.map,
      position : latlng,
      animation : google.maps.Animation.DROP
    })

    let infoWindrow = new google.maps.InfoWindow({
      content : info,      
    })

    this.hopitaux.addListener('click', ()=>{
    infoWindrow.open(this.map,this.hopitaux);
    })
  }
  removeMarker(){

  }
  toggleMarker(){

  }
  /**
   * Cette fonction nous retourne tout les hopitaux proche de notre emplacement
   */
  nearby (){
    let request :google.maps.places.PlaceSearchRequest = {
      type : 'hospital',
      radius :1000,
      location : this.hopitaux.getPosition()
    };   
    let service = new google.maps.places.PlacesService(this.map);
  
    service.nearbySearch(request, (results, status) =>{
      console.log(results);
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let places of results) {
          this.addNearbyMaker(places)
        }
     
      }
    });
  }

/**
 * Permet d'ajouter un marker sur chaque emplacement trouver
 * Ainsi que les informations de leurs emplacement nom, adresse etc...
 * @param places : prend en parametre l'objet place retourner par la fonction nearby()
 */
addNearbyMaker(places : google.maps.places.PlaceResult){

  const icon = {
    url: places.icon,
    scaledSize: new google.maps.Size(25, 25),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0)
  };
  let marker = new google.maps.Marker({
    map : this.map,
    position : places.geometry.location,
    animation : google.maps.Animation.DROP,
    icon : icon
  });
  marker.addListener('click', () => {
 ;
  
    this.infowindow.setContent(`<br>
    <b>${places.name}</b><br>${places.vicinity}`);
    this.infowindow.open(this.map, marker);
  });
}
}
