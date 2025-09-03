import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseProvideer } from '../../modulos/baseProvideer';
import { Usuario } from '../../modulos/Usuario';

/*
  Generated class for the UsuarioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioProvider
 {
  private pagina="index.php";
  public  us:Usuario;

  constructor(private httpClient: HttpClient,public db:BaseProvideer) 
  {
  }

  goValidarToken()
  {

  }

 

  goInciarSesion()
  {
    return this.httpClient.post(this.db.getPathCompleto(this.pagina),JSON.stringify(this.us));
  }

}
