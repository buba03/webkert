import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  constructor() {
    console.log('constructor')
  }

  ngOnInit(): void {
    console.log('ngOnInit')
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit')
  }

  switchPage(page: string): void {
    this.selectedPage.emit(page);
  }

}
