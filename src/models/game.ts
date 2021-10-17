export class Game {
    public players: string[] = ['hans','peter','wurst','jash','peuter','platcher','isak'];
    public stack: number[] = [];
    public playedCards: number[] = [];
    public currentPlayer = 0;

    constructor(){
        for (let i = 1; i < 53; i++) {
            const number = i;
            this.stack.push(number);          
        }
        shuffle(this.stack);
    }
}

function shuffle(array:number[]) {
    let currentIndex = array.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }