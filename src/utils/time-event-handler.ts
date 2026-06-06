const timestamps: Map<string, number | null> = new Map();

export let abortController: AbortController;
export const initAbortController = () => abortController = new AbortController();

export function addEvent(ev: string): number {
    const time = performance.now();
    timestamps.set(ev, time);
    console.log(timestamps);
    return time;
}

export function updateEvent(ev: string): number {
    const time = performance.now();
    timestamps.set(ev, time);
    console.log(timestamps);
    return time;
}

export function deleteEvent(ev: string): null {
    timestamps.set(ev, null);
    console.log(timestamps);
    return null;
}

export function hasEventOccured(ev: string): boolean {
    console.log(timestamps);
    return !timestamps.get(ev) ? false : true;
}

export function isEventLaterOrEqual(ev: string, evRef: string): boolean {
    const val = timestamps.get(ev);
    const valRef = timestamps.get(evRef);

    if (!val || !valRef)
        return false;
    return val >= valRef;
}