import { Component, EventEmitter, Input, Output } from '@angular/core';

export type PriceRange = 'all' | '0-100' | '100-200' | '200-300' | '300-400' | '400+';

@Component({
  selector: 'app-filter-bar',
  standalone: true,
  templateUrl: './filter-bar.html',
  styleUrls: ['./filter-bar.css'],
})
export class FilterBarComponent {
  @Input() selected: PriceRange = 'all';
  @Output() selectedChange = new EventEmitter<PriceRange>();

  set(r: PriceRange) { this.selectedChange.emit(r); }
}
