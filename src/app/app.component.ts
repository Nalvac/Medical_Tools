import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterEvent, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  selectedPath = '';

  pages = [
    {
      title: 'Accueil',
      url: '/tabs/tabs/accueil',
      icon : 'home-outline'
    },
    {
      title: 'Profil',
      url: '/tabs/tabs/profil',
      icon : 'person-circle-outline'
    },
    {
      title: 'Déconnexion ',
      url: '/connexion',
      icon : 'power-outline'
    }
  ];
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router : Router
  ) {
    this.initializeApp();
    this.router.events.subscribe((event: RouterEvent) => {
      
      this.selectedPath = event.url;
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
