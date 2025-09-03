import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController } from 'ionic-angular';
import { BaseProvideer } from '../../modulos/baseProvideer';
/**
 * Generated class for the ConfiguracionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-configuracion',
  templateUrl: 'configuracion.html',
})
export class ConfiguracionPage 
{
  http:string="http://localhost";
  puerto:string="80";

  private base:BaseProvideer=new BaseProvideer();
  
  constructor(public navCtrl: NavController, public navParams: NavParams,public plataforma: Platform,
    public alertCtrl:AlertController) 
  {

  }

   ionViewDidLoad() 
   {
     this.http=this.base.obtenerHttp();
     this.puerto=this.base.obtenerPuerto();
   }
 

    

   goGuardar()
   {
        if(this.http=="")
           this.http="http://localhost";
        if(this.puerto=="")
           this.puerto="80";
        console.log(this.http);
        this.base.setHttp(this.http);
        this.base.setPuerto(this.puerto);
        this.navCtrl.pop();
   }

}
