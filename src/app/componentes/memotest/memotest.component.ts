import { Component, OnInit } from '@angular/core';
import { TarjetaComponent } from './tarjeta/tarjeta.component';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {
  memoryArray: ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'] = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
  memoryValues: string [ ] ;
  memoryTarjetaIds: string [];
  jugadas: number;

  constructor() { }

  ngOnInit() {
    
    this.newGame();
  }

  shuffleArray() {
    var i = this.memoryArray.length;
    var j;
    var aux;

    while(--i > 0 ) {
      j = Math.floor(Math.random() * (i+1));
      aux = this.memoryArray[j];
      this.memoryArray[j] = this.memoryArray[i];
      this.memoryArray[i] = aux;
    }
  }

  newGame() {
    this.jugadas = 0;
    var output = '';
    this.shuffleArray();
    for(var i = 0; i < this.memoryArray.length; i++) {
      output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+this.memoryArray[i]+'\')"></div>';
    }
    document.getElementById('memoryBoard').innerHTML = output;
    
  }

  

  flip2Back(){
    // Flip the 2 tiles back over
    var tile_1 = document.getElementById(this.memoryTarjetaIds[0]);
    var tile_2 = document.getElementById(this.memoryTarjetaIds[1]);
    tile_1.style.background = 'blueviolet';
          tile_1.innerHTML = "";
    tile_2.style.background = 'green';
          tile_2.innerHTML = "";
    // Clear both arrays
    this.memoryValues = [];
    this.memoryTarjetaIds = [];
  }

  memoryFlipTile(tile,val){
    if(tile.innerHTML == "" && this.memoryValues.length < 2){
      tile.style.background = '#FFF';
      tile.innerHTML = val;
      if(this.memoryValues.length == 0){
        this.memoryValues.push(val);
        this.memoryTarjetaIds.push(tile.id);
      } else if(this.memoryValues.length == 1){
        this.memoryValues.push(val);
        this.memoryTarjetaIds.push(tile.id);
        if(this.memoryValues[0] == this.memoryValues[1]){
          this.jugadas += 2;
          // Clear both arrays
          this.memoryValues = [];
          this.memoryTarjetaIds = [];
          // Check to see if the whole board is cleared
          if(this.jugadas == this.memoryArray.length){
            alert("Board cleared... generating new board");
            document.getElementById('memoryBoard').innerHTML = "";
            this.newGame();
          }
        } else {
          this.flip2Back()
          setTimeout(this.flip2Back, 700);
        }
      }
    }
  }
}