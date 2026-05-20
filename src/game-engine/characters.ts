export type CharacterClass = "warrior" | "mage" | "archer";

export interface Character {
  id: CharacterClass;
  name: string;
  emoji: string;
  tagline: string;
  description: string;
  color: string;
  colorBg: string;
  abilities: Ability[];
}

export interface Ability {
  name: string;
  code: string;
  description: string;
  icon: string;
}

export const characters: Character[] = [
  {
    id: "warrior",
    name: "Warrior",
    emoji: "🗡️",
    tagline: "Close range. Maximum power.",
    description:
      "Warriors excel at melee combat. They can charge through enemies and shield against damage. Best for direct, structured approaches.",
    color: "text-red-400",
    colorBg: "border-red-500/40 bg-red-500/10",
    abilities: [
      {
        name: "Attack",
        code: "hero.attack()",
        description: "Strike the enemy directly ahead",
        icon: "⚔️",
      },
      {
        name: "Charge",
        code: 'hero.charge("right")',
        description: "Move 2 tiles and attack in one action",
        icon: "💥",
      },
      {
        name: "Shield",
        code: "hero.shield()",
        description: "Block the next spike or enemy hit",
        icon: "🛡️",
      },
    ],
  },
  {
    id: "mage",
    name: "Mage",
    emoji: "🔮",
    tagline: "Think differently. Bend the rules.",
    description:
      "Mages can blink past walls, cast fireballs over obstacles, and reveal hidden tiles. Best for lateral thinking and creative solutions.",
    color: "text-violet-400",
    colorBg: "border-violet-500/40 bg-violet-500/10",
    abilities: [
      {
        name: "Blink",
        code: 'hero.blink("right")',
        description: "Teleport 2 tiles, passing through one wall",
        icon: "✨",
      },
      {
        name: "Fireball",
        code: 'hero.fireball("right")',
        description: "Destroy an enemy or chest up to 3 tiles away",
        icon: "🔥",
      },
      {
        name: "Move",
        code: "hero.moveRight()",
        description: "Standard movement",
        icon: "👣",
      },
    ],
  },
  {
    id: "archer",
    name: "Archer",
    emoji: "🏹",
    tagline: "Fast. Precise. Always ahead.",
    description:
      "Archers can shoot enemies from a distance and dash two tiles in one move. Best for speed-running and efficient paths.",
    color: "text-green-400",
    colorBg: "border-green-500/40 bg-green-500/10",
    abilities: [
      {
        name: "Shoot",
        code: 'hero.shoot("right")',
        description: "Ranged attack hitting an enemy up to 3 tiles away",
        icon: "🎯",
      },
      {
        name: "Dash",
        code: 'hero.dash("right")',
        description: "Move 2 tiles instantly in one command",
        icon: "💨",
      },
      {
        name: "Move",
        code: "hero.moveRight()",
        description: "Standard movement",
        icon: "👣",
      },
    ],
  },
];

export const HERO_EMOJI: Record<CharacterClass, string> = {
  warrior: "🧙",
  mage: "🔮",
  archer: "🏹",
};

export const CHARACTER_EMOJI: Record<CharacterClass, string> = {
  warrior: "🗡️",
  mage: "✨",
  archer: "🏹",
};

export const HERO_AVATAR: Record<CharacterClass, string> = {
  warrior: "🦸",
  mage: "🧙",
  archer: "🧝",
};

export function getCharacter(id: CharacterClass): Character {
  return characters.find((c) => c.id === id) ?? characters[0];
}
