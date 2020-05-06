import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RDVPage } from './rdv.page';

const routes: Routes = [
  {
    path: '',
    component: RDVPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RDVPageRoutingModule {}
