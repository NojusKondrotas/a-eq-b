let cfgMinFreqIn: HTMLElement | null;
let cfgMaxFreqIn: HTMLElement | null;
let cfgArrSizeIn: HTMLElement | null;
let cfgComparisonLenIn: HTMLElement | null;

let cfgMinFreqVal: HTMLElement | null;
let cfgMaxFreqVal: HTMLElement | null;
let cfgArrSizeVal: HTMLElement | null;
let cfgComparisonLenVal: HTMLElement | null;

const setInnerText = (obj: HTMLElement, text: string) => obj.innerText = text;

export function initConfigs() {
    cfgMinFreqIn = document.getElementById('min-freq-input');
    cfgMaxFreqIn = document.getElementById('max-freq-input');
    cfgArrSizeIn = document.getElementById('arr-size-input');
    cfgComparisonLenIn = document.getElementById('comparison-len-input');

    cfgMinFreqVal = document.getElementById('min-freq-val');
    cfgMaxFreqVal = document.getElementById('max-freq-val');
    cfgArrSizeVal = document.getElementById('arr-size-val');
    cfgComparisonLenVal = document.getElementById('comparison-len-val');

    if (!cfgMinFreqIn || !cfgMaxFreqIn || !cfgArrSizeIn || !cfgComparisonLenIn
        || !cfgMinFreqVal || !cfgMaxFreqVal || !cfgArrSizeVal || !cfgComparisonLenVal) {
        window.location.href = "pages/error/error.html";
    }

    (cfgMinFreqIn as HTMLElement).addEventListener('input', () => {
        const val = (cfgMinFreqIn as HTMLInputElement).value;
        setInnerText((cfgMinFreqVal as HTMLElement), val);
        sessionStorage.setItem('min_freq', val);
    });
    (cfgMaxFreqIn as HTMLElement).addEventListener('input', () => {
        const val = (cfgMaxFreqIn as HTMLInputElement).value;
        setInnerText((cfgMaxFreqVal as HTMLElement), val);
        sessionStorage.setItem('max_freq', val);
    });
    (cfgArrSizeIn as HTMLElement).addEventListener('input', () => {
        const val = (cfgArrSizeIn as HTMLInputElement).value;
        setInnerText((cfgArrSizeVal as HTMLElement), val);
        sessionStorage.setItem('arr_size', val);
    });
    (cfgComparisonLenIn as HTMLElement).addEventListener('input', () => {
        const val = (cfgComparisonLenIn as HTMLInputElement).value;
        setInnerText((cfgComparisonLenVal as HTMLElement), val);
        sessionStorage.setItem('comparison_len', val);
    });

    setInnerText((cfgMinFreqVal as HTMLElement), (cfgMinFreqIn as HTMLInputElement).value);
    setInnerText((cfgMaxFreqVal as HTMLElement), (cfgMaxFreqIn as HTMLInputElement).value);
    setInnerText((cfgArrSizeVal as HTMLElement), (cfgArrSizeIn as HTMLInputElement).value);
    setInnerText((cfgComparisonLenVal as HTMLElement), (cfgComparisonLenIn as HTMLInputElement).value);

    sessionStorage.setItem('min_freq', (cfgMinFreqIn as HTMLInputElement).value);
    sessionStorage.setItem('max_freq', (cfgMaxFreqIn as HTMLInputElement).value);
    sessionStorage.setItem('arr_size', (cfgArrSizeIn as HTMLInputElement).value);
    sessionStorage.setItem('comparison_len', (cfgComparisonLenIn as HTMLInputElement).value);
}

export const getMinFreq = () => parseInt(sessionStorage.getItem('min-freq') as string);
export const getMaxFreq = () => parseInt(sessionStorage.getItem('max-freq') as string);
export const getArrSize = () => parseInt(sessionStorage.getItem('arr-size') as string);
export const getComparisonLen = () => parseInt(sessionStorage.getItem('comparison-len') as string);

export function initStartGameBtn() {
    const startGameBtn = document.getElementById('start-game-btn');

    if (!startGameBtn) {
        window.location.href = 'pages/error/error.html';
    }

    (startGameBtn as HTMLElement).addEventListener('click', () => {
        switch (sessionStorage.getItem('selected_sort')) {
            case 'merge':
                window.location.href = 'pages/sorts/merge/merge.html'
                break;
        }
    });
}