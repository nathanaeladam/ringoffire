export class Game {
    public players: string[] = [];
    public stack: number[] = [];
    public playedCards: number[] = [];
    public currentPlayer = 0;
    public pickCardAnimation = false;
    public currentCard: number = undefined;

    constructor() {
        for (let i = 1; i < 53; i++) {
            const number = i;
            this.stack.push(number);
        }
        shuffle(this.stack);
    }

    public toJson() {
        return {
            players: this.players,
            stack: this.stack,
            playedCards: this.playedCards,
            currentPlayer: this.currentPlayer,
            pickCardAnimation: this.pickCardAnimation,
            currentCard: this.currentCard,
        }
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