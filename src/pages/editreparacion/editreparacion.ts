import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController, Loading, LoadingController } from 'ionic-angular';
import { Reparacion } from '../../modulos/reparacion';
import { ReparacionProvider } from '../../providers/reparacion/reparacion';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { ToastController } from 'ionic-angular';
import { BaseProvideer } from '../../modulos/baseProvideer';
import { WhatsappProvider } from '../../providers/whatsapp/whatsapp';
import { BaseMensaje } from '../../modulos/BaseMensaje';
import { SocialSharing } from '@ionic-native/social-sharing';
import { ImprimirOrdenPage } from '../imprimir-orden/imprimir-orden';
/**
 * Generated class for the EditreparacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editreparacion',
  templateUrl: 'editreparacion.html',
})
export class EditreparacionPage  implements OnInit
  {

   reparacion:Reparacion=null;
   estados=new Array();
   estadoAnterior:string="";
   mimodelo:any;
   private whastapp:WhatsappProvider=null;
   private repProvider:ReparacionProvider =null; 
   private base = new BaseProvideer();
   private loading:Loading;

  
  constructor(public loadingC:LoadingController,public navCtrl: NavController, public navParams: NavParams,public alertCtrl:AlertController,public httpClient:HttpClient,
    private datePipe: DatePipe,public toastCtrl: ToastController,private socialSharing: SocialSharing)
   {
    this.repProvider = new ReparacionProvider (this.httpClient,this.base);
  }

  ngOnInit()
  { 
    this.reparacion=<Reparacion>JSON.parse(localStorage.getItem("reparacion"));
    this.estadoAnterior=this.reparacion.estado;
    if(this.reparacion.estado=="TOMADA")
    {
       this.estados[0]="TOMADA";
       this.estados[1]="EN REPARACION";
       this.estados[2]="REPARADA";
       this.estados[3]="ENTREGADA";
    }
    else if(this.reparacion.estado=="EN REPARACION")
    {
      this.estados[0]="EN REPARACION";
      this.estados[1]="REPARADA";
      this.estados[2]="ENTREGADA";
    }
    else if(this.reparacion.estado=="REPARADA")
    {
      this.estados[0]="REPARADA";
      this.estados[1]="ENTREGADA";
    }
    else if(this.reparacion.estado=="ENTREGADA")
    {
      this.estados[0]="ENTREGADA";
    }
  }

  ionViewDidLoad() 
  {
    
  }

  goReImprimir()
  {
  /*  this.loading=this.loadingC.create( { content: 'Imprimiendo...'});
    this.loading.present();
    console.log(this.reparacion);*/
   /* this.repProvider.MandarReimprimir(this.reparacion).subscribe(
      data=>
      {
            console.log(data);  
            //this.loading.dismiss();
      },
      error=>
      {
            console.log("Error:"  +  error);
            //this.loading.dismiss();
      }
    );*/
    var db = new BaseProvideer();
    window.open(db.getPathCompleto("docs/OrdenNro" + this.reparacion.codigo  +  ".pdf") ,  "_system", "location=yes");
  }

  enviarSMS()
  {
    let telcel ="";
    if(this.reparacion.cliente.celular!="")
       telcel=this.reparacion.cliente.celular;
    else if(this.reparacion.cliente.telefono!="")
       telcel=this.reparacion.cliente.telefono;
    let datosEnviar:BaseMensaje= new BaseMensaje(telcel,this.reparacion.informe);
    this.socialSharing.shareViaSMS(datosEnviar.telefono, datosEnviar.mensaje).then(() => 
     {
       console.log("hola");
      // Success!
    }).catch(error => {
      // Error!
      console.log(error);
    });
  }

  enviarWhatsapp()
  {
    let telcel ="";
    if(this.reparacion.cliente.celular!="")
       telcel=this.reparacion.cliente.celular;
    else if(this.reparacion.cliente.telefono!="")
       telcel=this.reparacion.cliente.telefono;
    let datosEnviar:BaseMensaje= new BaseMensaje(telcel," ");
    this.socialSharing.shareViaWhatsAppToReceiver(datosEnviar.telefono, datosEnviar.mensaje, "", "").then(() => 
     {
       console.log("hola");
      // Success!
    }).catch(error => {
      // Error!
      console.log(error);
    });
     
  }

  goGuardar()
  {
     if( this.estadoAnterior!="ENTREGADA")
     {
         /* if((this.reparacion.estado!="TOMADA" && this.reparacion.informe!=null &&
           this.reparacion.senia!=null && this.reparacion.costo!=null)*/
           if((((this.reparacion.estado=="REPARADA" || this.reparacion.estado=="ENTREGADA")
            && (this.reparacion.informe!=null && this.reparacion.informe!="")
           && (this.reparacion.senia!=null) && (this.reparacion.costo!=null)))
           || (this.reparacion.estado=="EN REPARACION")
           )
           // || (this.reparacion.entregadoPor!=null  && this.reparacion.estado=="ENTREGADA") )
           {
               
                let descripcionUsuario:string=this.base.getUsuario().descripcion;
                if(this.reparacion.estado=="REPARADA" && this.reparacion.fechaRealizada==null)
                {
                  this.reparacion.fechaRealizada=new Date();
                  this.reparacion.fechaEntregada=null;
                  this.reparacion.reparadoPor=descripcionUsuario;
                  this.reparacion.fechaRealizadaFormateada=this.datePipe.transform(this.reparacion.fechaRealizada,"yyyy-MM-dd");
                }
                  
                if(this.reparacion.estado=="ENTREGADA" && this.reparacion.fechaEntregada==null)
                {
                  this.reparacion.fechaEntregada=new Date();
                  this.reparacion.entregadoPor=descripcionUsuario;
                  if(this.reparacion.fechaRealizada==null)
                  {
                    this.reparacion.fechaRealizada=new Date();
                    this.reparacion.fechaRealizadaFormateada=this.datePipe.transform(this.reparacion.fechaRealizada,"yyyy-MM-dd");
                  }
                     
                  
                  this.reparacion.fechaEntregadaFormateada=this.datePipe.transform(this.reparacion.fechaEntregada,"yyyy-MM-dd");
                }
                this.repProvider.agregarEditar(this.reparacion,this.estadoAnterior).subscribe( result =>
                    {
                       if(result!==null)
                       {
                            if(result["estado"]=="OK" && this.reparacion.estado!="ENTREGADA")
                            {
                              let  alert = this.alertCtrl.create({
                                title: 'Exito!',
                                subTitle: 'Se guardaron los datos correctamente.',
                                buttons: ['Ok']
                              });
                              alert.present();
                           
                            }
                            else
                            {
                              console.log(result);
                            }
                       }
                       
                    },
                   err => 
                   {
                      console.log(err);
                      let  alert = this.alertCtrl.create({
                        title: 'Error!',
                        subTitle: 'ha ocurrido un inconveniente!',
                        buttons: ['Ok']
                      });
                      alert.present();
                     // this.navCtrl.pop();
                    
                   });

                   console.log(this.reparacion.estado);

                   if(this.reparacion.estado=="ENTREGADA")
                   {
                    console.log("hola");
                    this.repProvider.MandarImprimirEntrega(this.reparacion).subscribe( result =>
                      {
                        console.log("Resultado: " + result); 
                        if(result!==null)
                         {
                           
                              if(result["archivo"]!="undefined" && result["archivo"]!="") 
                               {  
                                   let archivo:string=result["archivo"];
                                   archivo=archivo.replace("docs/","");
                                   this.navCtrl.push(ImprimirOrdenPage,{"documento":archivo});
                              }
                              else
                              {
                                console.log("Valor: " + result);
                              }
                         }
                         console.log("la puta madre");
                         
                      },
                     err => 
                     {
                        console.log(err);
                        let  alert = this.alertCtrl.create({
                          title: 'Error!',
                          subTitle: 'ha ocurrido un inconveniente!',
                          buttons: ['Ok']
                        });
                        alert.present();
                       // this.navCtrl.pop();
                      
                     });
                   
                   }
                  // else
                   //{
                               
                        this.navCtrl.pop();
           //        }
           }
           else
           {
              if(this.reparacion.estado=="REPARADA" || this.reparacion.estado=="ENTREGADA")
              {
                let  alert = this.alertCtrl.create({
                  title: 'Atención',
                  subTitle: 'Si está reparado debe ingresar datos en campo Solución.',
                  buttons: ['Ok']
                });
                alert.present();
              }
              else
                 this.navCtrl.pop();
             
            
           }
     }
     
  }

  goVerCliente() :void
  {
    const alert = this.alertCtrl.create({
      title: 'Cliente',
      message: '<b>Nombre:</b> ' + this.reparacion.cliente.nombre + "<br /><b> Tel:</b> " + this.reparacion.cliente.telefono + 
      "<br /><b>Cel:</b> " +  this.reparacion.cliente.celular,
      buttons: ['OK']
    });
    alert.present();
  }

  goObservaciones() :void
  {
    const alert = this.alertCtrl.create({
      title: 'Observaciones',
      message: this.reparacion.observaciones,
      buttons: ['OK']
    });
    alert.present();
  }

  goVerEquipo() :void
  {
    /*const toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();*/

    const alert = this.alertCtrl.create({
      title: 'Equipo',
      message: '<b>Tipo:</b> ' + this.reparacion.equipo.tipo + "<br /><b> Marca:</b> " + this.reparacion.equipo.marca + 
      "<br /><b>Modelo:</b> " +  this.reparacion.equipo.modelo,
      buttons: ['OK']
    });
    alert.present();
  }

  goAccesorios() :void
  {
    /*const toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();*/

    const alert = this.alertCtrl.create({
      title: 'Accesorios',
      message: this.reparacion.accesorios,
      buttons: ['OK']
    });
    alert.present();
  }

  goFalla() :void
  {
    /*const toast = this.toastCtrl.create({
      message: 'User was added successfully',
      duration: 3000
    });
    toast.present();*/

    const alert = this.alertCtrl.create({
      title: 'Falla',
      message: this.reparacion.falla,
      buttons: ['OK']
    });
    alert.present();
  }

}
