import { getArrSize, getComparisonLen, getMaxFreq, getMinFreq } from "./configs.ts";
import { sleep } from "./countdown.ts";

let audioContext = new AudioContext();

let freqDiff = 50
export const getFreqDiff = () => freqDiff;
export const calculateFreqDiff = () => freqDiff = Math.floor((getMaxFreq() - getMinFreq()) / (getArrSize() - 1));

export async function beep(num: number) {
    const oscillatorSrc = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    oscillatorSrc.type = 'sine';
    oscillatorSrc.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillatorSrc.frequency.setValueAtTime(getMinFreq() + freqDiff * num, audioContext.currentTime);
    oscillatorSrc.start();
    await sleep(getComparisonLen());
    oscillatorSrc.stop(audioContext.currentTime);
}