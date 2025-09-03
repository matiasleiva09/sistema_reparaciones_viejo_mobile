import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvideer } from '../../modulos/baseProvideer';
import { DatosBasicos } from '../../modulos/DatosBasicos';
import { Equipo } from '../../modulos/equipo';

/*
  Generated class for the EquipoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EquipoProvider
 {
  private bd:BaseProvideer=new BaseProvideer();
  private datosEnvio:DatosBasicos = null;
  private pagina:string="equipo.php";

  constructor(public http: HttpClient)
   {
     //  console.log('Hello EquipoProvider Provider');
   }

   obtenerEquipo(xCliente:string)
   {
    this.datosEnvio = new DatosBasicos(this.bd.getUsuario(),this.bd.getToken(),"","");
    this.datosEnvio.accion="BUSCAREQUIPO";
    this.datosEnvio.busqueda=xCliente;
    return this.http.post<Equipo[]>(this.bd.getPathCompleto(this.pagina),JSON.stringify(this.datosEnvio));
   }

}
