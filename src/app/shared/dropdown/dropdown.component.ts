import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @ViewChild('ddMenuRef') ddMenuRef: ElementRef;
  @ViewChild('selectedMenuRef') selectedMenuRef: ElementRef;

  @Input() menuItems: Array<string> = []
  selectedMenu: string = "";
  isOpen: boolean = false;

  toggleDd() {
    this.isOpen = !this.isOpen
  }

  toggleSelect(selected: string) {
    this.selectedMenu = selected;
    this.isOpen = false
  }

  ngOnInit(): void {
    this.selectedMenu = this.menuItems[0]

    this.renderer.listen('window', 'click', (e:Event) => { 
      if(e.target !=this.ddMenuRef.nativeElement && e.target !=this.selectedMenuRef.nativeElement ) {
        this.isOpen = false;
      }
    })
  }

  constructor(private renderer: Renderer2) {}

}
