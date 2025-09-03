import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvideer } from '../../modulos/baseProvideer';
import { Anotaciones } from '../../modulos/anotaciones';
import { DatosBasicos } from '../../modulos/DatosBasicos';

/*
  Generated class for the ProviderAnotacionesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProviderAnotacionesProvider 
{
  pagina="cliente.php";
  bd= new BaseProvideer();
  datosEnvio;
  
  constructor(public http: HttpClient) 
  {
   
  }

  Guardar(anotacion:Anotaciones) 
  {
    this.datosEnvio = new DatosBasicos(this.bd.getUsuario(),this.bd.getToken(),"","");
    this.datosEnvio.anotacion=anotacion;
    this.datosEnvio.accion="AGREGAREDITAR";
    return this.http.post(this.bd.getPathCompleto(this.pagina),JSON.stringify(this.datosEnvio));
  }

}
