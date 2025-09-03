import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { App } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
@Component({
  templateUrl: 'app.html'
})
export class MyApp 
{
  rootPage:any = HomePage;

  constructor(public  app: App,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
    public alertCtrl:AlertController) 
    {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    platform.registerBackButtonAction(() => 
    {
        let nav = this.app.getActiveNav();
        if (nav.canGoBack())
        { //Can we go back?
           if(nav.getActive().name=="MenuPage")
                platform.exitApp();
           else if(app._appRoot._modalPortal.getActive())
           {
                let data = { "cliente": '',"equipo":'' };
                app._appRoot._modalPortal.getActive().dismiss(data);
               // app._appRoot._modalPortal.getActive().onDidDismiss(() => { ready = true; });
           }
           else if(nav.getActive().name=="ImprimirOrdenPage")
               nav.popTo(nav.getByIndex(nav.length() - 3));
           else if(nav.getActive().name=="HomePage")
               platform.exitApp();
            else
                nav.pop();
        }
        else
        {   
            if(app._appRoot._modalPortal.getActive())
            {
                 let data = { "cliente": '',"equipo":'' };
                 app._appRoot._modalPortal.getActive().dismiss(data);
                // app._appRoot._modalPortal.getActive().onDidDismiss(() => { ready = true; });
            }
            else
                 platform.exitApp(); //Exit from app
        }
      });
  }
  
}

