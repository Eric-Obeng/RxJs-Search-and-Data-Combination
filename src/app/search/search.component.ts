import { Component } from '@angular/core';
import { debounceTime, filter, fromEvent, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  items: string[] = [];
  searchItem: string = '';


  // Mock data array
  private mockData: string[] = [
    'Apple',
    'Banana',
    'Grape',
    'Orange',
    'Pineapple',
    'Strawberry',
    'Blueberry',
    'Kiwi',
    'Mango',
    'Papaya',
    'Watermelon',
    'Cherry',
  ];

  ngOnInit() {
    const searchInput = document.getElementById('search') as HTMLInputElement;

    fromEvent(searchInput, 'input')
      .pipe(
        debounceTime(300),
        map((event: any) => event.target.value),
        filter((term: string) => term.length >= 3),
        switchMap((searchTerm: string) => this.searchItems(searchTerm))
      )
      .subscribe((results: string[]) => {
        this.items = results;
      });
  }

  // Search function to filter mock data
  searchItems(searchTerm: string) {
    const filteredResults = this.mockData.filter((item) =>
      item.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return of(filteredResults);
  }
}
