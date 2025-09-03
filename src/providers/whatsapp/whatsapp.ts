import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SocialSharing } from '@ionic-native/social-sharing';
import { BaseMensaje } from '../../modulos/BaseMensaje';

/*
  Generated class for the WhatsappProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WhatsappProvider 
{
  public mensaje:BaseMensaje;

  constructor(public http: HttpClient,public socialSharing: SocialSharing) 
  {
    console.log('Hello WhatsappProvider Provider');
  }

  public EnviarMensaje()
  {
      return this.http.get("https://wa.me/"+ this.mensaje.telefono + "?text=" + this.mensaje.mensaje);
  }

}
