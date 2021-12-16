import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/models/game';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameId: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe((params) => {
      console.log(params.id);
      this.gameId = params.id;

      this
        .firestore
        .collection('games')
        .doc(this.gameId)
        .valueChanges()
        .subscribe((game: any) => {
          console.log('game update', game);

          this.game.currentPlayer = game.currentPlayer;
          this.game.playedCards = game.playedCards;
          this.game.stack = game.stack;
          this.game.players = game.players;
          this.game.currentCard = game.currentCard;
          this.game.pickCardAnimation = game.pickCardAnimation;
        })
        ;
    });
  }


  newGame() {
    this.game = new Game();
  }

  saveGame() {
    this
      .firestore
      .collection('games')
      .doc(this.gameId)
      .update(this.game.toJson());
  }




  openDialog(): void {
    if (this.game.players[7]) {
      alert('Maximale Spieleranzahl ereicht');
      return;
    }
    const dialogRef = this.dialog.open(AddPlayerDialogComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (this.game.players.includes(name)) {
        alert('Diese Name wird bereits verwendet');
        return
      } else if (name) {
        this.game.players.push(name);
        this.saveGame();
      }
    });
  }


  takeCard() {
    // if nobody is player XD
    if (!this.game.players[0]) {
      alert('geben sie bitte Spielernamen über den Plus Button ein!');
      return;
    }
    // if card stack is empty
    if (!this.game.stack[0]) {
      alert('Kartenstapel war leer und wurde jetzt neu gemischt');
      for (let i = 1; i < 53; i++) {
        const number = i;
        this.game.stack.push(number);
      }
      shuffle(this.game.stack);
      return;
    }
    //if not ok to animation now
    if (this.game.pickCardAnimation) {
      return;
    }

    this.game.currentCard = this.game.stack.pop();
    this.game.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();


    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1000);
  }
}




function shuffle(array: number[]) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
