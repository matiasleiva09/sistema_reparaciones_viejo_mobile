import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { ReparacionProvider } from '../../providers/reparacion/reparacion';
import { DatosBasicos } from '../../modulos/DatosBasicos';
import { BaseProvideer } from '../../modulos/baseProvideer';
import { HttpClient } from '@angular/common/http';
import { MenuPage } from '../menu/menu';

/**
 * Generated class for the ImprimirOrdenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imprimir-orden',
  templateUrl: 'imprimir-orden.html',
})
export class ImprimirOrdenPage
 {

  private repProv:ReparacionProvider;
  constructor(public alertCtrl:AlertController,private httpClient:HttpClient,private viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) 
  {
      this.repProv= new ReparacionProvider(this.httpClient,new BaseProvideer());
  }

  
  ionViewWillEnter() 
  {
     this.viewCtrl.showBackButton(false);
  }

  goAbrirPDF()
  {
    console.log(this.navParams.get("documento"));
    var db = new BaseProvideer();
    window.open(db.getPathCompleto("docs/"  + this.navParams.get("documento")) ,  "_system", "location=yes");
  }

  goImprimir()
  {
      console.log(this.navParams.get("documento"));
      this.repProv.MandarImprimir(this.navParams.get("documento")).subscribe
      (
        data=>
        {
          const alert = this.alertCtrl.create(
            {
               title: 'Atencion!',
               message: "Se ha mandado a imprimir el documento" ,
               buttons: ['OK']
            });
            alert.present();
        },
        error=>
        {
            console.log(error);
            const alert = this.alertCtrl.create(
            {
               title: 'ERROR!',
               message: "ha ocurrido un error" ,
               buttons: ['OK']
            });
            alert.present();
        }
        
      );
  }

  goVolver()
  {
    this.navCtrl.popTo(this.navCtrl.getByIndex(this.navCtrl.length() - 3));
  }

  ionViewDidLoad()
   {
    console.log('ionViewDidLoad ImprimirOrdenPage');
  }

}
