import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FacadeService } from 'src/app/services/facade.service';
import { Location } from '@angular/common';
import { TrabajadoresService } from 'src/app/services/trabajadores.service';

@Component({
  selector: 'app-registro-trabajadores',
  templateUrl: './registro-trabajadores.component.html',
  styleUrls: ['./registro-trabajadores.component.scss']
})
export class RegistroTrabajadoresComponent implements OnInit {
  @Input() rol: string = "";
  @Input() datos_user: any = {};

  public trabajador:any = {};
  public errors:any = {};
  public editar:boolean = false;
  public token: string = "";
  public idUser: Number = 0;

  //Para contraseñas
  public hide_1: boolean = false;
  public hide_2: boolean = false;
  public inputType_1: string = 'password';
  public inputType_2: string = 'password';
  ano = new Date().getFullYear();
  dia = new Date().getDate();
  mes = new Date().getMonth();

  minDate: Date = new Date(this.ano-90, 1, 1);
  maxDate: Date = new Date(this.ano, this.mes, this.dia);

  public bibliotecas: any[] = [
    {value: '1', viewValue: '2 de Octubre de 1968 "Ernesto Che Guevara"'},
    {value: '2', viewValue: 'Acajete - Complejo Regional Centro'},
    {value: '3', viewValue: 'Carlos Fonseca Amador'},
    {value: '4', viewValue: 'Simón Bolívar'},
    {value: '5', viewValue: 'Bachillerato Internacional 5 de Mayo'},
    {value: '6', viewValue: 'Biblioteca Central Universitaria'},
    {value: '7', viewValue: 'Claude Bernard'},
    {value: '8', viewValue: 'Casa del Jubilado'},
    {value: '9', viewValue: 'Centro de Aprendizaje Facultad de Derecho y Ciencias Sociales'},
    {value: '10', viewValue: 'Centro de Investigaciones en Ciencias Microbiológicas- ICUAP'},
    {value: '11', viewValue: 'Centro de Investigación en Dispositivos Semiconductores - ICUAP'},
    {value: '12', viewValue: 'Dieter Nohlen'},
    {value: '13', viewValue: 'Nicolás Copérnico'},
    {value: '14', viewValue: 'José Revueltas'},
    {value: '15', viewValue: 'Ciudad Serdán - Complejo Regional Centro'},
    {value: '16', viewValue: 'Manlio Flavio Barbosa Cano'},
    {value: '17', viewValue: 'Campus Acatzingo - Complejo Regional Centro'},
    {value: '18', viewValue: 'San José Chiapa - Complejo Regional Centro'},
    {value: '19', viewValue: 'Campus Atlixco - Complejo Regional Mixteca'},
    {value: '20', viewValue: 'Campus Chiautla de Tapia (Nivel superior y medio superior) - Complejo Regional Mixteca'},
    {value: '21', viewValue: 'Campus Izúcar de Matamoros (Nivel superior y medio superior) - Complejo Regional Mixteca'},
    {value: '22', viewValue: 'Campus Cuetzalan (Nivel superior y medio superior) - Complejo Regional Nororiental'},
    {value: '23', viewValue: 'Campus Libres - Complejo Regional Nororiental'},
    {value: '24', viewValue: 'Campus Teziutlán - Complejo Regional Nororiental '},
    {value: '25', viewValue: 'Campus Zacapoaxtla - Complejo Regional Nororiental'},
    {value: '26', viewValue: 'Campus Chignahuapan - Complejo Regional Norte'},
    {value: '27', viewValue: 'Campus Huauchinango - Complejo Regional Norte'},
    {value: '28', viewValue: 'Campus Tetela de Ocampo - Complejo Regional Norte'},
    {value: '29', viewValue: 'Campus Tehuacán - Complejo Regional Sur'},
    {value: '30', viewValue: 'Círculo Infantil'},
    {value: '31', viewValue: 'Ecocampus Universitario Valsequillo Juan Rulfo - Emiliano Zapata'},
    {value: '32', viewValue: 'Víctor Manuel Medina'},
    {value: '33', viewValue: 'Netzahualcóyotl - Facultad de Ciencias Agrícolas y Pecuarias'},
    {value: '34', viewValue: 'Jorge Espinosa Moro - Facultad de Medicina Veterinaria y Zootecnia'},
    {value: '35', viewValue: 'Facultad Arquitectura'},
    {value: '36', viewValue: 'Alejandro Reyes Cristiani - Facultad Ciencias de la Computación'},
    {value: '37', viewValue: 'Centro de Documentación Especializado "Abraham Nosnik Ostrowiak" - Facultad Ciencias de la Comunicación'},
    {value: '38', viewValue: 'Centro de información Especializada Lic. Alfonso Vélez López - Facultad Contaduría Pública'},
    {value: '39', viewValue: 'Facultad Arquitectura'},
    {value: '40', viewValue: 'Facultad Cultura Física'},
    {value: '41', viewValue: 'Facultad de Administración'},
    {value: '42', viewValue: 'Macuilxóchitl'},
    {value: '43', viewValue: 'Francisco Manuel Martínez y Galnares'},
    {value: '44', viewValue: 'Facultad de Ciencias Biológicas'},
    {value: '45', viewValue: 'Facultad de Economía'},
    {value: '46', viewValue: 'Victoria Stoianowski'},
    {value: '47', viewValue: 'Ing. Luis Rivera Terrazas'},
    {value: '48', viewValue: 'Fondo Documental "Graciela Hierro"'},
    {value: '49', viewValue: 'Carlos Cambero Vizcaíno'},
    {value: '50', viewValue: 'Escuela de Ingeniería Agrónomo Zootecnista'},
    {value: '51', viewValue: 'Ernesto de la Torre Villar Santiago Ramón y Cajal'},
    {value: '52', viewValue: 'José María Lafragua'},
    {value: '53', viewValue: 'Lázaro Cárdenas'},
    {value: '54', viewValue: 'Preparatoria Libres - Complejo Nororiental'},
    {value: '55', viewValue: 'Preparatoria Tlatlauquitepec'},
    {value: '56', viewValue: 'José Joaquín Izquierdo'},
    {value: '57', viewValue: 'San Martín Texmelucan'},
    {value: '58', viewValue: 'San Salvador el Seco'},
    {value: '59', viewValue: 'Enrique Cabrera Barroso'},
    {value: '60', viewValue: 'Tepeaca - Complejo Regional Centro'},
    {value: '61', viewValue: 'Centro Universitario de la Salud Teziutlán - Complejo Regional Nororiental'},
    {value: '62', viewValue: 'Unidad de Aprendizaje y Recursos de Información'},
    {value: '63', viewValue: 'Campus Zacatlán - Complejo Regional Norte'},
    {value: '64', viewValue: 'Elvia Carrillo Puerto'},
    {value: '65', viewValue: 'Bachillerato Tecnológico Agropecuario de Ixtepex'},
    {value: '66', viewValue: 'Preparatoria Regional Venustiano Carranza'},
    {value: '67', viewValue: ' Preparatoria Regional Tlacotepec de Benito Juárez'},
    {value: '68', viewValue: 'Infantil'},
    {value: '69', viewValue: 'Harold McIntosh'},
    {value: '70', viewValue: 'CU2'},
    {value: '71', viewValue: 'Los Reyes de Juárez'},
  ];

  constructor(
    private location: Location,
    public activatedRoute: ActivatedRoute,
    private trabajadoresService: TrabajadoresService,
    private facadeService: FacadeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //El primer if valida si existe un parámetro en la URL
    if(this.activatedRoute.snapshot.params['id'] != undefined){
      this.editar = true;
      //Asignamos a nuestra variable global el valor del ID que viene por la URL
      this.idUser = this.activatedRoute.snapshot.params['id'];

      //Al iniciar la vista asignamos los datos del user
      this.trabajador = this.datos_user;
    }else{
      this.trabajador = this.trabajadoresService.esquemaTrabajador();
      this.trabajador.rol = "trabajador";
      this.token = this.facadeService.getSessionToken();
    }


  }

  public regresar(){
    this.location.back();
  }

  //Funciones para password
  public showPassword()
  {
    if(this.inputType_1 == 'password'){
      this.inputType_1 = 'text';
      this.hide_1 = true;
    }
    else{
      this.inputType_1 = 'password';
      this.hide_1 = false;
    }
  }

  public showPwdConfirmar()
  {
    if(this.inputType_2 == 'password'){
      this.inputType_2 = 'text';
      this.hide_2 = true;
    }
    else{
      this.inputType_2 = 'password';
      this.hide_2 = false;
    }
  }

  public registrar(){
    this.errors = {};
    this.errors = this.trabajadoresService.validarTrabajador(this.trabajador, this.editar);
    console.log(this.trabajador);
    if(Object.keys(this.errors).length > 0){
      return false;
    }
    // Validar si las contraseñas coinciden

    if(this.trabajador.password != this.trabajador.confirmar_password){
      alert('Las contraseñas no coinciden');
      return false;
    }

    // Consumir servicio para registrar administradores
    this.trabajadoresService.registrarTrabajador(this.trabajador).subscribe({
      next: (response:any) => {
        //Aquí va la ejecución del servicio si todo es correcto
        alert('Administrador registrado con éxito');

        //Validar si se registro que entonces navegue a la lista de administradores
        if(this.token  && this.token !== ""){
          this.router.navigate(["administradores"]);
        }else{
          this.router.navigate(['/']);
        }
      },
      error: (error:any) => {
        if(error.status === 422){
          this.errors = error.error.errors;
        } else {
          alert('Error al registrar el administrador');
        }
      }
    });
  }

  public actualizar(){
    // Validación de los datos
    this.errors = {};
    this.errors = this.trabajadoresService.validarTrabajador(this.trabajador, this.editar);
    if(Object.keys(this.errors).length > 0){
      return false;
    }
    // Ejecutamos el servicio de actualización
    this.trabajadoresService.actualizarTrabajador(this.trabajador).subscribe(
      (response) => {
        // Redirigir o mostrar mensaje de éxito
        alert("Administrador actualizado exitosamente");

        this.router.navigate(["administrador"]);
      },
      (error) => {
        // Manejar errores de la API
        alert("Error al actualizar administrador");
        console.error("Error al actualizar administrador: ", error);
      }
    );

  }


  // Función para los campos solo de datos alfabeticos
  public soloLetras(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }

  // Función para los campos solo de datos alfabeticos
  public soloLetrasNumeros(event: KeyboardEvent) {
    const charCode = event.key.charCodeAt(0);
    // Permitir solo letras (mayúsculas y minúsculas) y espacio
    if (
      !(charCode >= 65 && charCode <= 90) &&  // Letras mayúsculas
      !(charCode >= 97 && charCode <= 122) && // Letras minúsculas
      !(charCode >= 48 && charCode <= 57) && // Números
      charCode !== 32                         // Espacio
    ) {
      event.preventDefault();
    }
  }
  public changeFecha(event: any){
    console.log(event.value);
    this.trabajador.fecha_nacimiento = event.value.toISOString().split("T")[0];
  }

}

