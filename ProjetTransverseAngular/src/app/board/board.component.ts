import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { Output, EventEmitter } from '@angular/core';
import {HostListener} from '@angular/core';

import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {

  @Output() nextLevelInStyle : EventEmitter<number> = new EventEmitter<number>();

  @Output() goToMenuMessage : EventEmitter<number> = new EventEmitter<number>();

  squaresTab: any[];
  nbrCases: number;
  levelData : any;
  actualLevel: number;
  level: string[];
  startGame: number;
  posPlayer: number;
  onMoving: number;


  constructor(private httpClient: HttpClient){



    this.squaresTab = Array(0).fill(null);
    this.nbrCases = 0;
    this.actualLevel = 1;
    this.level = Array(0);
    this.startGame = 1;
    this.posPlayer = 0;
    this.onMoving = 0;
  }

  ngOnInit(): void {
    this.httpClient.get("http://localhost:3000/allLevel", { responseType: 'text' }).subscribe(res => {this.levelData = JSON.parse(res);});
    //this.newGame();
  }

  newGame(){
    this.level = Array(this.levelData[this.actualLevel-1].Lenght * this.levelData[this.actualLevel-1].Width)
    this.nbrCases = this.levelData[this.actualLevel-1].Lenght * this.levelData[this.actualLevel-1].Width;
    for(let i = 0; i < this.nbrCases; i++){
      this.level[i] = this.levelData[this.actualLevel-1].Container[i];
    }
    this.refreshLevel();
  }


  refreshLevel(){
    this.httpClient.get("http://localhost:3000/refresh", { responseType: 'text' }).subscribe(res => {console.log(res);});

    this.squaresTab = Array(this.levelData[this.actualLevel-1].Lenght * this.levelData[this.actualLevel-1].Width);


    for(let i = 0; i < this.nbrCases; i++){
      if(this.level[i] == '0'){
        this.squaresTab[i] = 'empty_square.png'
      }
      if(this.level[i] == '1'){
        this.squaresTab[i] = 'square.png'
      }
      if(this.level[i] == '2'){
        this.squaresTab[i] = 'player1.png'
        this.posPlayer = i
      }
      if(this.level[i] == '3'){
        this.squaresTab[i] = 'player2.png'
      }
      if(this.level[i] == '4'){
        this.squaresTab[i] = 'end.png'
      }
    }
  }

  nextLevel(){
    this.actualLevel += 1;
    this.nextLevelInStyle.emit(this.actualLevel);
    this.newGame();

  }

  lastLevel(){
    this.actualLevel -= 1;
    this.nextLevelInStyle.emit(this.actualLevel);
    this.newGame();
  }

  goToMenu(){
    this.startGame = 0;
    this.goToMenuMessage.emit(this.startGame); //Lanch the menu
  }

  goToRight(){
    this.onMoving = 1;
    for(let i = 0; i < this.levelData[this.actualLevel-1].Lenght - (this.posPlayer % this.levelData[this.actualLevel-1].Lenght) - 1; i++){
      if(this.onMoving == 1){
        if(this.level[this.posPlayer + i + 1] == '0'){
          this.level[this.posPlayer + i] = '0';
          this.level[this.posPlayer + i + 1] = '2';

        }
        if(this.level[this.posPlayer + i + 1] == '4'){
          this.level[this.posPlayer + i] = '0';
          this.level[this.posPlayer + i + 1] = '2';

          console.log("WIN");
        }
        if(this.level[this.posPlayer + i + 1] == '3' || this.level[this.posPlayer + i + 1] == '1'){
          this.onMoving = 0;
        }
      }
    }

    this.refreshLevel();
  }

  goToLeft(){
    this.onMoving = 1;
    for(let i = 0; i < this.posPlayer % this.levelData[this.actualLevel-1].Lenght; i++){
      if(this.onMoving == 1){
        if(this.level[this.posPlayer - i - 1] == '0'){
          this.level[this.posPlayer - i] = '0';
          this.level[this.posPlayer - i - 1] = '2';

        }
        if(this.level[this.posPlayer - i - 1] == '4'){
          this.level[this.posPlayer - i] = '0';
          this.level[this.posPlayer - i - 1] = '2';
          console.log("WIN");
        }
        if(this.level[this.posPlayer - i - 1] == '3' || this.level[this.posPlayer - i - 1] == '1'){
          this.onMoving = 0;
        }
      }
    }

    this.refreshLevel();
  }

  goToBot(){
    this.onMoving = 1;
    for(let i = 1; i < this.levelData[this.actualLevel-1].Width - (this.posPlayer / this.levelData[this.actualLevel-1].Lenght); i++){
      if(this.onMoving == 1){
        if(this.level[this.posPlayer + i * this.levelData[this.actualLevel-1].Lenght] == '0'){
          this.level[this.posPlayer + (i-1) * this.levelData[this.actualLevel-1].Lenght] = '0';
          this.level[this.posPlayer + i * this.levelData[this.actualLevel-1].Lenght] = '2';

        }
        if(this.level[this.posPlayer + i * this.levelData[this.actualLevel-1].Lenght] == '4'){
          this.level[this.posPlayer + (i-1) * this.levelData[this.actualLevel-1].Lenght] = '0';
          this.level[this.posPlayer + i * this.levelData[this.actualLevel-1].Lenght] = '2';
          console.log("WIN");
        }
        if(this.level[this.posPlayer + i * this.levelData[this.actualLevel-1].Lenght] == '3' || this.level[this.posPlayer + i * this.levelData[this.actualLevel-1].Lenght] == '1'){
          this.onMoving = 0;
        }
      }

    }

    this.refreshLevel();
  }

  goToTop(){
    this.onMoving = 1;
    for(let i = 1; i < this.posPlayer / this.levelData[this.actualLevel-1].Lenght; i++){
      if(this.onMoving == 1){
        if(this.level[this.posPlayer - i * this.levelData[this.actualLevel-1].Lenght] == '0'){
          this.level[this.posPlayer - (i-1) * this.levelData[this.actualLevel-1].Lenght] = '0';
          this.level[this.posPlayer - i * this.levelData[this.actualLevel-1].Lenght] = '2';

        }
        if(this.level[this.posPlayer - i * this.levelData[this.actualLevel-1].Lenght] == '4'){
          this.level[this.posPlayer - (i-1) * this.levelData[this.actualLevel-1].Lenght] = '0';
          this.level[this.posPlayer - i * this.levelData[this.actualLevel-1].Lenght] = '2';
          console.log("WIN");
        }
        if(this.level[this.posPlayer - i * this.levelData[this.actualLevel-1].Lenght] == '3' || this.level[this.posPlayer - i * this.levelData[this.actualLevel-1].Lenght] == '1'){
          this.onMoving = 0;
        }
      }

    }

    this.refreshLevel();
  }

  @HostListener('document:keyup', ['$event'])
  onKeyUp(ev:KeyboardEvent) {
    if(ev.key == "w"){this.goToTop()}
    if(ev.key == "s"){this.goToBot()}
    if(ev.key == "d"){this.goToRight()}
    if(ev.key == "a"){this.goToLeft()}

  }

}
