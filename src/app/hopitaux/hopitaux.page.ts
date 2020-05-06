import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Platform } from '@ionic/angular';
@Component({
  selector: 'app-hopitaux',
  templateUrl: './hopitaux.page.html',
  styleUrls: ['./hopitaux.page.scss'],
})
export class HopitauxPage implements OnInit {
  
  @ViewChild ('map',{static : false}) mapElement : ElementRef;
  map : google.maps.Map;
  hopitaux : google.maps.Marker;
  infowindow = new  google.maps.InfoWindow;
  constructor(private geolocation : Geolocation, private plt : Platform) { }
  ngOnInit() {
  }
  ionViewWillEnter(){
    this.loadMaps();
   // this.loadUserPosition();
    this.nearby();
  }
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
  loadUserPosition(){

    this.plt.ready().then(()=>{
        this.geolocation.getCurrentPosition().then(resp=>{
          this.focusMap(resp.coords.latitude,resp.coords.longitude);
          this.addMarker(resp.coords.latitude,resp.coords.longitude,"Vous")
        })
    })
   
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
  nearby (){
    let request :google.maps.places.PlaceSearchRequest = {
      type : 'hospital',
      radius :1000,
      location : new google.maps.LatLng(45.1667,5.7167)
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
