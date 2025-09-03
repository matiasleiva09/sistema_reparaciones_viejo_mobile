import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController } from 'ionic-angular';
import { BaseProvideer } from '../../modulos/baseProvideer';
import { ReparacionProvider } from '../../providers/reparacion/reparacion';
import { HttpClient } from '@angular/common/http';

/**
 * Generated class for the ImprimirEntregaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-imprimir-entrega',
  templateUrl: 'imprimir-entrega.html',
})
export class ImprimirEntregaPage
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
