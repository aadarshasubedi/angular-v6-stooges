// import { TitleMetaDescriptionService } from '@stooges';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {

  constructor(
    // private titleMetaDescriptionService: TitleMetaDescriptionService,
  ) {

  }
  
  showFacebookPage = false;
 
  dada: {
    name: string
  } = {
    name: 'keatkeat',
    age: 11
  } as any;

  ngOnInit() {

    // this.titleMetaDescriptionService.update({
    //   title: 'New Home',
    //   metaDescription: 'New Home Description'
    // });
  }

}
