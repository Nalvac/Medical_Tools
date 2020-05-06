import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HopitauxPageRoutingModule } from './hopitaux-routing.module';

import { HopitauxPage } from './hopitaux.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HopitauxPageRoutingModule
  ],
  declarations: [HopitauxPage]
})
export class HopitauxPageModule {}
