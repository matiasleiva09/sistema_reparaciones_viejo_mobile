import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ViewController } from 'ionic-angular';
import { BuscarrepPage } from '../buscarrep/buscarrep';
import { Storage } from '@ionic/storage';
import { AgregarreparacionPage } from '../agregarreparacion/agregarreparacion';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage
 {
  usuario = JSON.parse(localStorage.getItem("usuariosesion"));
  constructor(private db:Storage,public navCtrl: NavController, public navParams: NavParams,public plataforma:Platform,private viewCtrl: ViewController) 
  {
 
  }

  ionViewDidLoad() 
  {
  // this.initializeBackButtonCustomHandler();
  }

  ionViewWillLeave()
   {
    // Unregister the custom back button action for this page
   // this.unregisterBackButtonAction && this.unregisterBackButtonAction();
  }

   // Priority 101 will override back button handling (we set in app.component.ts) as it is bigger then priority 100 configured in app.component.ts file */      
   
  
    
  goBuscarReparacion():void
  {
     this.navCtrl.push(BuscarrepPage);
  }

  goAgregarReparacion():void
  {
     this.navCtrl.push(AgregarreparacionPage);
  }
   
  goSalir():void
  {
    this.db.remove("token");
    this.db.remove("usuariosesion");
    localStorage.removeItem("token");
    localStorage.removeItem("usuariosesion");
    console.log("la concha de tu madre!!!");
    this.navCtrl.pop();
    //this.plataforma.exitApp();
  }

  ionViewWillEnter() 
  {
     this.viewCtrl.showBackButton(false);
  }
}
