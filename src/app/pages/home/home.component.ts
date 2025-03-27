import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  @Output() selectedPage: EventEmitter<string> = new EventEmitter();

  openShop(): void {
    this.selectedPage.emit('shop');
  }

}
