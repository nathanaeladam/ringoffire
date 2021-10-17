import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-info',
  templateUrl: './game-info.component.html',
  styleUrls: ['./game-info.component.scss']
})
export class GameInfoComponent implements OnInit, OnChanges {
  cardAction = [
    {
      title: 'Waterfall', description: 'Das Ass steht für den Wasserfall. Alle Spieler setzen zum trinken an. Im Uhrzeigersinn darf erst dann mit dem Trinken aufgehört werden, wenn der rechte Sitznachbar davor seinen Wasserfall beendet hat. Der Spieler, der das Ass zieht darf zu erst aufhören zu trinken (wann er will).'
    },
    { title: '2 is for you', description: 'Du darfst eine Person bestimmen, die einen Schluck aus ihrem Getränk nimmt..' },
    { title: '3 is me', description: 'Du musst einen Schluck trinken.' },
    { title: '4 is floor', description: 'Berühre mit deiner Hand den Boden. Der Mitspieler, der zuletzt den Boden berührt, muss einen Schluck trinken.' },
    { title: '5 is thumbmaster', description: 'Berühre mit deinem Daumen die Tischplatte. Der Mitspieler der zuletzt den Tisch berührt, muss einen Schluck trinken.' },
    { title: '6 is for chicks', description: 'Alle Frauen trinken.' },
    { title: '7 is heaven', description: 'Wer als letztes die Hand zum Himmel streckt muss ein Schluck trinken' },
    { title: '8 is mate', description: 'Bestimme einen Mitspieler, der von nun an jedes Mal mit dir einen Schluck trinken muss, wenn du dazu aufgefordert wirst.' },
    { title: '9 is rhyme', description: 'Such dir ein Wort aus. Im Uhrzeigersinn müssen die Mitspieler einen Reim darauf finden. Wer ein Wort wiederholt oder keinen neuen Reim mehr nennen kann, muss einen Schluck trinken.' },
    { title: '10 is men', description: 'Alle Männer trinken.' },
    { title: 'The Rules Jack', description: 'Erstelle eine Regel. Jeder der diese bricht muss einen Schluck trinken.' },
    { title: 'Never have i ever...', description: 'Sage etwas was du noch nie gemacht hast. Jeder der das schonmal gemacht hat muss einen Schluck trinken.' },
    { title: 'The King', description: 'Gebe etwas von deinem Becher in den Kings-Cup. Wer den letzten König zieht muss den Kings-Cup austrinken' },
  ];

  title = '';
  description = '';
  showInfobutton = false;
  showInfobox = false;
  @Input() card;

  constructor() { }

  ngOnInit(): void {
    if (this.card) {
      let nummericalValue = (this.card - 1) % 13;
      this.title = this.cardAction[nummericalValue].title;
      this.description = this.cardAction[nummericalValue].description;
    }
  }

  ngOnChanges(): void {
    if (this.card) {
      let nummericalValue = (this.card - 1) % 13;
      this.title = this.cardAction[nummericalValue].title;
      this.description = this.cardAction[nummericalValue].description;
      this.showInfobutton = true;
    }
  }

  showInfo(){
      alert(this.description);
  }
}
