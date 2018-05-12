import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { FacebookService } from '../facebook.service';

@Component({
  selector: 's-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookLoginComponent implements OnInit {

  constructor(
    private facebookService: FacebookService,
    private cdr: ChangeDetectorRef
  ) { }

  ready = false;

  async ngOnInit() {
    await this.facebookService.loadScriptAsync();
    this.ready = true;
    this.cdr.markForCheck();
  }
}
