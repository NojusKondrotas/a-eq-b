import { initConfigs, initEventListeners, initStartGameBtn } from "../configs.ts";
import { addEvent, deleteEvent, hasEventOccured } from "../time-event-handler.ts";

document.addEventListener('DOMContentLoaded', () => {
    initConfigs();
    initEventListeners();
    initStartGameBtn();

    const countdownCnt = document.getElementById('countdown-cnt');
    const playground = document.getElementById('playground');
    const stats = document.getElementById('stats');

    if (!countdownCnt || !playground || !stats) {
        window.location.href = '../pages/error/error.html';
        return;
    }

    countdownCnt.style.display = 'none';
    playground.style.display = 'none';
    stats.style.display = 'none';

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
