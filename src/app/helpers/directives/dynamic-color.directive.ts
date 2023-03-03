import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDynamicColor]',
})
export class DynamicColorDirective implements OnInit {
  @Input() value: number;
  @Input() minMaxValues: number[];

  maxValue: number;
  minValue: number;
  color: any;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  setColor(value: number): void {
    if (value >= 0) {
        if (value < 200) {
            this.color = '#c7b111'
        }
        else {
            const colors = [
                '#DBF0D2',
                '#C1EEB2',
                '#9DE685',
                '#77DD53',
                '#4EC530',
            ];
            let val = Math.floor(value/this.maxValue*50 + 0.50)
            val = (val > 4) ? 4 : val
            this.color = colors[val]
        }
    }
    else this.color = '#ff0000'
  }

  ngOnInit(): void {
    this.minValue = this.minMaxValues[0];
    this.maxValue = this.minMaxValues[1];
    this.setColor(this.value);
    this.renderer.setStyle(this.elRef.nativeElement, 'color', this.color);
  }
}
