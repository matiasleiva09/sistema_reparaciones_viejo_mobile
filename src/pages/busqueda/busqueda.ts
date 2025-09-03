import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ViewController, Platform, LoadingController, Loading } from 'ionic-angular';
import { Cliente } from '../../modulos/cliente';
import { Equipo } from '../../modulos/equipo';
import { ClienteProvider } from '../../providers/cliente/cliente';
import { HttpClient } from '@angular/common/http';
import { EquipoProvider } from '../../providers/equipo/equipo';

/**
 * Generated class for the BusquedaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-busqueda',
  templateUrl: 'busqueda.html',
})
export class BusquedaPage
 {
  public clientes=new Array<Cliente>();
  public equipos = new Array<Equipo>();
  private clienteProv:ClienteProvider=null;
  private equipoProv:EquipoProvider=null;
  public filtro:string="";
  private clienteParam:Cliente=null;
  private loading:Loading;

  constructor(public loadingC:LoadingController,public plataforma:Platform,public alertCtrl:AlertController,public http:HttpClient,public navCtrl: NavController
    ,public viewCtrl: ViewController, public navParams: NavParams) 
  {
    this.clienteParam=<Cliente>JSON.parse(this.navParams.get("cliente"));
  }

  ionViewDidLoad() 
  {
     
       if(this.busco()=="equipo")
       {
         this.equipoProv= new EquipoProvider(this.http);
         console.log(this.clienteParam.id);
         this.loading=this.loadingC.create( { content: 'Cargado...'});
         this.loading.present();
         this.equipoProv.obtenerEquipo(this.clienteParam.id +"").subscribe
         (
           data=>
           {
              if(data!=null)
                this.equipos = data;
              console.log(data);
              this.loading.dismiss();
           },
           error=>
           {
             console.log(error);
           }
         );
       }
          
  }

  goVolver() :void
  {
    let data = { "cliente": '',"equipo":'' };
    this.viewCtrl.dismiss(data);
  }

  busco():string
  { 
    
    return localStorage.getItem("busco");
  }

  buscar()
  {
     if(this.filtro!=null && this.filtro.trim()!="")
     {
      if(this.busco()=="cliente")
      {
        this.clienteProv= new ClienteProvider(this.http);
        this.loading=this.loadingC.create( { content: 'Cargado...'});
        this.loading.present();
        this.clienteProv.obtenerCliente(this.filtro).subscribe(
          data=>
        {
            this.clientes=data;
            this.loading.dismiss();
        },
        err=>
        {
           console.log(err);
        });
      }
     }
     else{
      const alert = this.alertCtrl.create({
        title: 'Atención!',
        message: 'Ingrese algo para buscar',
        buttons: ['OK']
      });
      alert.present();
     }
     
  }

  goVolverCliente(cliente:Cliente):void
  {
       console.log("Cliente: " + JSON.stringify(cliente));
       let data = { "cliente": JSON.stringify(cliente),"equipo":'' };
       this.viewCtrl.dismiss(data);
  }

  goVolverEquipo(equipo:Equipo):void
  {
       let data = { "cliente": '',"equipo":JSON.stringify(equipo)};
       this.viewCtrl.dismiss(data);
  }

}
