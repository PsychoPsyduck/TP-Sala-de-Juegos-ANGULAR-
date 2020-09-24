import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-adivina-frase',
  templateUrl: './adivina-frase.component.html',
  styleUrls: ['./adivina-frase.component.css']
})
export class AdivinaFraseComponent implements OnInit {

  listadoDeFrases = [
    { 'frase': 'Hasta la vista, baby', 'pelicula': 'Terminator', 'opciones': ['Robocop', 'Terminator', 'Rambo'] },
    { 'frase': 'Que la fuerza te acompañe', 'pelicula': 'Star Wars', 'opciones': ['Star Trek', 'Starship Troopers', 'Star Wars'] },
    { 'frase': 'Acaso eres gallina Mcfly?', 'pelicula': 'Volver al Futuro', 'opciones': ['Pulp Fiction', 'Volver al Futuro', 'Bastardos sin Gloria'] },
    { 'frase': 'Le hare una oferta que no podra rechazar', 'pelicula': 'El Padrino', 'opciones': ['Los Soprano', 'El Padrino', 'Pulp Fiction'] },
    { 'frase': 'Feliz Navidad, inmundo animal', 'pelicula': 'Mi Pobre Angelito', 'opciones': ['Mi Pobre Angelito', 'El Padrino', 'Bastardos sin Gloria'] },
    { 'frase': 'Houston, tenemos un problema', 'pelicula': 'Apollo 13', 'opciones': ['Starship Troopers', 'Star Trek', 'Apollo 13'] },
    { 'frase': 'Elemental, mi querido Watson', 'pelicula': 'Sherlock Holmes', 'opciones': ['Volver al Futuro', 'Sherlock Holmes', 'Mi Pobre Angelito'] }
  ];

  repetidor: any;
  tiempo: number;
  respuesta: string;
  fraseRandom: any = {};
  respondiendo = false;
  ganador = false;
  perdedor = false;
  contador: number;
  termina = false;
  sinTiempo = false;
  checkTime = false;
  terminado = false;

  constructor(public firebaseService: FirebaseService) {}

  ngOnInit() {
  }

  juegoNuevo() {
    this.respondiendo = true;
    this.perdedor = false;
    this.termina = false;
    this.ganador = false;
    this.checkTime = false;
    this.terminado = false;
    this.fraseRandom = this.listadoDeFrases[Math.floor(Math.random() * this.listadoDeFrases.length)];
    this.respuesta = this.fraseRandom.pelicula;
    this.tiempo = Math.floor((this.fraseRandom.frase.length) / 2);
    this.repetidor = setInterval(() => {
      this.tiempo--;
      if (this.tiempo <= 0 ) {
        clearInterval(this.repetidor);
        this.terminar();
        this.sinTiempo = true;
        this.check();
      }
      }, 900);
  }

  responder(guess: string) {
    this.contador++;
    this.tiempo = 0;
    this.respondiendo = false;
    if (this.respuesta.toLowerCase() == guess.toLowerCase()) {
      this.ganador = true;
      this.perdedor = false;
      this.firebaseService.saveResult('Frase', true);
    } else {
        this.perdedor = true;
        this.firebaseService.saveResult('Frase', false);
    }
  }


  terminar() {
    this.respondiendo = false;
    this.termina = true;
    this.terminado = true;
    this.tiempo = 0;
  }


  check() {
    if(this.sinTiempo && !this.ganador && !this.perdedor) {
      this.checkTime = true;
      this.firebaseService.saveResult('Frase', false);
    }
  }
}
