import { Component, OnInit } from '@angular/core';
import { TarjetaComponent } from './tarjeta/tarjeta.component';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private router: Router) { }

  grilla = [[]];
  elementos = [    
      { iconSrc: 'memo1', seleccionada: false },
      { iconSrc: 'memo2', seleccionada: false },
      { iconSrc: 'memo3', seleccionada: false },  
      { iconSrc: 'memo4', seleccionada: false },
      { iconSrc: 'memo5', seleccionada: false },
      { iconSrc: 'memo6', seleccionada: false },   
      { iconSrc: 'memo7', seleccionada: false },   
      { iconSrc: 'memo8', seleccionada: false },   
      { iconSrc: 'memo9', seleccionada: false },
      { iconSrc: 'memo10', seleccionada: false },
      { iconSrc: 'memo1', seleccionada: false },
      { iconSrc: 'memo2', seleccionada: false },
      { iconSrc: 'memo3', seleccionada: false },
      { iconSrc: 'memo4', seleccionada: false },    
      { iconSrc: 'memo5', seleccionada: false },    
      { iconSrc: 'memo6', seleccionada: false },
      { iconSrc: 'memo7', seleccionada: false },    
      { iconSrc: 'memo8', seleccionada: false },   
      { iconSrc: 'memo9', seleccionada: false },   
      { iconSrc: 'memo10', seleccionada: false }    
  ];
  pares = [];
  jugadas: number;
  winner: boolean;


  //constructor(private firebaseService: FirebaseServiceService) { }

  ngOnInit() {
    this.iniciarGrilla();
  }

  newGame(){
    this.limpiarTablero();
    this.iniciarGrilla();
  }

  iniciarGrilla() {
    this.elementos = this.elementos.sort(function () { 
      return Math.random() - 0.5 
    });
    //inserto elementos
    let count = 0;
    for (let i = 0; i < 4; i++) { 
      this.grilla[i] = [];
        for (let j = 0; j < 5; j++) {
          this.grilla[i][j] = this.elementos[count];
          count++;
        }        
    } 
    this.winner = false;
    this.jugadas = 0;
  }

  limpiarTablero() {
    this.elementos.forEach(element => {
      element.seleccionada =  false;
      
    });
  }

  elegirCelda(celda) {
    if (celda.seleccionada)
      return;

    celda.seleccionada = true;

    if (this.pares.length < 2){
      this.pares.push(celda);
    }

    if (this.pares.length == 2) {
      //pregunto si acerto
      var pares = this.pares;
      this.pares = [];
      if (pares[0].iconSrc != pares[1].iconSrc) {
        setTimeout(function () {
          pares[0].seleccionada = false;
          pares[1].seleccionada = false;
          pares = [];
        }, 1000);

      }
      
      this.jugadas++;

      //gano?
      for (let index = 0; index < this.grilla.length; index++) {

        if (this.grilla[index].some(function (x) {
          return !x.seleccionada;
        })) {
          return;
        }
      }
      this.winner = true;
      
      //this.firebaseService.saveResult('MEMOTEST', true);
    }
  }

}