import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ImprimirOrdenPage } from './imprimir-orden';

@NgModule({
  declarations: [
    ImprimirOrdenPage,
  ],
  imports: [
    IonicPageModule.forChild(ImprimirOrdenPage),
  ],
})
export class ImprimirOrdenPageModule {}
