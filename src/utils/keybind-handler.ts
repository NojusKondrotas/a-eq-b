import { addEvent, deleteEvent, hasEventOccurred } from "./time-event-handler.ts";

const activeKeys = new Set<string>();
const keybinds = new Map<string, string[]>();
const keybindsHandlers = new Map<string, () => void>();
const activeKeybinds = new Set<string>();

type KeybindOpts = {
    ignoreCase?: boolean,
    guardAgainstHold?: boolean,
};

export const registerKey = (key: string, opts?: KeybindOpts): void => {
    let keyNormalized = (opts?.ignoreCase)
        ? key.toLocaleLowerCase()
        : key;

    if (!activeKeys.has(keyNormalized))
        activeKeys.add(keyNormalized);

    if (opts?.guardAgainstHold) {
        if (!hasEventOccurred(`keyreg_${key}`)) {
            addEvent(`keyreg_${key}`);
            triggerKeybinds();
        }
    } else {
        triggerKeybinds();
    }
};
export const unregisterKey = (key: string, opts?: KeybindOpts): void => {
    let keyNormalized = (opts?.ignoreCase)
        ? key.toLocaleLowerCase()
        : key;

    if (opts?.guardAgainstHold) {
        deleteEvent(`keyreg_${key}`);
    }

    activeKeys.delete(keyNormalized);
    triggerKeybinds();
};

export const registerKeybind = (name: string, handler: () => void, keys: string[], opts?: KeybindOpts): void => {
    const normalised = (opts?.ignoreCase)
        ? keys.map(key => key.toLocaleLowerCase())
        : keys;
    keybinds.set(name, normalised.sort());
    keybindsHandlers.set(name, handler);
};
export const unregisterKeybind = (name: string): void => {
    keybinds.delete(name);
    keybindsHandlers.delete(name);
};

export const triggerKeybinds = (): void => {
    const activatedKeybinds = new Set<string>();
    for (const [name, keys] of keybinds) {
        if (keys.every(key => activeKeys.has(key))) {
            if (!activeKeybinds.has(name))
                keybindsHandlers.get(name)?.();
            activeKeybinds.add(name);
            activatedKeybinds.add(name);
        }
    }

    activeKeybinds.forEach(keybind => {
        if (!activatedKeybinds.has(keybind)) {
            activeKeybinds.delete(keybind);
        }
    })
};