import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      
        {
          path: 'profil',
          loadChildren: () => import('../profil/profil.module').then( m => m.ProfilPageModule)
        },
        {
          path: 'parametre',
          loadChildren: () => import('../parametre/parametre.module').then( m => m.ParametrePageModule)
        },
        {
          path: 'accueil',
          loadChildren: () => import('../accueil/accueil.module').then( m => m.AccueilPageModule)
        },
        {
          path: 'rdv',
          loadChildren: () => import('../rdv/rdv.module').then( m => m.RDVPageModule)
        },
        {
          path : 'test',
          loadChildren: () => import('../test/test.module').then(m=>m.TestPageModule)
        },
        {
          path : 'hopitaux',
          loadChildren: () => import('../hopitaux/hopitaux.module').then(m=>m.HopitauxPageModule)
        },
        {
          path : 'mon-dossier',
          loadChildren : () => import ('../mon-dossier/mon-dossier.module').then(m=> m.MonDossierPageModule)
        }
        
    
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/tabs/accueil',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
