import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {Subscription, BehaviorSubject} from "rxjs";

import { FirebaseService } from '../../servicios/firebase.service';
import { Jugador } from '../../clases/jugador';

//import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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
    private route: ActivatedRoute,
    private router: Router,
    public firebaseService: FirebaseService) {
      this.Tiempo=5; 
      this.ocultarVerificar=false;
    }

  ngOnInit() {
  }

  Entrar() {
    
    this.ocultarVerificar=true;
    this.firebaseService.login(this.mail, this.clave)
    .then(res => {
      this.router.navigate(['/Principal']);
    })
    .catch(error => {
      this.logeando =true;
      this.msjError = "Los datos son incorrectos o no existe el usuario";
    });

    this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.ocultarVerificar=false;
        console.log(this.ocultarVerificar);
        this.Tiempo=5;
      }
    }, 900);
  }

  
  
}
