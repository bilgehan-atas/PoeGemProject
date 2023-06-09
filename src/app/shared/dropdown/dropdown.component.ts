import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})

export class DropdownComponent implements OnInit {
  @ViewChild('ddMenuRef') ddMenuRef: ElementRef;
  @ViewChild('selectedMenuRef') selectedMenuRef: ElementRef;

  @Input() menuItems: Array<string> = []
  @Input() callbackFunction: (args: any) => any;
  @Input() anchorType: string;

  selectedMenu: string = "";
  isOpen: boolean = false;

  faChevronDown = faChevronDown;

  toggleDd() {
    this.isOpen = !this.isOpen
  }

  toggleSelect(selected: string) {
    this.selectedMenu = selected;
    this.callbackFunction(selected);
    this.isOpen = false
  }

  ngOnInit(): void {
    this.selectedMenu = this.menuItems[0];
    
    switch(this.anchorType) {
      case "query":
        
        break;
      case "url":
        
        break;
      default:
        break
    }

    this.renderer.listen('window', 'click', (e:Event) => { 
      if(e.target !=this.ddMenuRef.nativeElement && e.target !=this.selectedMenuRef.nativeElement ) {
        this.isOpen = false;
      }
    })
  }

  constructor(private router: Router, private route: ActivatedRoute, private renderer: Renderer2) {}

}