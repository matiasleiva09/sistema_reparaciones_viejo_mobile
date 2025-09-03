import { Storage} from '@ionic/storage';
import { Usuario } from './Usuario';

export class BaseProvideer
{
   
     private usuario:Usuario=null;


     constructor()
     {
       
     }

     getUsuario()
     {
        
         return <Usuario>JSON.parse(localStorage.getItem("usuariosesion"));
     }
     
     removeUsuario()
     {
        localStorage.removeItem("usuariosesion");
     }

     setUsuario(usuario:Usuario)
     {
         localStorage.setItem("usuariosesion",JSON.stringify(usuario))
     }

     getToken()
     {
          return localStorage.getItem("token");
     }

     removeToken()
     {
        localStorage.removeItem("token");
     }

     setToken(token:string)
     {
        return localStorage.setItem("token",token);
     }

     getPathCompleto(pagina:string)
     {
       let http=this.obtenerHttp();
       let puerto = this.obtenerPuerto();
       if(puerto=="80")
         return http +"/" + pagina;
       else
         return http + ":" + puerto + "/" +pagina;
     }

     setHttp(http:string)
     {
        localStorage.setItem("http",http);
     }

     setPuerto(puerto:string)
     {
        localStorage.setItem("puerto",puerto);
     }

     obtenerHttp()
     {
        let htpp=localStorage.getItem("http");
        if(htpp!=null)
            return htpp;
        else
            return "http://localhost/celularsires"
     }

     obtenerPuerto()
     { 
        let puerto= localStorage.getItem("puerto");
        if(puerto!=null)
            return puerto;
         else
            return "80";
            
     }
}