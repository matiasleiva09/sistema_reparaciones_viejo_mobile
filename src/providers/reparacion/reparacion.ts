import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DatosBasicos } from '../../modulos/DatosBasicos';
import { Reparacion } from '../../modulos/reparacion';
import { Storage} from '@ionic/storage';
import { BaseProvideer } from '../../modulos/baseProvideer';
import { Usuario } from '../../modulos/Usuario';
import { Cliente } from '../../modulos/cliente';
import { Item } from '../../modulos/Item';
/*
  Generated class for the ReparacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReparacionProvider
 {
  private pagina:string="reparaciones.php";
  private datosEnvio:DatosBasicos=null;

  constructor(public httpClient: HttpClient,private bd:BaseProvideer)
  {
 
     
  }

  

  ObtenerReparacion(nroOrden:string)
  {
    
    let usuario:Usuario=this.bd.getUsuario();
    let token:string=this.bd.getToken();
    this.datosEnvio = new DatosBasicos(usuario,token,"","");
    console.log(JSON.stringify(this.datosEnvio));
    //let resultado:Reparacion;
    this.datosEnvio.accion="OBTENERPORNRO";
    this.datosEnvio.busqueda=nroOrden;
    
    return this.httpClient.post(this.bd.getPathCompleto(this.pagina),JSON.stringify(this.datosEnvio));
  }
  
  MandarImprimir(orden:string)
  {
    let usuario:Usuario=this.bd.getUsuario();
    let token:string=this.bd.getToken();
    this.datosEnvio = new DatosBasicos(usuario,token,"","");
    //let resultado:Reparacion;
    this.datosEnvio.accion="IMPRIMIRORDEN";
    this.datosEnvio.busqueda=orden;
    return this.httpClient.post(this.bd.getPathCompleto(this.pagina),JSON.stringify(this.datosEnvio));
  }

  MandarImprimirEntrega(rep:Reparacion)
  {
    let usuario:Usuario=this.bd.getUsuario();
    let token:string=this.bd.getToken();
    this.datosEnvio = new DatosBasicos(usuario,token,"","");
    //let resultado:Reparacion;
    this.datosEnvio.accion="IMPRIMIRENTREGA";
    this.datosEnvio.reparacion=rep;
    return this.httpClient.post(this.bd.getPathCompleto(this.pagina),JSON.stringify(this.datosEnvio));
  }

  MandarReimprimir(rep:Reparacion)
  {
    let usuario:Usuario=this.bd.getUsuario();
    let token:string=this.bd.getToken();
    this.datosEnvio = new DatosBasicos(usuario,token,"","");
    //let resultado:Reparacion;
    this.datosEnvio.accion="REIMPRIMIR";
    this.datosEnvio.reparacion=rep;
    console.log(rep);
    return this.httpClient.post(this.bd.getPathCompleto(this.pagina),JSON.stringify(this.datosEnvio));
  }

  ObtenerEquiposDiccionario(xBusqueda:string)
  {
    {
      let usuario:Usuario=this.bd.getUsuario();
      let token:string=this.bd.getToken();
      this.datosEnvio = new DatosBasicos(usuario,token,"","");
      //let resultado:Reparacion;
      this.datosEnvio.accion="BUSCAREQUIPOSDIC";
      this.datosEnvio.busqueda=xBusqueda;
      return this.httpClient.post<Item[]>(this.bd.getPathCompleto(this.pagina),JSON.stringify(this.datosEnvio));
    }
  }
   
  ObtenerReparaciones(cliente:string)
  {
    
    this.datosEnvio = new DatosBasicos(this.bd.getUsuario(),this.bd.getToken(),"","");
    this.datosEnvio.accion="BUSCARPORCUALQUIERA";
    this.datosEnvio.busqueda=cliente;
    return this.httpClient.post<Reparacion[]>(this.bd.getPathCompleto(this.pagina),JSON.stringify(this.datosEnvio));
  }
  //ESTE ES EDITAR EN REALIDAD
  agregarEditar(rep:Reparacion,estadoAnt:string)
  {
    this.datosEnvio = new DatosBasicos(this.bd.getUsuario(),this.bd.getToken(),"","");
    this.datosEnvio.reparacion=rep;
    this.datosEnvio.accion="AGREGAREDITAR";
    return this.httpClient.post(this.bd.getPathCompleto(this.pagina),JSON.stringify(this.datosEnvio));
  }

}
