import Vec from "./Vec.js";

class Level {
  constructor(plan) {
    let rows = plan
      .trim()
      .split("\n")
      .map((l) => [...l]);
    this.height = rows.length;
    this.width = rows[0].length;
    this.startActors = [];
    this.levelChars = {
      ".": "empty",
      "#": "wall",
      "+": "lava",
      "@": Player,
      o: Coin,
      "=": Lava,
      "|": Lava,
      v: Lava,
    };

    this.rows = rows.map((row, y) => {
      return row.map((ch, x) => {
        let type = this.levelChars[ch];
        if (typeof type == "string") return type;
        this.startActors.push(type.create(new Vec(x, y), ch));
        return "empty";
      });
    });
  }
}

let test = new Level(`..........\n........`);

export default Level;
