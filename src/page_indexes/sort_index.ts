import { initConfigs, initStartGameBtn } from "../configs.ts";
import { addEvent, deleteEvent, hasEventOccured } from "../time-event-handler.ts";

document.addEventListener('DOMContentLoaded', () => {
    initConfigs();
    initStartGameBtn();
    document.addEventListener('keydown', (ev) => {
        if (ev.key == 'Escape' && hasEventOccured('game_start') && !hasEventOccured('escape')) {
            deleteEvent('game_start');
            deleteEvent('escape');
            window.location.reload();
        }

        addEvent('escape');
    })
    document.addEventListener('keyup', (ev) => {
        if (ev.key == 'Escape')
            deleteEvent('escape');
    });
});
