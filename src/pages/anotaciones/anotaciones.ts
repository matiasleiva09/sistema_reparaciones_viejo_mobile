import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Anotaciones } from '../../modulos/anotaciones';
import { Cliente } from '../../modulos/cliente';

/**
 * Generated class for the AnotacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-anotaciones',
  templateUrl: 'anotaciones.html',
})
export class AnotacionesPage 
{
  public anotacion:Anotaciones=null;

  constructor(public navCtrl: NavController, public navParams: NavParams) 
  {

  }

  ionViewDidLoad() 
  {
    this.anotacion=<Anotaciones>JSON.parse(localStorage.getItem("anotacion"));
    if(this.anotacion==null)
        this.anotacion=new Anotaciones(0,null,null,"");
  }

  goGuardar()
  {

  }

}
