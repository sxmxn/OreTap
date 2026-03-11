export enum EClickUpgrades {
    COPPER,
    IRON,
    GOLD,
    PLATINUM,
    DIAMOND,
    LEGENDARY,
}

export enum EMultiClickUpgrades {
    SINGLE = 0,
    DUAL = 1,
    TRIPLE = 2,
    QUAD = 3,
}

export enum EAutoMinerUpgrades {
    NONE,
    FIRST_MINER ,
    SECOND_MINER,
    THIRD_MINER,
}

interface IClickRecord {
    color: string;
    moneyCost: number;
    value: number;
    title: string;
}

interface IMultiClickRecord {
    title: string;
    moneyCost: number;
    oreCount: number;
}

interface IAutoMinerRecord {
    title: string;
    moneyCost: number;
    amountAutoMiners: number;
}

export const AUTO_MINER_RECORD: Record<EAutoMinerUpgrades, IAutoMinerRecord> = {
    [EAutoMinerUpgrades.NONE]: { title: "None", moneyCost: 0, amountAutoMiners: 0 },
    [EAutoMinerUpgrades.FIRST_MINER]: { title: "First Miner", moneyCost: 100, amountAutoMiners: 1 },
    [EAutoMinerUpgrades.SECOND_MINER]: { title: "Second Miner", moneyCost: 250, amountAutoMiners: 2 },
    [EAutoMinerUpgrades.THIRD_MINER]: { title: "Third Miner", moneyCost: 500, amountAutoMiners: 3 },
};


export const CLICK_RECORD: Record<EClickUpgrades, IClickRecord> = {
    [EClickUpgrades.COPPER]: { color: "#B87333", moneyCost: 5, value: 1, title: "Copper" },
    [EClickUpgrades.IRON]: { color: "#8B4513", moneyCost: 10, value: 2, title: "Iron" },
    [EClickUpgrades.GOLD]: { color: "#FFD700", moneyCost: 20, value: 2.5, title: "Gold" },
    [EClickUpgrades.PLATINUM]: { color: "#E5E4E2", moneyCost: 35, value: 3, title: "Platinum" },
    [EClickUpgrades.DIAMOND]: { color: "#B9F2FF", moneyCost: 50, value: 3.5, title: "Diamond" },
    [EClickUpgrades.LEGENDARY]: { color: "#9D4EDD", moneyCost: 75, value: 4, title: "Legendary" },
};

export const MULTI_CLICK_RECORD: Record<EMultiClickUpgrades, IMultiClickRecord> = {
    [EMultiClickUpgrades.SINGLE]: { title: "Single Pickaxe", moneyCost: 0, oreCount: 1 },
    [EMultiClickUpgrades.DUAL]: { title: "Dual Pickaxe", moneyCost: 100, oreCount: 2 },
    [EMultiClickUpgrades.TRIPLE]: { title: "Triple Pickaxe", moneyCost: 250, oreCount: 3 },
    [EMultiClickUpgrades.QUAD]: { title: "Quad Pickaxe", moneyCost: 500, oreCount: 4 },
};

export enum EPattern {
    LINE = "LINE",
    DIAMOND = "DIAMOND",
    SQUARE = "SQUARE",
    CROSS = "CROSS",
}

export interface IPattern {
    name: EPattern;
    offsets: [number, number][]; // relative to center
    bonus: number;
    title: string;
}

export const PATTERNS: Record<EPattern, IPattern> = {
    [EPattern.LINE]: {
        name: EPattern.LINE,
        offsets: [[0, 0], [0, 1], [0, 2]],
        bonus: 1.5,
        title: "Line",
    },
    [EPattern.DIAMOND]: {
        name: EPattern.DIAMOND,
        offsets: [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1]],
        bonus: 2.0,
        title: "Diamond",
    },
    [EPattern.SQUARE]: {
        name: EPattern.SQUARE,
        offsets: [[0, 0], [0, 1], [1, 0], [1, 1]],
        bonus: 1.75,
        title: "Square",
    },
    [EPattern.CROSS]: {
        name: EPattern.CROSS,
        offsets: [[0, 0], [-1, 0], [1, 0], [0, -1], [0, 1], [0, 2], [0, -2]],
        bonus: 2.25,
        title: "Cross",
    },
};
