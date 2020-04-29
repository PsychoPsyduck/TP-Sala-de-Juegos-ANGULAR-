import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
  }

  Salir() {
    this.router.navigate(['/Login']);
  }

  Principal() {
    this.router.navigate(['/Principal']);
  }

  Quien() {
    this.router.navigate(['/QuienSoy']);
  }

  Juego(tipo: string) {
    switch (tipo) {
      case 'Juegos':
          this.router.navigate(['/Juegos']);
        break;
      case 'Listado':
          this.router.navigate(['/Listado']);
        break;
      case 'Configuracion':
          this.router.navigate(['/Configuracion']);
        break;
      case 'Jugadores':
          this.router.navigate(['/Jugadores']);
        break;
    }
  }

}
