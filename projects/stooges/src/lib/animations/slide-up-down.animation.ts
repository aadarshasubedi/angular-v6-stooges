import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideUpDownAnimation =
  trigger('slideUpDown', [
    state('true', style({
      height: '*'
    })),
    state('false', style({
      height: 0
    })),
    transition('1 <=> 0', animate('300ms ease-in'))
  ]);
