export class Incidente {
  constructor(
    public categoria: string,
    public descripcion: string,
    public idUser: string,
    public latitud: number,
    public longitud: number,
    public image: string,
    public estado: number,
    public fechaRegistro: any,
    public id?: string,
  ) { }

}
