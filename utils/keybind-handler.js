import { addEvent, deleteEvent, hasEventOccurred } from "./time-event-handler.js";
const activeKeys = new Set();
const keybinds = new Map();
const keybindsHandlers = new Map();
const activeKeybinds = new Set();
export const registerKey = (key, opts) => {
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
    }
    else {
        triggerKeybinds();
    }
};
export const unregisterKey = (key, opts) => {
    let keyNormalized = (opts?.ignoreCase)
        ? key.toLocaleLowerCase()
        : key;
    if (opts?.guardAgainstHold) {
        deleteEvent(`keyreg_${key}`);
    }
    activeKeys.delete(keyNormalized);
    triggerKeybinds();
};
export const registerKeybind = (name, handler, keys, opts) => {
    const normalised = (opts?.ignoreCase)
        ? keys.map(key => key.toLocaleLowerCase())
        : keys;
    keybinds.set(name, normalised.sort());
    keybindsHandlers.set(name, handler);
};
export const unregisterKeybind = (name) => {
    keybinds.delete(name);
    keybindsHandlers.delete(name);
};
export const triggerKeybinds = () => {
    const activatedKeybinds = new Set();
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
    });
};
