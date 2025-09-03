import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { MenuPageModule } from '../pages/menu/menu.module';
import {BuscarrepPageModule} from '../pages/buscarrep/buscarrep.module';
import {HttpClientModule} from '@angular/common/http';
import { ReparacionProvider } from '../providers/reparacion/reparacion';
import { EditreparacionPageModule } from '../pages/editreparacion/editreparacion.module';
import {DatePipe} from '@angular/common';
import { IonicStorageModule } from '@ionic/storage';
import { ConfiguracionPageModule } from '../pages/configuracion/configuracion.module';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { AgregarreparacionPageModule } from '../pages/agregarreparacion/agregarreparacion.module';
import { BusquedaPageModule } from '../pages/busqueda/busqueda.module';
import { ClienteProvider } from '../providers/cliente/cliente';
import { EquipoProvider } from '../providers/equipo/equipo';
import { ImprimirOrdenPageModule } from '../pages/imprimir-orden/imprimir-orden.module';
import { WhatsappProvider } from '../providers/whatsapp/whatsapp';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ProviderAnotacionesProvider } from '../providers/provider-anotaciones/provider-anotaciones';
import { ImprimirEntregaPageModule } from '../pages/imprimir-entrega/imprimir-entrega.module';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    MenuPageModule,
    BuscarrepPageModule,
    EditreparacionPageModule,
    AgregarreparacionPageModule,
    BusquedaPageModule,
    ConfiguracionPageModule,
    ImprimirOrdenPageModule,
    ImprimirEntregaPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DatePipe,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ReparacionProvider,
    UsuarioProvider,
    ClienteProvider,
    EquipoProvider,
    SocialSharing,
    WhatsappProvider,
    ProviderAnotacionesProvider
  ]
})
export class AppModule {}
