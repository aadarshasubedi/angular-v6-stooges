import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, AfterViewInit } from '@angular/core';

import { FacebookService } from '../facebook.service';

@Component({
  selector: 's-facebook-login',
  templateUrl: './facebook-login.component.html',
  styleUrls: ['./facebook-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookLoginComponent implements OnInit, AfterViewInit {

  constructor(
    private facebookService: FacebookService,
    private cdr: ChangeDetectorRef
  ) { }

  public ready = false;

  async ngAfterViewInit() {
    await this.facebookService.loadScriptAsync();
    this.ready = true;
    this.cdr.markForCheck();
  }

  ngOnInit() {

  }
}
