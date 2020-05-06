import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.page.html',
  styleUrls: ['./accueil.page.scss'],
})
export class AccueilPage implements OnInit {

  constructor(private menuCtrl : MenuController, private route : Router) { 
    this.menuCtrl.enable(true);
    
  }

  ngOnInit() {
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
  
}
