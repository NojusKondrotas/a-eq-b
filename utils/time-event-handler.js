const timestamps = new Map();
export let abortController;
export const initAbortController = () => abortController = new AbortController();
export function addEvent(ev) {
    const time = performance.now();
    timestamps.set(ev, time);
    return time;
}
export function updateEvent(ev) {
    const time = performance.now();
    timestamps.set(ev, time);
    return time;
}
export function deleteEvent(ev) {
    timestamps.set(ev, null);
    return null;
}
export function hasEventOccurred(ev) {
    return !timestamps.get(ev) ? false : true;
}
export function isEventLaterOrEqual(ev, evRef) {
    const val = timestamps.get(ev);
    const valRef = timestamps.get(evRef);
    if (!val || !valRef)
        return false;
    return val >= valRef;
}
