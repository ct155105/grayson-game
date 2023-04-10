class Monster {
    constructor(pos) {
      this.pos = pos;
      // this.speed = speed;
      // this.reset = reset;
    }
    get type() {
      return "monster";
    }
  
    static create(pos) {
      return new Monster(pos.plus(new Vec(0, -1)));
    }
  
    update(time, state) {
      return new Monster(this.pos);
    }
  
    collide(state) {
      let player = state.player;
      if (player.pos.y + player.size.y > this.pos.y + 0.5) {
        return new State(state.level, state.actors, "lost");
      } else {
        let actors = state.actors.filter((a) => a != this);
        return new State(state.level, actors, state.status);
      }
    }
  }
  
  Monster.prototype.size = new Vec(1.2, 2);