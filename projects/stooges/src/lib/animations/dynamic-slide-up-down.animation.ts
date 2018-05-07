import { trigger, animate, transition, style } from '@angular/animations';

export const dynamicSlideUpDownAnimation =
  trigger('dynamicSlideUpDown', [
    transition(':enter', [
      style({
        height: 0,
        overflow: 'hidden'
      }),
      animate('300ms', style({
        height: '*',
        overflow: 'hidden'
      })),
    ]),
    transition(':leave', [
      style({
        height: '*',
        overflow: 'hidden'
      }),
      animate('300ms', style({
        height: 0,
        overflow: 'hidden'
      })),
    ])
  ]);
