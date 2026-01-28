import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[appHoverGlow]', standalone: true })
export class HoverGlowDirective {
  constructor(private el: ElementRef<HTMLElement>) {}

  @HostListener('mouseenter') onEnter() {
    this.el.nativeElement.style.boxShadow = '0 10px 24px rgba(0,0,0,0.10)';
    this.el.nativeElement.style.transform = 'translateY(-2px)';
    this.el.nativeElement.style.transition = 'all .18s ease';
  }
  @HostListener('mouseleave') onLeave() {
    this.el.nativeElement.style.boxShadow = 'none';
    this.el.nativeElement.style.transform = 'none';
  }
}
