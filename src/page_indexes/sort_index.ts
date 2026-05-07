import { initConfigs, initEventListeners, initStartGameBtn, measureSortPlacements, setConfigsDisplay, setCountdownDisplay, setSortPlaygroundDisplay, setSortStartsDisplay, startMinigame } from "../configs.ts";
import { initElementMeasurement } from "../dom_measurer.ts";
import { registerKey, registerKeybind, unregisterKey } from "../keybind-handler.ts";
import { addEvent, deleteEvent, hasEventOccured } from "../time-event-handler.ts";

function toggleMinigameGuide(): void {
    const guide = document.getElementById('guide-text');
    if (!guide)
        return;

    guide.style.visibility == 'hidden'
    ? guide.style.visibility = ''
    : guide.style.visibility = 'hidden';
}

function toggleConfigs(): void {
    const configs = document.getElementsByClassName('configs');
    if (!configs)
        return;
    
    Array.from(configs as HTMLCollectionOf<HTMLElement>).forEach(el => {
        el.style.visibility == 'hidden'
        ? el.style.visibility = ''
        : el.style.visibility = 'hidden';
    });
}

function toggleKeyboard(): void {
    const keyboard = document.getElementById('keyboard');
    if (!keyboard) {
        window.location.href = '../pages/error/error.html';
        return;
    }

    keyboard.style.display == 'none'
    ? keyboard.style.display = 'flex'
    : keyboard.style.display = 'none';
}

function redirectToIndexPage(): void {
    window.location.href = '../index.html';
}

function initSortIndexEventListeners(): void {
    const keybinds = new Map<string, string[]>([
        ['start', ['A']],
        ['guide_text', ['C']],
        ['configs', ['D']],
        ['display_keyboard', ['E']],
        ['index', ['F']]
    ]);
    const keybindHandlers = new Map<string, () => void>([
        ['start', startMinigame],
        ['guide_text', toggleMinigameGuide],
        ['configs', toggleConfigs],
        ['display_keyboard', toggleKeyboard],
        ['index', redirectToIndexPage]
    ]);

    keybinds.forEach((val, key) => {
        registerKeybind(key, keybindHandlers.get(key)!, val, { ignoreCase: true });
    });
    
    document.addEventListener('keydown', (ev) => {
        if (ev.key.toLocaleLowerCase() == 'b') {
            if (hasEventOccured('game_start') && !hasEventOccured('escape')){
                deleteEvent('game_start');
                deleteEvent('escape');
                window.location.reload();
            } else {
                addEvent('escape');
            }
        }
        
        registerKey(ev.key, { ignoreCase: true, guardAgainstHold: true });
    });
    document.addEventListener('keyup', (ev) => {
        if (ev.key.toLocaleLowerCase() == 'b')
            deleteEvent('escape');

        unregisterKey(ev.key, { ignoreCase: true, guardAgainstHold: true });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initConfigs();
    initEventListeners();
    initStartGameBtn();
    initSortIndexEventListeners();

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
});
