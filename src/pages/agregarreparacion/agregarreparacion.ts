import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, DateTime, Platform } from 'ionic-angular';
import { Reparacion } from '../../modulos/reparacion';
import { Cliente } from '../../modulos/cliente';
import { Equipo } from '../../modulos/equipo';
import { BusquedaPage } from '../busqueda/busqueda';
import { ReparacionProvider } from '../../providers/reparacion/reparacion';
import { HttpClient } from '@angular/common/http';
import { BaseProvideer } from '../../modulos/baseProvideer';
import { ImprimirOrdenPage } from '../imprimir-orden/imprimir-orden';
import { DatePipe } from '@angular/common';
import { Item } from '../../modulos/Item';

/**
 * Generated class for the AgregarreparacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-agregarreparacion',
  templateUrl: 'agregarreparacion.html',
})
export class AgregarreparacionPage 
{

  public accesorios:string="";
  public falla:string="";
  public observaciones:string="";
  public abonado:number=0.00;
  public cliente:Cliente = new Cliente(0,"","","");
  public equipo:Equipo= new Equipo(0,"","","");
  private repProvider:ReparacionProvider = null;
  private bd= new BaseProvideer();
  public equipos:Item[]=new Array<Item>();
  public marcas:Array<string>=new Array<string>();
  public modelos:Array<string>=new Array<string>();
  public equipoBuscado:string;
  public marcaBuscado:string;
  public modeloBuscado:string;

  
  constructor(public plataforma: Platform,public httpClient: HttpClient,public alertCtrl:AlertController,
    private datePipe: DatePipe,public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController) 
  {
    this.repProvider = new ReparacionProvider(this.httpClient,this.bd);
  }

  ionViewDidLoad() 
  {
      
  }

  goCancelarEquipo(any:Event):void{

  }

  seleccionadoEquipo(sel:string):void
  {
    
  }

  goBuscarEquipoEx(event:any):void
  {
    this.repProvider.ObtenerEquiposDiccionario(this.equipoBuscado).subscribe(
       data=>
       {
            this.equipos=data;
            console.log(this.equipos);
       },
       error=>{
            console.log(error);
       }
    );

    const val = event.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') 
    {
         return;
      }
        
  }


  goBuscarCliente():void
  {
    localStorage.removeItem("busco");
    localStorage.setItem("busco","cliente");
    let profileModal = this.modalCtrl.create(BusquedaPage,{"cliente":null});
    profileModal.onDidDismiss(data => {
      if(data["cliente"]!="undefined" && data["cliente"]!=null 
      && data["cliente"]!="")
      {
        this.cliente=<Cliente>JSON.parse(data["cliente"]);
        this.equipo= new Equipo(0,"","","");
      }
    });
    profileModal.present();
    //this.navCtrl.push(BusquedaPage);
  }

  goBuscarEquipo():void
  {
    if(this.cliente.id==0)
    {
      const alert = this.alertCtrl.create({
        title: 'Atención!',
        message: 'No se puede buscar un equipo de un cliente nuevo',
        buttons: ['OK']
      });
      alert.present();
    }
    else
    {
      localStorage.setItem("busco","equipo");
      let profileModal = this.modalCtrl.create(BusquedaPage,{cliente:JSON.stringify(this.cliente)});
      profileModal.onDidDismiss(data => {
        if(data["equipo"]!="undefined" && data["equipo"]!=null 
               && data["equipo"]!="")
               this.equipo=<Equipo>JSON.parse(data["equipo"]);
      });
      profileModal.present();
    }

  }

   goGuardar():void
   {
        if(this.cliente.nombre!="" && this.equipo.tipo!="" && this.accesorios!=""
        && this.falla!="")
        {
             let rep:Reparacion= new Reparacion(0,"",new Date(),"TOMADA",this.accesorios,this.falla,
             this.observaciones,"","",this.abonado,"","","",this.bd.getUsuario().descripcion,0.00,null,null,this.cliente,this.equipo);
             rep.fechaEntradaFormateada=this.datePipe.transform(rep.fechaEntrada,"yyyy-MM-dd");
  
             this.repProvider.agregarEditar(rep,"").subscribe(data=>
              {
                 if(data!=null)
                 {
                    switch(data["estado"])
                    {
                       case "ERROR":
                                     const alert = this.alertCtrl.create(
                                       {
                                          title: 'ERROR!',
                                          message: "ha ocurrido un error: "+  data["estado"] ,
                                          buttons: ['OK']
                                       });
                                       alert.present();
                                        console.log(data);
                                    break;
                       case "OK":
                                 if(data["archivo"]!="undefined" && data["archivo"]!="") 
                                 {  
                                     let archivo:string=data["archivo"];
                                     archivo=archivo.replace("docs/","");
                                     this.navCtrl.push(ImprimirOrdenPage,{"documento":archivo});
                                 }
                                   
                                 else
                                 {
                                  const alert = this.alertCtrl.create({
                                  title: 'Atención!',
                                  message: "Se ha guardado correctamente la reparación.",
                                  buttons: ['OK']
                                });
                                alert.present();
                                this.navCtrl.pop();
                                 }
                                 
                                     
                                 break;
                       case "TOKEN NO VALIDO":
                                 break;
                        default:
                                console.log(data);
                                 break;
                    }
                 }    
             },
             error=>
             {
                console.log(error);
                const alert = this.alertCtrl.create({
                title: 'ERROR!',
                message: "ha ocurrido un error en la App.",
                buttons: ['OK']
              });
              alert.present();
             });
        }
        else
        {
          const alert = this.alertCtrl.create({
            title: 'Atención!',
            message: 'Debe completar los datos marcados con "*"',
            buttons: ['OK']
          });
          alert.present();
        }
   }

  getEquipo() : Equipo
  {
      let equipo:Equipo = JSON.parse(localStorage.getItem("equipo"));
      if(equipo==null)
        return this.equipo;
      else
        return equipo;
  }

}
