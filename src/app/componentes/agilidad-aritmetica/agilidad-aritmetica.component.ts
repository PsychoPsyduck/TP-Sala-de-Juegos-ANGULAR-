import { Component, OnInit ,Input,Output,EventEmitter} from '@angular/core';
import { JuegoAgilidad } from '../../clases/juego-agilidad'

import {Subscription} from "rxjs";
//import {TimerObservable} from "rxjs/observable/TimerObservable";
@Component({
  selector: 'app-agilidad-aritmetica',
  templateUrl: './agilidad-aritmetica.component.html',
  styleUrls: ['./agilidad-aritmetica.component.css']
})
export class AgilidadAritmeticaComponent implements OnInit {
   @Output() 
  enviarJuego :EventEmitter<any>= new EventEmitter<any>();
  nuevoJuego : JuegoAgilidad;
  resultado: any;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  winner: boolean;
  looser: boolean;
  private subscription: Subscription;

  ngOnInit() {
  }

  constructor() {
    this.ocultarVerificar=true;
    this.Tiempo=10; 
    this.nuevoJuego = new JuegoAgilidad();
    console.info("Inicio agilidad");  
  }

  NuevoJuego() {
    this.winner = false;
    this.looser = false;
    this.ocultarVerificar=false;
    this.nuevoJuego.primerNumero = 0;
    this.nuevoJuego.operador = '';
    this.nuevoJuego.segundoNumero = 0;

    this.resultado = this.operar();
    console.log("1ero" + this.nuevoJuego.operador);

    this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.verificar();
        this.ocultarVerificar=true;
        this.Tiempo=10;
      }
    }, 900);
  };

  operar() {
    var retorno;
    
    var operacion = Math.floor(Math.random() * (5 - 1) + 1);
    console.log("llego operar");
    console.log("operador: " + operacion);
    switch (operacion) {
      case 1: //suma
        retorno = this.suma();
        break;
      case 2: //resta
        retorno = this.resta();
        break;
      case 3: //multiplicacion
        retorno = this.multiplicacion();
        break;
      case 4: //division
        retorno = this.division();
        break;
    }
    return retorno;
  }

  suma() {
    var num1 = Math.floor(Math.random() * (11 - 1) + 1);
    var num2 = Math.floor(Math.random() * (11 - 1) + 1);

    this.nuevoJuego.primerNumero = num1;
    this.nuevoJuego.operador = "+"
    this.nuevoJuego.segundoNumero = num2;

    var retorno = num1 + num2;

    return retorno;
  }
  resta() {
    var num1 = Math.floor(Math.random() * (11 - 1) + 1);
    var num2 = Math.floor(Math.random() * (11 - 1) + 1);

    var suma = num1 + num2;

    this.nuevoJuego.primerNumero = suma;
    this.nuevoJuego.operador = "-"
    this.nuevoJuego.segundoNumero = num1;

    var retorno = suma - num1;

    return retorno;
  }
  multiplicacion() {
    var num1 = Math.floor(Math.random() * (11 - 1) + 1);
    var num2 = Math.floor(Math.random() * (11 - 1) + 1);

    this.nuevoJuego.primerNumero = num1;
    this.nuevoJuego.operador = "*"
    this.nuevoJuego.segundoNumero = num2;

    var retorno = num1 * num2;

    return retorno;
  }
  division() {
    var divisor = Math.floor(Math.random() * (11 - 1) + 1);
    var aux = Math.floor(Math.random() * (11 - 1) + 1);
    var dividendo = 0;

    dividendo = aux * divisor;

    this.nuevoJuego.primerNumero = dividendo;
    this.nuevoJuego.operador = "/"
    this.nuevoJuego.segundoNumero = divisor;

    var retorno = (dividendo / divisor);

    console.log(divisor);
    console.log(dividendo);
    console.log(retorno);

    return retorno;
  }

  verificar()
  {
    console.log("numero1: " + this.nuevoJuego.primerNumero);
    console.log("operador: " + this.nuevoJuego.operador);
    console.log("numero2: " + this.nuevoJuego.segundoNumero);
    console.log("numero ingresado: " + this.nuevoJuego.numeroIngresado);
    console.log("resultado: " + this.resultado);
    if(this.nuevoJuego.numeroIngresado == this.resultado){
      this.winner = true;
      this.nuevoJuego.gano = true;
      console.log("ganador: " + this.winner);
    }
    else {
      this.looser = true;
    }
    this.ocultarVerificar=false;
    clearInterval(this.repetidor);   
  }  

}
