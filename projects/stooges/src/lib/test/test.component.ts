import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'lib-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestComponent implements OnInit {

  constructor(
    private fb : FormBuilder
  ) { }

  ngOnInit() {
    let a = this.fb.group({
      name : 'keatkeat'
    });
    console.log(a);
  }

}
