import { GameCommand, Direction } from "../types";

/**
 * The hero API exposed to users in the code editor.
 * Every method call appends a command to the queue —
 * no movement happens during code execution, only collection.
 */
export function createHeroAPI(commands: GameCommand[]) {
  const hero = {
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
  };

  return hero;
}

export type Hero = ReturnType<typeof createHeroAPI>;
