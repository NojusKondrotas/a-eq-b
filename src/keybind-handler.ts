import { addEvent, deleteEvent, hasEventOccured } from "./time-event-handler.ts";

const activeKeys = new Set<string>();
const keybinds = new Map<string, string[]>();
const keybindsHandlers = new Map<string, () => void>();

type KeybindOpts = {
    ignoreCase?: boolean,
    guardAgainstHold?: boolean,
};

export const registerKey = (key: string, opts?: KeybindOpts): void => {
    let keyNormalized = (opts?.ignoreCase)
    ? key.toLowerCase()
    : key;

    activeKeys.add(keyNormalized);

    if (opts?.guardAgainstHold) {
        if (!hasEventOccured(`keyreg_${key}`)) {
            addEvent(`keyreg_${key}`);
            triggerKeybinds();
        }
    } else {
        triggerKeybinds();
    }
};
export const unregisterKey = (key: string, opts?: KeybindOpts): void => {
    let keyNormalized = (opts?.ignoreCase)
    ? key.toLowerCase()
    : key;

    if (opts?.guardAgainstHold) {
        deleteEvent(`keyreg_${key}`);
    }

    activeKeys.delete(keyNormalized);
    triggerKeybinds();
};

export const registerKeybind = (name: string, handler: () => void, keys: string[], opts?: KeybindOpts): void => {
    const normalised = (opts?.ignoreCase)
    ? keys.map(key => key.toLowerCase())
    : keys;
    keybinds.set(name, normalised.sort());
    keybindsHandlers.set(name, handler);
};
export const unregisterKeybind = (name: string): void => {
    keybinds.delete(name);
    keybindsHandlers.delete(name);
};

export const triggerKeybinds = (): void => {
    for(const [name, keys] of keybinds) {
        if (keys.every((key) => activeKeys.has(key))) {
            keybindsHandlers.get(name)?.();
        }
    }
};