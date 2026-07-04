import { initConfigs, initEventListeners, initStartGameBtn, measureSortPlacements, setConfigsDisplay, setCountdownDisplay, setReducedFooterDisplay, setSortPlaygroundDisplay, setSortStatsDisplay } from "../configs.js";
import { countdown } from "../countdown.js";
import { initElementMeasurement } from "../utils/dom_measurer.js";
import { registerKey, registerKeybind, unregisterKey, unregisterKeybind } from "../utils/keybind-handler.js";
import { SortType } from "../sorts/sort_types.js";
import { abortController, addEvent, deleteEvent, hasEventOccurred } from "../utils/time-event-handler.js";
function unregisterKeybinds() {
    const keybinds = new Array('guide_text', 'configs', 'display_keyboard', 'index');
    keybinds.forEach((val) => {
        unregisterKeybind(val);
    });
}
export async function startMinigame() {
    if (abortController && hasEventOccurred('game_end'))
        abortController.abort();
    if (hasEventOccurred('game_start')) {
        return;
    }
    addEvent('game_start');
    setSortStatsDisplay('none');
    setReducedFooterDisplay('none');
    unregisterKeybinds();
    switch (sessionStorage.getItem('selected_sort')) {
        case 'merge':
            await countdown(SortType.MergeSort, 3);
            break;
        case 'insertion':
            await countdown(SortType.InsertionSort, 3);
            break;
        case 'selection':
            await countdown(SortType.SelectionSort, 3);
            break;
        case 'bubble':
            await countdown(SortType.BubbleSort, 3);
            break;
        case 'quick':
            await countdown(SortType.QuickSort, 3);
            break;
        case 'heap':
            await countdown(SortType.HeapSort, 3);
            break;
    }
    deleteEvent('game_start');
}
function toggleMinigameGuide() {
    const guide = document.getElementById('guide-text');
    if (!guide)
        return;
    guide.style.visibility == 'hidden'
        ? guide.style.visibility = ''
        : guide.style.visibility = 'hidden';
}
function toggleConfigs() {
    const configs = document.getElementsByClassName('configs');
    if (!configs)
        return;
    Array.from(configs).forEach(el => {
        el.style.visibility == 'hidden'
            ? el.style.visibility = ''
            : el.style.visibility = 'hidden';
    });
}
function toggleKeyboard() {
    const keyboard = document.getElementById('keyboard');
    if (!keyboard) {
        window.location.href = '../pages/error/error.html';
        return;
    }
    if (keyboard.style.display == 'none') {
        setConfigsDisplay('none');
        keyboard.style.display = 'flex';
    }
    else {
        setConfigsDisplay('');
        keyboard.style.display = 'none';
    }
}
function redirectToIndexPage() {
    window.location.href = '../index.html';
}
function initSortIndexEventListeners() {
    const keybinds = new Map([
        ['start', ['A']],
        ['guide_text', ['C']],
        ['configs', ['D']],
        ['display_keyboard', ['E']],
        ['index', ['F']]
    ]);
    const keybindHandlers = new Map([
        ['start', startMinigame],
        ['guide_text', toggleMinigameGuide],
        ['configs', toggleConfigs],
        ['display_keyboard', toggleKeyboard],
        ['index', redirectToIndexPage]
    ]);
    keybinds.forEach((val, key) => {
        registerKeybind(key, keybindHandlers.get(key), val, { ignoreCase: true });
    });
    document.addEventListener('keydown', (ev) => {
        if (ev.key.toLocaleLowerCase() == 'b') {
            if (hasEventOccurred('game_start') && !hasEventOccurred('escape')
                || hasEventOccurred('game_end')) {
                deleteEvent('game_start');
                deleteEvent('game_end');
                deleteEvent('escape');
                window.location.reload();
            }
            else {
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
    const startGameBtn = document.getElementById('start-game-btn');
    const guideText = document.getElementById('guide-text');
    const startGameBtnMes = initElementMeasurement(startGameBtn, document.body, 0, 0, 0);
    const guideTextMes = initElementMeasurement(guideText, document.body, 0, 0, 0);
    startGameBtnMes.setDisplay('none');
    guideTextMes.setDisplay('none');
    setCountdownDisplay('none');
    setSortStatsDisplay('none');
    setSortPlaygroundDisplay('none');
    measureSortPlacements();
});
