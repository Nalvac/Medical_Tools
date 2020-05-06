import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.page.html',
  styleUrls: ['./parametre.page.scss'],
})
export class ParametrePage implements OnInit {

  constructor(private menuCtrl : MenuController) { 
    this.menuCtrl.enable(true);
  }

  ngOnInit() {

}
ionViewWillEnter(){
  
}
}
