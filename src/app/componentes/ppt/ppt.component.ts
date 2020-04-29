import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PPTComponent implements OnInit {
  scores = [];
  weapons = [
    'rock',
    'paper',
    'scissors',
    'lizard',
    'spock'
  ];
  playerSelected = -1;
  loading= false;
  isResultShow = false;
  
  // theResult -  0 gana
  //              1 pierde
  //              2 empate
  theResult = 0 
  enemySelected  = -1;

  constructor() { }

  ngOnInit() {
    this.newGame();
  }

  newGame() {
    this.scores=[ 0, 0]
  }

  pick( weapon: number): void {
    // return immediately when still loading. You don't want
    // the user to spam the button.
    if(this.loading) return;
    this.loading = true;
    this.playerSelected = weapon;
   
   //create a delay to simulate enemy's turn.
    setTimeout( () => {
      this.loading = false;
      // generate a number from 0 -2 
      const randomNum =  Math.floor(Math.random() * 5 ) ;
      this.enemySelected = randomNum;
      this.checkResult();
      this.isResultShow = true;
    },  Math.floor(Math.random()  * 500 ) +200);
  }

  checkResult(): void {
    const playerPick = this.playerSelected;
    const enemyPick = this.enemySelected;
    
    if(playerPick == enemyPick)
    {
      this.theResult = 2; //empate
    }
    else {
      switch (playerPick) {
        case 0: //Piedra
          if(enemyPick == 3 || enemyPick == 2) {
            this.theResult = 0; //gano
            this.scores[0] = this.scores[0]+1;
          }
          else {
            this.theResult = 1; //perdio
            this.scores[1] = this.scores[1]+1;
          }
          break; //Papel
        case 1:
          if(enemyPick == 0 || enemyPick == 4) {
            this.theResult = 0; //gano
            this.scores[0] = this.scores[0]+1;
          }
          else {
            this.theResult = 1; //perdio
            this.scores[1] = this.scores[1]+1;
          }
          break;
        case 2: //Tijera
          if(enemyPick == 1 || enemyPick == 3) {
            this.theResult = 0; //gano
            this.scores[0] = this.scores[0]+1;
          }
          else {
            this.theResult = 1; //perdio
            this.scores[1] = this.scores[1]+1;
          }
          break;
        case 3: //Lizard
          if(enemyPick == 1 || enemyPick == 4) {
            this.theResult = 0; //gano
            this.scores[0] = this.scores[0]+1;
          }
          else {
            this.theResult = 1; //perdio
            this.scores[1] = this.scores[1]+1;
          }
          break;
        case 4: //Spock
          if(enemyPick == 0 || enemyPick == 2) {
            this.theResult = 0; //gano
            this.scores[0] = this.scores[0]+1;
          }
          else {
            this.theResult = 1; //perdio
            this.scores[1] = this.scores[1]+1;
          }
          break;
      }
    }
    

    // if( playerPick ==  enemyPick)
    // {
    //   this.theResult = 2;
    // }
    // else if ( (playerPick - enemyPick + 5)% 5 == 1) {
    //    this.theResult = 0;
    //    this.scores[0] = this.scores[0]+1;
    // }
    // else{
    //   this.theResult = 1;
    //   this.scores[1] = this.scores[1]+1;
    // }
  }

}
