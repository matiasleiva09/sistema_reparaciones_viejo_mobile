import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonicPage, NavController, NavParams, Platform, Loading, LoadingController, AlertController } from 'ionic-angular';
import {ReparacionProvider} from '../../providers/reparacion/reparacion';
import { Reparacion } from '../../modulos/reparacion';
import { EditreparacionPage } from '../editreparacion/editreparacion';
import { BaseProvideer } from '../../modulos/baseProvideer';
import { Usuario } from '../../modulos/Usuario';
/**
 * Generated class for the BuscarrepPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-buscarrep',
  templateUrl: 'buscarrep.html',
})
export class BuscarrepPage 
{
  nroDeOrden:string="";
  public datos= new Array<Reparacion>();
  private base = new BaseProvideer();
  private repProvider:ReparacionProvider=null;
  private loading:Loading;
  
  
  constructor(public loadingC:LoadingController,public plataforma: Platform,public navCtrl: NavController, public navParams: NavParams,
    public httpClient:HttpClient,public alertCtrl:AlertController)
  {
      this.repProvider = new ReparacionProvider (this.httpClient,this.base);
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BuscarrepPage');
  }

  goEditar(rep:Reparacion):void
  {
    localStorage.setItem("reparacion",JSON.stringify(rep)); 
    this.nroDeOrden="";
    this.datos= new Array<Reparacion>();
    this.navCtrl.push(EditreparacionPage);
    
  }

  getBuscarPorNroOrden():void
  {
      let alert;
      this.loading=this.loadingC.create( { content: 'Cargado...'});
      this.loading.present();
      this.repProvider.ObtenerReparaciones(this.nroDeOrden).subscribe( result =>
        {
           if(result!=null)
           {
             this.datos=result;
             this.loading.dismiss();
             
           }
        },
       err => 
       {
          console.log(err);
          this.loading.dismiss();
          alert = this.alertCtrl.create(
            {
                title:'Atención!',
                subTitle: 'Se ha vencido su token o no hay comunicación con la base de datos',
                buttons:["Ok"]
            }
          );
          alert.present();
       },
       );
    
  }

}
