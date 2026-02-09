"use strict";
import { TSprite, TSpriteButton, TSpriteNumber } from "libSprite";
import { startGame, resetGame, EGameStatus, soundMuted } from "./FlappyBird.mjs";
import { TSoundFile } from "libSound";


const fnCountDown = "./Media/countDown.mp3"
const fnFood = "./Media/food.mp3"
const fnRunning = "./Media/running.mp3"
const fnGameOver = "./Media/gameOver.mp3"
const fnHeroIsDead = "./Media/heroIsDead.mp3"

let sfRunning = new TSoundFile(fnRunning);
sfRunning.loop = true;
let sfGameOver = new TSoundFile(fnGameOver);
let sfHeroIsDead = new TSoundFile(fnHeroIsDead);

export function playRunning() {
  if (!soundMuted) sfRunning.play();
}

export function stopRunning() {
  if (sfRunning) {
    sfRunning.stop();
  }
}

export function playGameOver() {
  if (!soundMuted) sfGameOver.play();
}

export function playHeroIsDead() {
  if (!soundMuted) sfHeroIsDead.play();
}





const highScores = JSON.parse(localStorage.getItem("flappyHighScores")) || [];

export class TMenu {
  #spTitle;
  #spPlayBtn;
  #spCountDown;
  #spGetReady;
  #spGameOver;
  #sfCountDown;
  #sfFood;
  #spPoints;
  #spBillboard;
  #spMedal;
  #spFinalScore;
  #spHighScore;




  constructor(aSpcvs, aSPI) {
    this.#spTitle = new TSprite(aSpcvs, aSPI.flappyBird, 200, 100);
    this.#spPlayBtn = new TSpriteButton(aSpcvs, aSPI.buttonPlay, 240, 180);
    this.#spPlayBtn.addEventListener("click", this.spPlayBtnClick.bind(this));
    this.#spCountDown = new TSpriteNumber(aSpcvs, aSPI.numberBig, 280, 190);
    this.#spCountDown.visible = false;
    this.#spGetReady = new TSprite(aSpcvs, aSPI.infoText, 195, 190);
    this.#spGetReady.index = 0;
    this.#spGetReady.hidden = true;
    this.#spGameOver = new TSprite(aSpcvs, aSPI.infoText, 195, 120);
    this.#spGameOver.index = 1;
    this.#spGameOver.hidden = true;
    this.#sfFood = new TSoundFile(fnFood);
    this.#spPoints = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 10, 10);
    this.#spPoints.alpha = 0.6;

    this.#spBillboard = new TSprite(aSpcvs, aSPI.gameOver, 175, 250);
    this.#spBillboard.hidden = true;
    this.#spMedal = new TSprite(aSpcvs, aSPI.medal, 200, 292);
    this.#spMedal.hidden = true;
    this.#spFinalScore = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 340, 282);
    this.#spFinalScore.visible = false;
    this.#spHighScore = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 340, 325);
    this.#spHighScore.visible = false;
  }

  incPoints(aScore) {
    this.#spPoints.value += aScore;
  }






  showGameOver() {
    stopRunning();
    this.#spGetReady.hidden = true;
    this.#spPoints.visible = false;

    this.#spGameOver.hidden = false;
    this.#spBillboard.hidden = false;
    this.#spPlayBtn.hidden = false;
    this.#spPlayBtn.disabled = false;

    const score = this.#spPoints.value;
    this.#spFinalScore.value = score;
    this.#spFinalScore.visible = true;

    if (highScores.length === 0 || score > highScores[0]) {
      highScores.unshift(score);
      localStorage.setItem("flappyHighScores", JSON.stringify(highScores));
    }
    this.#spHighScore.value = highScores[0];
    this.#spHighScore.visible = true;

    if (score >= 50) {
      this.#spMedal.index = 2;
    } else if (score >= 30) {
      this.#spMedal.index = 1;
    } else if (score >= 10) {
      this.#spMedal.index = 3;
    } else {
      this.#spMedal.index = 0;
    }
    this.#spMedal.hidden = false;
  }

  setSoundMute(aIsMuted) {
    if (aIsMuted) {
      sfRunning.pause();
    } else if (EGameStatus.state === EGameStatus.gaming) {
      sfRunning.play();
    }
  }

  playFoodSound() {
    if (!soundMuted) this.#sfFood.play();
  }

  draw() {
    this.#spTitle.draw();
    this.#spPlayBtn.draw();
    this.#spCountDown.draw();
    this.#spGetReady.draw();
    this.#spPoints.draw();


    this.#spGameOver.draw();
    this.#spBillboard.draw();
    this.#spMedal.draw();
    this.#spFinalScore.draw();
    this.#spHighScore.draw();
  }

  countDown() {
    this.#spCountDown.value--;
    if (this.#spCountDown.value > 0) {
      setTimeout(this.countDown.bind(this), 1000);
    } else {
      this.#spCountDown.visible = false;
      this.#spGetReady.hidden = false;
      setTimeout(() => {
        this.#spGetReady.hidden = true;

        startGame();
      }, 1000);


    }
  }

  spPlayBtnClick() {
    console.log("Click!");
    resetGame();
    this.#spPoints.value = 0;
    this.#spPoints.visible = true;

    this.#spTitle.hidden = true;
    this.#spPlayBtn.disabled = true;
    this.#spPlayBtn.hidden = true;
    this.#spGameOver.hidden = true;
    this.#spBillboard.hidden = true;
    this.#spMedal.hidden = true;
    this.#spFinalScore.visible = false;
    this.#spHighScore.visible = false;

    this.#spCountDown.visible = true;
    this.#spCountDown.value = 3;
    this.#sfCountDown = new TSoundFile(fnCountDown);
    if (!soundMuted) this.#sfCountDown.play();
    playRunning();
    setTimeout(this.countDown.bind(this), 1000);
  }
}
