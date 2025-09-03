export class BaseMensaje
{
    constructor(public telefono:string,public mensaje:string)
    {
        this.telefono="54" + this.telefono;
        this.mensaje=this.mensaje.replace(" ","%20");
    }
}