import { FacebookService } from '../facebook.service';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

declare let FB: any;
// ssr
@Component({
  selector: 's-facebook-page',
  templateUrl: './facebook-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookPageComponent implements OnInit, AfterViewInit {

  constructor(
    private facebookService: FacebookService
  ) { }

  ngOnInit() {

  }

  async ngAfterViewInit() {
    const firstLoad = await this.facebookService.loadScriptAsync();
    if (!firstLoad) {
      FB.XFBML.parse(); //不是 firstload 才需要 parse, first page 还会有 Bug 哦
    }
  }

}
