import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideUpDownOverflowAnimation =
  trigger('slideUpDownOverflow', [
    state('true', style({
      height: '*',
      overflow: 'hidden'
    })),
    state('false', style({
      height: 0,
      overflow: 'hidden'
    })),
    transition('1 <=> 0', animate('300ms linear'))
  ]);
