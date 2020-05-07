import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(
    public firebaseService: FirebaseService) { }

  ngOnInit() {
  }

  Salir() {
    this.firebaseService.logoutJugador();
  }
}
