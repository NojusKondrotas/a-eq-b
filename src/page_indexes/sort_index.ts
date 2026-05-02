import { initConfigs, initEventListeners, initStartGameBtn, measureSortPlacements, setConfigsDisplay, setCountdownDisplay, setSortPlaygroundDisplay, setSortStartsDisplay } from "../configs.ts";
import { initElementMeasurement } from "../dom_measurer.ts";
import { addEvent, deleteEvent, hasEventOccured } from "../time-event-handler.ts";

document.addEventListener('DOMContentLoaded', () => {
    initConfigs();
    initEventListeners();
    initStartGameBtn();

    const startGameBtn = document.getElementById('start-game-btn')!;
    const guideText = document.getElementById('guide-text')!;
    const startGameBtnMes = initElementMeasurement(startGameBtn, document.body,
            0, 0, 0);
    const guideTextMes = initElementMeasurement(guideText, document.body,
            0, 0, 0);
    startGameBtnMes.setDisplay('none');
    guideTextMes.setDisplay('none');

    setCountdownDisplay('none');
    setConfigsDisplay('none');
    setSortStartsDisplay('none');
    measureSortPlacements();
    setConfigsDisplay('');
    setSortPlaygroundDisplay('none');
    setSortStartsDisplay('none');

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
