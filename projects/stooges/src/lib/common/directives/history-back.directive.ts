import { Directive } from '@angular/core';

@Directive({
    selector: '[sHistoryBack]',
    host: {
        '(click)': 'historyBack()'
    }
})
export class HistoryBackDirective {

    constructor() { }

    historyBack() {
        history.back();
    }
}
