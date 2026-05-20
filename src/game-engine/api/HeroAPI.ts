import { GameCommand, Direction } from "../types";
import { CharacterClass } from "../characters";

export function createHeroAPI(commands: GameCommand[], characterClass: CharacterClass = "warrior") {
  const hero = {
    // ── Universal movement ────────────────────────────────────────────────────
    moveRight() { commands.push({ type: "MOVE", direction: "right" }); },
    moveLeft()  { commands.push({ type: "MOVE", direction: "left" }); },
    moveUp()    { commands.push({ type: "MOVE", direction: "up" }); },
    moveDown()  { commands.push({ type: "MOVE", direction: "down" }); },

    move(direction: Direction) {
      if (!["up", "down", "left", "right"].includes(direction)) {
        throw new Error(`Invalid direction "${direction}". Use "up", "down", "left", or "right".`);
      }
      commands.push({ type: "MOVE", direction });
    },

    attack(direction?: Direction) {
      commands.push({ type: "ATTACK", direction });
    },

    say(message: string) {
      commands.push({ type: "SAY", message: String(message) });
    },

    wait() {
      commands.push({ type: "WAIT" });
    },

    // ── Warrior abilities ─────────────────────────────────────────────────────
    charge(direction?: Direction) {
      if (characterClass !== "warrior") {
        throw new Error(`charge() is a Warrior ability. Your class is ${characterClass}.`);
      }
      commands.push({ type: "CHARGE", direction });
    },

    shield() {
      if (characterClass !== "warrior") {
        throw new Error(`shield() is a Warrior ability. Your class is ${characterClass}.`);
      }
      commands.push({ type: "SHIELD" });
    },

    // ── Mage abilities ────────────────────────────────────────────────────────
    blink(direction: Direction) {
      if (characterClass !== "mage") {
        throw new Error(`blink() is a Mage ability. Your class is ${characterClass}.`);
      }
      if (!["up", "down", "left", "right"].includes(direction)) {
        throw new Error(`Invalid direction "${direction}".`);
      }
      commands.push({ type: "BLINK", direction });
    },

    fireball(direction: Direction) {
      if (characterClass !== "mage") {
        throw new Error(`fireball() is a Mage ability. Your class is ${characterClass}.`);
      }
      if (!["up", "down", "left", "right"].includes(direction)) {
        throw new Error(`Invalid direction "${direction}".`);
      }
      commands.push({ type: "FIREBALL", direction });
    },

    // ── Archer abilities ──────────────────────────────────────────────────────
    shoot(direction: Direction) {
      if (characterClass !== "archer") {
        throw new Error(`shoot() is an Archer ability. Your class is ${characterClass}.`);
      }
      if (!["up", "down", "left", "right"].includes(direction)) {
        throw new Error(`Invalid direction "${direction}".`);
      }
      commands.push({ type: "SHOOT", direction });
    },

    dash(direction: Direction) {
      if (characterClass !== "archer") {
        throw new Error(`dash() is an Archer ability. Your class is ${characterClass}.`);
      }
      if (!["up", "down", "left", "right"].includes(direction)) {
        throw new Error(`Invalid direction "${direction}".`);
      }
      commands.push({ type: "DASH", direction });
    },
  };

  return hero;
}

export type Hero = ReturnType<typeof createHeroAPI>;
