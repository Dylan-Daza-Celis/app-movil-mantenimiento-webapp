import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacadeService } from './facade.service';
import { ErrorsService } from './tools/errors.service';
import { ValidatorService } from './tools/validator.service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TrabajadoresService {

  constructor(
    private http: HttpClient,
    private validatorService: ValidatorService,
    private errorService: ErrorsService,
    private facadeService: FacadeService
  ) { }

  public esquemaTrabajador() {
    return {
      'rol': '',
      'id_trabajador': '',
      'first_name': '',
      'last_name': '',
      'email': '',
      'password': '',
      'confirmar_password': '',
      'telefono': '',
      'edad': '',
      'biblioteca': '',
      'departamento': '',
      'fecha_nacimiento': '',
    }
  }

  //Validación para el formulario
  public validarTrabajador(data: any, editar: boolean) {
    let error: any = {};
    //Validaciones
    if (!this.validatorService.required(data["id_trabajador"])) {
      error["id_trabajador"] = this.errorService.required;
    }else if (!this.validatorService.min(data["id_trabajador"], 9)) {
      error["id_trabajador"] = this.errorService.min(9);
      alert("La longitud de del id es menor, deben ser 9");
    } else if (!this.validatorService.max(data["id_trabajador"], 9)) {
      error["id_trabajador"] = this.errorService.max(9);
      alert("La longitud de caracteres del id es mayor, deben ser 9");
    }

    if (!this.validatorService.required(data["first_name"])) {
      error["first_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["last_name"])) {
      error["last_name"] = this.errorService.required;
    }

    if (!this.validatorService.required(data["email"])) {
      error["email"] = this.errorService.required;
    } else if (!this.validatorService.max(data["email"], 40)) {
      error["email"] = this.errorService.max(40);
    } else if (!this.validatorService.email(data['email'])) {
      error['email'] = this.errorService.email;
    }

    if (!editar) {
      if (!this.validatorService.required(data["password"])) {
        error["password"] = this.errorService.required;
      }

      if (!this.validatorService.required(data["confirmar_password"])) {
        error["confirmar_password"] = this.errorService.required;
      }
    }

    if (!this.validatorService.required(data["edad"])) {
      error["edad"] = this.errorService.required;
    } else if (!this.validatorService.numeric(data["edad"])) {
      alert("El formato es solo números");
    } else if (data["edad"] < 18) {
      error["edad"] = "La edad debe ser mayor o igual a 18 años";
    }

    if(!this.validatorService.required(data["telefono"])){
      error["telefono"] = this.errorService.required;
    }
    if(!this.validatorService.required(data["biblioteca"])){
      error["biblioteca"] = this.errorService.required;
    }
    if(!this.validatorService.required(data["departamento"])){
      error["departamento"] = this.errorService.required;
    }
    if(!this.validatorService.required(data["fecha_nacimiento"])){
      error["fecha_nacimiento"] = this.errorService.required;
    }

    //Return arreglo
    return error;
  }

  //Aquí van los servicios HTTP
  //Servicio para registrar un nuevo usuario
  public registrarTrabajador (data: any): Observable <any>{
    const token = this.facadeService.getSessionToken();
      let headers: HttpHeaders;

      if(token){
        headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
        });
      } else {
        headers = new HttpHeaders({
          'Content-Type': 'application/json'
        });
      }
    return this.http.post<any>(`${environment.url_api}/trabajador/`,data, {headers});
  }

  // Petición para obtener la lista de trabajadores
  public obtenerListaTrabajadores(): Observable<any> {
    const token = this.facadeService.getSessionToken();
    let headers: HttpHeaders;
    if (token) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    }
    return this.http.get<any>(`${environment.url_api}/lista-trabajadores/`, { headers });
  }

  // Petición para obtener un administrador por su ID
  public obtenerUsuarioPorID(idTrabajador: number): Observable<any> {
    const token = this.facadeService.getSessionToken();
    let headers: HttpHeaders;
    if (token) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    }
    return this.http.get<any>(`${environment.url_api}/admin/?id=${idTrabajador}`, { headers });
  }

  // Petición para actualizar un administrador
  public actualizarTrabajador(data: any): Observable<any> {
    const token = this.facadeService.getSessionToken();
    let headers: HttpHeaders;
    if (token) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    }
    return this.http.put<any>(`${environment.url_api}/trabajador/`, data, { headers });
  }

  // Petición para eliminar un administrador
  public eliminarTrabajador(idTrabajador: number): Observable<any> {
    const token = this.facadeService.getSessionToken();
    let headers: HttpHeaders;
    if (token) {
      headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    } else {
      headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    }
    return this.http.delete<any>(`${environment.url_api}/trabajador/?id=${idTrabajador}`, { headers });
  }


}
