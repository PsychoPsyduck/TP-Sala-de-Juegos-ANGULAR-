import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
//para poder hacer las validaciones
//import { Validators, FormBuilder, FormControl, FormGroup} from '@angular/forms';

import { FirebaseService } from '../../servicios/firebase.service';
import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

 /* constructor( private miConstructor:FormBuilder) { }
  email=new FormControl('',[Validators.email]);
  formRegistro:FormGroup=this.miConstructor.group({
    usuario:this.email
  });*/
  
  nombre = '';
  apellido = '';
  mail = '';
  clave= '';
  repitaClave= '';
  terminosCondiciones: boolean;

  msjError: string;

  jugador: Jugador = new Jugador();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public firebaseService: FirebaseService) 
  { }

  ngOnInit() {
  }

  Volver() {
    this.router.navigate(['/Login']);
  }

  Registrar() {
    this.jugador.nombre = this.nombre;
    this.jugador.apellido = this.apellido;
    this.jugador.mail = this.mail;
    this.jugador.contraseña = this.clave;
    this.jugador.rol = "user";
    
    if (this.clave === this.repitaClave && this.terminosCondiciones == true) {
      this.firebaseService.register(this.jugador)
      .then(auth => {
        this.router.navigate(['/Login']);
      })
      .catch(err => {
        this.msjError = err;
      })
    }
  }
}
