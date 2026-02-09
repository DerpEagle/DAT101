"use strict";
import { TSprite } from "libSprite";
import { EGameStatus } from "./FlappyBird.mjs";
import { TSineWave } from "lib2d";
import { playHeroIsDead, playGameOver } from "./menu.js";
export class THero extends TSprite {
  #gravity;
  #speed;
  #wave;

  constructor(aSpcvs, aSPI) {
    super(aSpcvs, aSPI, 100, 150);
    this.animationSpeed = 20;
    this.#gravity = 9.81 / 100;
    this.#speed = 0;
    this.debug = false;
    this.#wave = new TSineWave(1, 1);
    this.y += this.#wave.value;
  }

  animate() {
    const hasGravity =
       EGameStatus.state === EGameStatus.gaming ||
       EGameStatus.state === EGameStatus.heroIsDead

    if (hasGravity) {
      if (this.y < 400 - this.height) {
        this.#speed += this.#gravity; // increase speed due to gravity
        this.y += this.#speed; // update position based on speed
        if (this.rotation < 65) {
          // limit max rotation
          this.rotation = this.#speed * 25; // tilt down based on speed
        }
      } else {
        playGameOver();
        playHeroIsDead();
        EGameStatus.state = EGameStatus.gameOver;
        this.animationSpeed = 0;
      }
    } else if (EGameStatus.state === EGameStatus.idle) {
      this.y += this.#wave.value;
    }
  } // End of animate

  restart() {
    this.x = 100;
    this.y = 150;
    this.#speed = 0;
    this.rotation = 0;
    this.animationSpeed = 20;
    EGameStatus.state = EGameStatus.idle;
  }

  eat() {
    // Food eaten - no sound effect
  }

  flap() {
    this.#speed = -2.5;
    this.rotation = 0;
  }
}