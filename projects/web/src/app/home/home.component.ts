import { TitleMetaDescriptionService } from '@stooges';
import { Component, OnInit, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(
    private titleMetaDescriptionService: TitleMetaDescriptionService,
  ) {

  }

  ngAfterViewInit() {

     
  }

  dada: {
    name: string
  } = {
    name: 'keatkeat',
    age: 11
  } as any;

  ngOnInit() {

    this.titleMetaDescriptionService.update({
      title: 'New Home',
      metaDescription: 'New Home Description'
    });
  }

}
