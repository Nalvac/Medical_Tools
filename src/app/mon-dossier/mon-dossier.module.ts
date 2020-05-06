import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MonDossierPageRoutingModule } from './mon-dossier-routing.module';

import { MonDossierPage } from './mon-dossier.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MonDossierPageRoutingModule
  ],
  declarations: [MonDossierPage]
})
export class MonDossierPageModule {}
