import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'stooges-app',
  templateUrl: './stooges-app.component.html',
  styleUrls: ['./stooges-app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StoogesAppComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
