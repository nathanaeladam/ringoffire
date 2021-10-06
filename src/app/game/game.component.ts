import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Game } from 'src/models/game';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: number = undefined;
  game: Game;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  openDialog(): void {
    if (this.game.players[5]) {
      alert('Maximale Spieleranzahl ereicht');
      return;
    }
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name) {
        this.game.players.push(name);
      }
    });
  }


  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  takeCard() {
    // if nobody is player XD
    if (!this.game.players[0]) {
      alert('geben sie bitte Spielernamen über den Plus Button ein!');
      return;
    }
    // if card stack is empty
    if (!this.game.stack[0]) {
      alert('card stack is empty');
      return;
    } 
    //if not ok to animation now
    if (this.pickCardAnimation) {
      return;
    } 

    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;
    setTimeout(() => {
      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
      this.game.playedCards.push(this.currentCard);
      this.pickCardAnimation = false;
    }, 1000);
  }
}