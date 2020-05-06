import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RDVPageRoutingModule } from './rdv-routing.module';

import { RDVPage } from './rdv.page';
import { NgCalendarModule } from 'ionic2-calendar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NgCalendarModule,
    RDVPageRoutingModule,

  ],
  declarations: [RDVPage]
})
export class RDVPageModule {}
