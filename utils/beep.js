import { getArrSize, getComparisonLen, getMaxFreq, getMinFreq } from "../configs.js";
import { sleep } from "../countdown.js";
let audioContext = new AudioContext();
let freqDiff = 50;
export const getFreqDiff = () => freqDiff;
export const calculateFreqDiff = () => freqDiff = Math.floor((getMaxFreq() - getMinFreq()) / (getArrSize() - 1));
export async function beep(num, signal) {
    const oscillatorSrc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillatorSrc.type = 'sine';
    oscillatorSrc.connect(gainNode);
    gainNode.connect(audioContext.destination);
    oscillatorSrc.frequency.setValueAtTime(getMinFreq() + freqDiff * num, audioContext.currentTime);
    oscillatorSrc.start();
    try {
        await sleep(getComparisonLen(), signal);
    }
    finally {
        oscillatorSrc.stop(audioContext.currentTime);
    }
}
