import { trigger, state, animate, transition, style } from '@angular/animations';

export const slideLeftRightFixedAnimation =
  trigger('slideLeftRightFixed', [
    state('*', style({
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100vh',
      zIndex: 10
    })),
    transition(':enter', [
      style({
        left: '-100%',
        overflow: 'hidden'
      }),
      animate('.5s linear', style({
        left: 0
      }))
    ]),
    transition(':leave', [
      style({
        overflow: 'hidden'
      }),
      animate('.8s linear', style({
        left: '200%',
      }))
    ])
  ]);
