import { Component, OnInit } from '@angular/core';
import { JuegoAnagrama } from '../../clases/juego-anagrama'

@Component({
  selector: 'app-anagrama',
  templateUrl: './anagrama.component.html',
  styleUrls: ['./anagrama.component.css']
})
export class AnagramaComponent implements OnInit {

  palabras = [
    [//Transformers
      { letraElegida: '', letraCorrecta: 'T' },
      { letraElegida: '', letraCorrecta: 'R' },
      { letraElegida: '', letraCorrecta: 'A' },
      { letraElegida: '', letraCorrecta: 'N' },
      { letraElegida: '', letraCorrecta: 'S' },
      { letraElegida: '', letraCorrecta: 'F' },
      { letraElegida: '', letraCorrecta: 'O' },
      { letraElegida: '', letraCorrecta: 'R' },
      { letraElegida: '', letraCorrecta: 'M' },
      { letraElegida: '', letraCorrecta: 'E' },
      { letraElegida: '', letraCorrecta: 'R' },
      { letraElegida: '', letraCorrecta: 'S' }
    ],
    [//Avengers
      { letraElegida: '', letraCorrecta: 'A' },
      { letraElegida: '', letraCorrecta: 'V' },
      { letraElegida: '', letraCorrecta: 'E' },
      { letraElegida: '', letraCorrecta: 'N' },
      { letraElegida: '', letraCorrecta: 'G' },
      { letraElegida: '', letraCorrecta: 'E' },
      { letraElegida: '', letraCorrecta: 'R' },
      { letraElegida: '', letraCorrecta: 'S' }
    ],
    [//Joker
      { letraElegida: '', letraCorrecta: 'J' },
      { letraElegida: '', letraCorrecta: 'O' },
      { letraElegida: '', letraCorrecta: 'K' },
      { letraElegida: '', letraCorrecta: 'E' },
      { letraElegida: '', letraCorrecta: 'R' }
    ],
    [//Jumanji
      { letraElegida: '', letraCorrecta: 'J' },
      { letraElegida: '', letraCorrecta: 'U' },
      { letraElegida: '', letraCorrecta: 'M' },
      { letraElegida: '', letraCorrecta: 'A' },
      { letraElegida: '', letraCorrecta: 'N' },
      { letraElegida: '', letraCorrecta: 'J' },
      { letraElegida: '', letraCorrecta: 'I' }
    ],
    [//Parasite
      { letraElegida: '', letraCorrecta: 'P' },
      { letraElegida: '', letraCorrecta: 'A' },
      { letraElegida: '', letraCorrecta: 'R' },
      { letraElegida: '', letraCorrecta: 'A' },
      { letraElegida: '', letraCorrecta: 'S' },
      { letraElegida: '', letraCorrecta: 'I' },
      { letraElegida: '', letraCorrecta: 'T' },
      { letraElegida: '', letraCorrecta: 'E' }
    ],
    [//Interestelar
      { letraElegida: '', letraCorrecta: 'I' },
      { letraElegida: '', letraCorrecta: 'N' },
      { letraElegida: '', letraCorrecta: 'T' },
      { letraElegida: '', letraCorrecta: 'E' },
      { letraElegida: '', letraCorrecta: 'R' },
      { letraElegida: '', letraCorrecta: 'E' },
      { letraElegida: '', letraCorrecta: 'S' },
      { letraElegida: '', letraCorrecta: 'T' },
      { letraElegida: '', letraCorrecta: 'E' },
      { letraElegida: '', letraCorrecta: 'L' },
      { letraElegida: '', letraCorrecta: 'A' },
      { letraElegida: '', letraCorrecta: 'R' }
    ],
    [//Rocketman
      { letraElegida: '', letraCorrecta: 'R' },
      { letraElegida: '', letraCorrecta: 'O' },
      { letraElegida: '', letraCorrecta: 'C' },
      { letraElegida: '', letraCorrecta: 'K' },
      { letraElegida: '', letraCorrecta: 'E' },
      { letraElegida: '', letraCorrecta: 'T' },
      { letraElegida: '', letraCorrecta: 'M' },
      { letraElegida: '', letraCorrecta: 'A' },
      { letraElegida: '', letraCorrecta: 'N' }

    ],
    [//Malefica
      { letraElegida: '', letraCorrecta: 'M' },
      { letraElegida: '', letraCorrecta: 'A' },
      { letraElegida: '', letraCorrecta: 'L' },
      { letraElegida: '', letraCorrecta: 'E' },
      { letraElegida: '', letraCorrecta: 'F' },
      { letraElegida: '', letraCorrecta: 'I' },
      { letraElegida: '', letraCorrecta: 'C' },
      { letraElegida: '', letraCorrecta: 'A' }
    ],
    [//Tarzan
      { letraElegida: '', letraCorrecta: 'T' },
      { letraElegida: '', letraCorrecta: 'A' },
      { letraElegida: '', letraCorrecta: 'R' },
      { letraElegida: '', letraCorrecta: 'Z' },
      { letraElegida: '', letraCorrecta: 'A' },
      { letraElegida: '', letraCorrecta: 'N' }
    ],
    [//Deadpool
      { letraElegida: '', letraCorrecta: 'D' },
      { letraElegida: '', letraCorrecta: 'E' },
      { letraElegida: '', letraCorrecta: 'A' },
      { letraElegida: '', letraCorrecta: 'D' },
      { letraElegida: '', letraCorrecta: 'P' },
      { letraElegida: '', letraCorrecta: 'O' },
      { letraElegida: '', letraCorrecta: 'O' },
      { letraElegida: '', letraCorrecta: 'L' }
    ]
  ];

  palabra = [];
  nivel = 0;

  letras = [];
  alert = { message: '', type: '', action: '' };
  palabraUsuario = "";
  showAlert = false;
  ocultarVerificar: boolean;
  Tiempo: number;
  repetidor:any;
  resultado: number;

  constructor(){ //private firebaseService: FirebaseServiceService) { 

    this.Tiempo=3; 
    this.ocultarVerificar=false;
    this.resultado = 0;
    console.log(this.resultado);
  }

  //desordena a this.palabra
  desordenarPalabra() {

    do {
      this.letras = this.palabra
        .map(function (item) { return item.letraCorrecta })
        .sort(function () { return Math.random() - 0.5 });

    } while (this.tieneMismoOrden())

  }

  desordenarArray() {
    this.palabras = this.palabras
      .map(function (item) { return item })
      .sort(function () { return Math.random() - 0.5 });
  }

  //true si this.letras es como this.palabra con las letras correctas
  tieneMismoOrden() {

    for (let index = 0; index < this.letras.length; index++) {

      this.palabra[index].letraElegida = this.letras[index];

    }
    let gana = this.gana();
    this.palabra.forEach(item => {
      item.letraElegida = '';
    });
    return gana;
  }


  ngOnInit() {
    this.resultado = 0;
    this.palabraUsuario = "";
    this.desordenarArray();
    this.palabra = this.palabras[0];
    this.desordenarPalabra();
  }

  //true si gano
  gana() {
    return !this.palabra.some(function (item) {
      return item.letraCorrecta != item.letraElegida;
    });

  }

  jugar() {
    this.ocultarVerificar=true;
    this.repetidor = setInterval(()=>{ 
      
      this.Tiempo--;
      console.log("llego", this.Tiempo);
      if(this.Tiempo==0 ) {
        clearInterval(this.repetidor);
        this.validarJugada();
        this.ocultarVerificar=false;
        console.log(this.ocultarVerificar);
        this.Tiempo=3;
      }
    }, 900);
  }

  validarJugada() {    
    if(this.palabraUsuario.length == this.palabra.length) {
      for (let i = 0; i < this.palabra.length; i++) {
        if (this.palabraUsuario[i].toUpperCase() != this.palabra[i].letraCorrecta) {
          console.log("INGRESE: " + this.palabraUsuario[i]);
          console.log("ERA: " + this.palabra[i].letraCorrecta);
          this.resultado = 4;
          console.log("MAL");
          break;
        }
        else {
          this.resultado = 1;
          console.log("BIEN");
        }
      }
    }
    else if (this.palabraUsuario.length == 0 ) {
      console.log("VACIO");
      this.resultado = 0;
    } else if (this.palabraUsuario.length < this.palabra.length ) {
      this.resultado = 2;
      console.log("FALTA");
    } else {
      this.resultado = 3;
      console.log("SOBRA");
    }
  }
  
  elegirLetra(letra, checked) {

    for (let index = 0; index < this.palabra.length; index++) {
      if (checked && this.palabra[index].letraElegida == '') {
        this.palabra[index].letraElegida = letra;
        break;
      }
      else if (!checked && this.palabra[index].letraElegida == letra) {
        this.palabra[index].letraElegida = '';
        break;
      }
    }

    if (this.gana()) {
      this.alert.message = 'Bien hecho!';
      this.alert.type = 'success';
      this.alert.action = 'continuar';
     // this.firebaseService.saveResult('ANAGRAMA', true);
    }
    else if (!this.palabra.some(function (item) {
      return item.letraElegida == '';
    })) {
      this.alert.message = 'Intentalo de nuevo';
      this.alert.type = 'danger';
      this.alert.action = 'reintentar';
    //  this.firebaseService.saveResult('ANAGRAMA', false);

    }

  }

  continue() {
    this.showAlert = false;
    if (this.alert.action == 'continuar') {
      //siguiente palabra
      this.nivel++;
      this.palabra = this.palabras[this.nivel];
      this.desordenarPalabra();
    }


  }

}
