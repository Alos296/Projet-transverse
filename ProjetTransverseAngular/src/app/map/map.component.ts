import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  name : string;
  levelData : any;
  actualLevel: number;
  lenght: number;
  showHistory: number;
  gameHistory: any[];




  constructor(private httpClient: HttpClient) {
    this.name = " ";
    this.actualLevel = 1;
    this.lenght = 0;
    this.showHistory = 0;
    this.gameHistory = Array(0).fill(null);
  }

  ngOnInit(): void {

  }
  startGame(){

  }


  showHistoryButton(){
    if(this.showHistory == 0){
      this.httpClient.get("http://localhost:3000/allGames", { responseType: 'text' }).subscribe(res => {this.gameHistory = JSON.parse(res);});

      this.sortId();
      this.showHistory = 1;
    }else {
      this.showHistory = 0;
    }
  }

  sortId(){
    const insertionSortID = (nums :any) => {
      for (let i = 1; i < nums.length; i++) {
        let j = i - 1;
        let tmp = [nums[i].ID,nums[i].Pseudo1,nums[i].Pseudo2,nums[i].Time,nums[i].Score,nums[i].LastLvl];
        while (j >= 0 && nums[j].ID > tmp[0]) {
          [nums[j+1].ID,nums[j+1].Pseudo1,nums[j+1].Pseudo2,nums[j+1].Time,nums[j+1].Score,nums[j+1].LastLvl] = [nums[j].ID,nums[j].Pseudo1,nums[j].Pseudo2,nums[j].Time,nums[j].Score,nums[j].LastLvl];
          j--;
        }
        [nums[j+1].ID,nums[j+1].Pseudo1,nums[j+1].Pseudo2,nums[j+1].Time,nums[j+1].Score,nums[j+1].LastLvl] = tmp;
      }
      return nums
    }
    insertionSortID(this.gameHistory);
    this.gameHistory = this.gameHistory.reverse();

  }
  sortScore(){
    const insertionSortScore = (nums :any) => {
      for (let i = 1; i < nums.length; i++) {
        let j = i - 1;
        let tmp = [nums[i].ID,nums[i].Pseudo1,nums[i].Pseudo2,nums[i].Time,nums[i].Score,nums[i].LastLvl];
        while (j >= 0 && nums[j].Score > tmp[4]) {
          [nums[j+1].ID,nums[j+1].Pseudo1,nums[j+1].Pseudo2,nums[j+1].Time,nums[j+1].Score,nums[j+1].LastLvl] = [nums[j].ID,nums[j].Pseudo1,nums[j].Pseudo2,nums[j].Time,nums[j].Score,nums[j].LastLvl];
          j--;
        }
        [nums[j+1].ID,nums[j+1].Pseudo1,nums[j+1].Pseudo2,nums[j+1].Time,nums[j+1].Score,nums[j+1].LastLvl] = tmp;
      }
      return nums
    }
    this.gameHistory = insertionSortScore(this.gameHistory);
    this.gameHistory = this.gameHistory.reverse();
  }
  sortTime(){
    const insertionSortTime = (nums :any) => {
      for (let i = 1; i < nums.length; i++) {
        let j = i - 1;
        let tmp = [nums[i].ID,nums[i].Pseudo1,nums[i].Pseudo2,nums[i].Time,nums[i].Score,nums[i].LastLvl];
        while (j >= 0 && nums[j].Time > tmp[3]) {
          [nums[j+1].ID,nums[j+1].Pseudo1,nums[j+1].Pseudo2,nums[j+1].Time,nums[j+1].Score,nums[j+1].LastLvl] = [nums[j].ID,nums[j].Pseudo1,nums[j].Pseudo2,nums[j].Time,nums[j].Score,nums[j].LastLvl];
          j--;
        }
        [nums[j+1].ID,nums[j+1].Pseudo1,nums[j+1].Pseudo2,nums[j+1].Time,nums[j+1].Score,nums[j+1].LastLvl] = tmp;
      }
      return nums
    }
    this.gameHistory = insertionSortTime(this.gameHistory);
    this.gameHistory = this.gameHistory.reverse();
  }
  sortLastLvl(){
    const insertionSortLevel = (nums :any) => {
      for (let i = 1; i < nums.length; i++) {
        let j = i - 1;
        let tmp = [nums[i].ID,nums[i].Pseudo1,nums[i].Pseudo2,nums[i].Time,nums[i].Score,nums[i].LastLvl];
        while (j >= 0 && nums[j].LastLvl > tmp[5]) {
          [nums[j+1].ID,nums[j+1].Pseudo1,nums[j+1].Pseudo2,nums[j+1].Time,nums[j+1].Score,nums[j+1].LastLvl] = [nums[j].ID,nums[j].Pseudo1,nums[j].Pseudo2,nums[j].Time,nums[j].Score,nums[j].LastLvl];
          j--;
        }
        [nums[j+1].ID,nums[j+1].Pseudo1,nums[j+1].Pseudo2,nums[j+1].Time,nums[j+1].Score,nums[j+1].LastLvl] = tmp;
      }
      return nums
    }
    this.gameHistory = insertionSortLevel(this.gameHistory);
    this.gameHistory = this.gameHistory.reverse();
  }
}
