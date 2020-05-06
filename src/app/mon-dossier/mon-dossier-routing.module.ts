import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MonDossierPage } from './mon-dossier.page';

const routes: Routes = [
  {
    path: '',
    component: MonDossierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MonDossierPageRoutingModule {}
