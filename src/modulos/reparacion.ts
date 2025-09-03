
import { Cliente } from "./cliente";
import { Equipo } from "./equipo";

export class Reparacion
{ 
    public fechaRealizadaFormateada:string="";
    public fechaEntregadaFormateada:string="";
    public fechaEntradaFormateada:string="";
    
    constructor(public id:number,public codigo:string,public fechaEntrada:Date,public estado:string,public accesorios:string,
        public falla:string,public observaciones:string,public informeInterno:string,
        public retiradoPor:string="", public senia:number=0,public informe:string,
        public reparadoPor:string="",public entregadoPor:string="",public tomadoPor:string,
        public costo:number=0,public fechaRealizada:Date=null,public fechaEntregada:Date=null ,public cliente:Cliente,public equipo:Equipo)
        {

        }
        
     public equipoCorto(): String
     {
        if(this.equipo!=null)
            return this.equipo.tipo +", Marca: " + this.equipo.marca + ", Modelo: " + this.equipo.modelo;
        else 
            return "Sin descripción de equipo";
     }
}