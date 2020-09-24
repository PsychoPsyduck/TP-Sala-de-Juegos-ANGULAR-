import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription, BehaviorSubject} from "rxjs";

import { FirebaseService } from '../../servicios/firebase.service';
import { Jugador } from '../../clases/jugador';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

//import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private subscription: Subscription;
  mail = '';
  clave= '';
  progresoMensaje="esperando..."; 
  logeando=true;

  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;

  msjError: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public firebaseService: FirebaseService) {
      this.Tiempo=5; 
      this.ocultarVerificar=false;
    }

  ngOnInit() {

    this.form = this.fb.group({
      mail: ['', Validators.required],
      clave: ['', Validators.required]
    });

  }

  Entrar() {
    const { mail, clave } = this.form.value;
    if(mail != '' && clave != '') {
      this.ocultarVerificar=true;

      this.firebaseService.login(mail, clave)
      .then(res => {
        this.router.navigate(['/Principal']);
      })
      .catch(error => {
        this.logeando = true;
      });

      this.repetidor = setInterval(()=>{ 
        
        this.Tiempo--;
        if(this.Tiempo==0 ) {
          clearInterval(this.repetidor);
          this.ocultarVerificar=false;
          this.Tiempo=4;
            this.msjError = "Error al iniciar sesion. Verifique los datos";
        }
      }, 900);
    }
  }

  Invitado() {
    this.form.setValue({
      mail: "invitado@mail.com",
      clave: "invitado"
    });
  }
  
}
