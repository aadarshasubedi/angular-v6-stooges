import { trigger, animate, transition, style } from '@angular/animations';

export const fadeInAnimation =
    trigger('fadeIn', [
        transition(':enter', [
            style({ opacity: 0 }),
            animate('0.6s', style({ opacity: 1 }))
        ])
    ]);
