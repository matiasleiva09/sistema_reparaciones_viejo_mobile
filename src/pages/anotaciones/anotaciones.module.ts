import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AnotacionesPage } from './anotaciones';

@NgModule({
  declarations: [
    AnotacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(AnotacionesPage),
  ],
})
export class AnotacionesPageModule {}
