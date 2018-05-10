import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

// ssr

// note : for 性能优化做的指令
@Directive({
  selector: '[sDragover]'
})
export class DragoverDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  @Input()
  sDragover: string | boolean

  ngOnInit() {
    this.renderer.listen(this.elementRef.nativeElement, 'dragover', (e: Event) => {
      let isString = typeof(this.sDragover) === 'string';
      let isBoolean = typeof(this.sDragover) === 'boolean';
      if ((isString && this.sDragover == '') || (isBoolean && this.sDragover)) e.preventDefault();
    });
  }

}
