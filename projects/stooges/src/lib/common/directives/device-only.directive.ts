import { DeviceService } from '../services/device.service';
import { Directive, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';


// <div *sDeviceOnly="'pc,tablet'" >test</div>
@Directive({
  selector: '[sDeviceOnly]'
})
export class DeviceOnlyDirective implements OnInit {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private deviceService: DeviceService
  ) { }

  @Input() set sDeviceOnly(match: string) {
    match = match.clearSpace();
    const device = this.deviceService.device;
    const matchs = match.split(',');
    const isShow = matchs.indexOf(device) != -1;
    if (isShow) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainerRef.clear();
    }
  }

  ngOnInit() {

  }

}
