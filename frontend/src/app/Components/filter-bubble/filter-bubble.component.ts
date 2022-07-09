import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';

@Component({
  selector: 'app-filter-bubble',
  templateUrl: './filter-bubble.component.html',
  styleUrls: ['./filter-bubble.component.css'],
})
export class FilterBubbleComponent implements OnInit {
  filter: string = '';

  constructor(private dataSharingService: DataSharingService) {}

  ngOnInit(): void {
    this.dataSharingService.getFilter().subscribe({
      next: (col) => {
        this.filter = col;
      },
    });
  }

  remove() {
    this.dataSharingService.removeFilter();
  }
}
