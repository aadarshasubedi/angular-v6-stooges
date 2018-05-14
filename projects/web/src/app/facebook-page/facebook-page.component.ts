

import { FacebookService } from './facebook.service';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

declare let FB: any;
window['tata'] = 1;
@Component({
  selector: 's-facebook-page',
  templateUrl: './facebook-page.component.html',
  styleUrls: ['./facebook-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacebookPageComponent implements OnInit, AfterViewInit {

  constructor(
    private facebookService: FacebookService
  ) {
    console.log(this.facebookService);
  }

  ngOnInit() {

  }

  async ngAfterViewInit() {

    await this.facebookService.loadScriptAsync();
    FB.XFBML.parse(); //不是 firstload 才需要 parse, first page 还会有 Bug 哦

    // if (window['tata'] == 1) {
    //   FB.XFBML.parse();
    //   // window['tata'] = 2;
    //   // setInterval(() => {
    //   //   FB.XFBML.parse();        
    //   // }, 3000); 
    // }
    // else {
    //   setTimeout(() => {
    //     FB.XFBML.parse();
    //   }, 3000);
    // }
  }
}
