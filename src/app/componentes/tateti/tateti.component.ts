import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../servicios/firebase.service';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {
  cuadrados: any[];
  xIsNext: boolean;
  winner: string;



  constructor(private firebaseService: FirebaseService) { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.cuadrados = Array(9).fill(null);
    this.winner = null;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  makeMove(idx: number) {
    if(!this.cuadrados[idx]) {
      this.cuadrados.splice(idx, 1, this.player);
      this. xIsNext = !this.xIsNext;
    }

    this.winner = this.calculateWinner();
    if(this.winner == "X") {
      this.firebaseService.saveResult('Tateti', true);
    } else if (this.winner == "O") {
      this.firebaseService.saveResult('Tateti', false);
    }
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [7, 8, 9],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if(
        this.cuadrados[a] &&
        this.cuadrados[a] === this.cuadrados[b] &&
        this.cuadrados[a] === this.cuadrados[c]
      ) {
        return this.cuadrados[a];
      }
    }
    return null
  }
}
