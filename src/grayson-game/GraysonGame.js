import React, { useRef, useEffect } from "react";
import Coin from "./Coin";
import Lava from "./Lava";
import Player from "./Player";
import Monster from "./Monster";
import Level from "./Level";
import State from "./State";
import CanvasDisplay from "./CanvasDisplay";

function CanvasGame() {
  const canvasRef = useRef(null);
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let simpleLevelPlan = `
........................#....#......
........................#....#......
..#.....................v....v...#..
..#..............=...............#..
..#.........oMo..................#..
..#.@.M....#####.................#..
..########.#####......o...o.M..o.#..
......#++++++++++++###############..
......#############.................
....................................`;

    const levelChars = {
      ".": "empty",
      "#": "wall",
      "+": "lava",
      "@": Player,
      o: Coin,
      "=": Lava,
      "|": Lava,
      v: Lava,
      M: Monster,
    };

    const scale = 40;

    function trackKeys(keys) {
      let down = Object.create(null);
      function track(event) {
        if (keys.includes(event.key)) {
          down[event.key] = event.type == "keydown";
          event.preventDefault();
        }
      }
      window.addEventListener("keydown", track);
      window.addEventListener("keyup", track);
      return down;
    }

    const arrowKeys = trackKeys(["ArrowLeft", "ArrowRight", "ArrowUp"]);

    function runAnimation(frameFunc) {
      let lastTime = null;
      function frame(time) {
        if (lastTime != null) {
          let timeStep = Math.min(time - lastTime, 100) / 1000;
          if (frameFunc(timeStep) === false) return;
        }
        lastTime = time;
        requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    function runLevel(level, Display) {
      let display = new Display(
        document.body,
        level,
        canvas,
        img1.current,
        img2.current,
        img3.current,
        scale
      );
      let state = State.start(level);
      let ending = 1;
      return new Promise((resolve) => {
        runAnimation((time) => {
          state = state.update(time, arrowKeys);
          display.syncState(state);
          if (state.status == "playing") {
            return true;
          } else if (ending > 0) {
            ending -= time;
            return true;
          } else {
            display.clear();
            resolve(state.status);
            return false;
          }
        });
      });
    }

    async function runGame(plans, Display) {
      for (let level = 0; level < plans.length; ) {
        let status = await runLevel(new Level(plans[level]), Display);
        if (status == "won") level++;
      }
      alert("You've won!");
    }

    const GAME_LEVELS = [simpleLevelPlan];

    // function flipHorizontally(context, around) {
    //   context.translate(around, 0);
    //   context.scale(-1, 1);
    //   context.translate(-around, 0);
    // }

    // wait 500ms before starting the game
    runGame(GAME_LEVELS, CanvasDisplay);
  }, []);

  return (
    <div>
      <img ref={img1} /> <img ref={img2} /> <img ref={img3} />
      <canvas ref={canvasRef} width={800} height={600} />
    </div>
  );
}

export default CanvasGame;
