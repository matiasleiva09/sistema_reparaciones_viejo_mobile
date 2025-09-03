import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import {MenuPage} from '../menu/menu';
import { Usuario } from '../../modulos/Usuario';
import { ConfiguracionPage } from '../configuracion/configuracion';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { BaseProvideer } from '../../modulos/baseProvideer';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage  implements OnInit
{
  public usuario = new Usuario(null,"","","",false);
  private base = new BaseProvideer();
  private UsuarioProvideer:UsuarioProvider = null;
   httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  constructor(public plataforma: Platform,public navCtrl: NavController,public alertCtrl:AlertController,public httpClient:HttpClient) 
  {
    this.UsuarioProvideer= new UsuarioProvider(this.httpClient,this.base);
  }

  ngOnInit()
  { 
     if(this.base.getToken()!=null)
     {
      this.navCtrl.push(MenuPage);
     }
  }

  getLoguin():void
  {
     let resultado;
     let alert;
    if(this.usuario.nombre!="" && this.usuario.contrasena!="")
    {
      this.UsuarioProvideer.us=this.usuario;
      this.UsuarioProvideer.goInciarSesion().subscribe(
        res => {
            if(res["estado"]=="conectado")
            {
              this.base.removeToken();
              this.base.setToken(res["token"]);
              this.base.removeUsuario();
              this.base.setUsuario(res["usuario"]);
              this.navCtrl.push(MenuPage);
            }
            else
            {
              alert = this.alertCtrl.create({
                title: 'Atención',
                subTitle: 'Usuario y/o contraseña incorrectas',
                buttons: ['Ok']
              });
              alert.present();
            }
        },
        err => {
         // console.log("Error occured");
           console.log(err);
           alert = this.alertCtrl.create(
             {
                 
                 title:'Atención!',
                 subTitle: 'No se puede establecer conexión con el servidor',
                 buttons:["Ok"]
             }
           );
           alert.present();
        }
      );

      
    }   
    else
    {
        alert = this.alertCtrl.create({
        title: 'Atención',
        subTitle: 'Debe ingresar usuario y/o contraseña',
        buttons: ['Ok']
      });
      alert.present();
    }
       
  }

  goConfiguracion() :void
  {
      this.navCtrl.push(ConfiguracionPage);
  }

}
