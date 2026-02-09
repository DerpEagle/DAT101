"use strict";
import { TSprite } from "libSprite";
import { hero, EGameStatus } from "./FlappyBird.mjs";
import { stopRunning, playGameOver } from "./menu.js";

const EasyFlyerGap = 120;
const HardFlyerGap = 90;
const MinimumProtrusion = 25;


export class TObstacle{
  #spUp;
  #spDown;
  #spi;
  constructor(aSpcvs, aSPI, aIsDayMode = true){
    const x = 600;
    this.#spi = aSPI;
    // Generate random gap height, based on difficulty settings
    const gap = Math.ceil(Math.random() * (EasyFlyerGap - HardFlyerGap) + HardFlyerGap);
    const minTop = -this.#spi.height + MinimumProtrusion; // Minimum top position for upper obstacle
    const maxTop = -MinimumProtrusion; // Maximum top position for upper obstacle
    // Generate random top position for upper obstacle
    let top = Math.ceil(Math.random() * (maxTop - minTop) + minTop);
    const minBottom = 400 - MinimumProtrusion; // Minimum bottom position for lower obstacle
    let topWithGap = this.#spi.height + top + gap; // Initial position of bottom obstacle based on the height of the sprite, gap, and top
    if(topWithGap > minBottom){
      // The top with gap is too low, adjust top and keep the gap constant
      const adjustment = topWithGap - minBottom;
      top -= adjustment;
      topWithGap = this.#spi.height + top + gap; // Recalculate topWithGap after adjustment
    }

    this.#spDown = new TSprite(aSpcvs, aSPI, x, topWithGap);
    this.#spUp = new TSprite(aSpcvs, aSPI, x, top);
    this.setDayMode(aIsDayMode);
  }

  // Properties
  get x(){
    return this.#spDown.x;
  }
  get width(){
    return this.#spDown.width;
  }

  draw(){
    this.#spDown.draw();
    this.#spUp.draw();
  }

  
  setDayMode(aIsDayMode){
    if(aIsDayMode){
      this.#spDown.index = 2;
      this.#spUp.index = 3;
    }else{
      this.#spDown.index = 0;
      this.#spUp.index = 1;
    }
  }

  animate(){
    this.#spDown.x--;
    this.#spUp.x--;
    let hasCollided = hero.hasCollided(this.#spDown) || hero.hasCollided(this.#spUp);

    if(hasCollided && EGameStatus.state === EGameStatus.gaming){
      console.log("Collision with Hero!");
      EGameStatus.state = EGameStatus.heroIsDead;
      hero.animationSpeed = 0;
      hero.flap(); // Last flap of death!
      stopRunning();
      playGameOver();
    }
  }

}// End of class TObstacle