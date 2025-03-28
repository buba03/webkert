import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, AfterViewInit {
  
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  constructor() {
    console.log('HeaderComponent constructor')
  }

  ngOnInit(): void {
    console.log('HeaderComponent ngOnInit')
  }

  ngAfterViewInit(): void {
    console.log('HeaderComponent ngAfterViewInit')
  }
}
