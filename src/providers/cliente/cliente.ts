import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvideer } from '../../modulos/baseProvideer';
import { DatosBasicos } from '../../modulos/DatosBasicos';
import { Cliente } from '../../modulos/cliente';

/*
  Generated class for the ClienteProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ClienteProvider
 {
   pagina="cliente.php";
   bd= new BaseProvideer();
   datosEnvio;
   constructor(public http: HttpClient)
   {

   }

   obtenerCliente(xParametro:string)
   {
    this.datosEnvio = new DatosBasicos(this.bd.getUsuario(),this.bd.getToken(),"","");
    this.datosEnvio.accion="BUSCARCLIENTE";
    this.datosEnvio.busqueda=xParametro;
    return this.http.post<Cliente[]>(this.bd.getPathCompleto(this.pagina),JSON.stringify(this.datosEnvio));
   }

  

}
