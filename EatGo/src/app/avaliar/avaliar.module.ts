import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvaliarPageRoutingModule } from './avaliar-routing.module';

import { AvaliarPage } from './avaliar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvaliarPageRoutingModule
  ],
  declarations: [AvaliarPage]
})
export class AvaliarPageModule {}
