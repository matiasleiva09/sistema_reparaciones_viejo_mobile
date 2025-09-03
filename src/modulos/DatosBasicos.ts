import { Usuario } from "./Usuario";
import { Reparacion } from "./reparacion";
import { Anotaciones } from "./anotaciones";

export class DatosBasicos
{
    reparacion:Reparacion=null;
    anotacion:Anotaciones=null;
    parametros=new Array();
    constructor(public usuario:Usuario,public token:string,public accion:string,public busqueda:string)
    {

    }
}