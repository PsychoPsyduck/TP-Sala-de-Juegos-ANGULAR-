import { Component, OnInit } from '@angular/core';

import { FirebaseService } from '../../servicios/firebase.service';
import { Jugador } from '../../clases/jugador';

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
