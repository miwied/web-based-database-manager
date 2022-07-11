import { Component, OnInit } from '@angular/core';
import { DataSharingService } from 'src/app/services/data-sharing.service';
import { IFilter } from 'src/app/models/filter';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter-bubble',
  templateUrl: './filter-bubble.component.html',
  styleUrls: ['./filter-bubble.component.css'],
})
export class FilterBubbleComponent implements OnInit {
  filter = {} as IFilter;
  filterForm: FormGroup;

  constructor(
    private dataSharingService: DataSharingService,
    private fb: FormBuilder
  ) {
    this.filterForm = this.fb.group({
      filterControl: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.dataSharingService.getFilter().subscribe({
      next: (filter) => {
        this.filter = filter;
        let value =
          filter.filterValue === 'm'
            ? 'Männlich'
            : filter.filterValue === 'w'
            ? 'Weiblich'
            : filter.filterValue === 'd'
            ? 'Divers'
            : filter.filterValue === false
            ? 'Nein'
            : filter.filterValue === true
            ? 'Ja'
            : filter.filterValue;
        this.filterForm.get('filterControl')?.setValue(value);
      },
    });
  }

  remove() {
    this.dataSharingService.removeFilter();
  }

  updateFilter(e: any) {
    if (e.key === 'Escape' || e.keyCode === 27) this.remove();
    else if (e.key === 'Enter' || e.keyCode === 13) {
      let formValue = this.filterForm.get('filterControl')?.value;
      let filterValue;
      switch (formValue) {
        case 'Männlich':
          filterValue = 'm';
          break;
        case 'Weiblich':
          filterValue = 'w';
          break;
        case 'Divers':
          filterValue = 'd';
          break;
        case 'Nein':
          filterValue = false;
          break;
        case 'Ja':
          filterValue = true;
          break;
        default:
          filterValue = formValue;
          break;
      }
      this.filter.filterValue = filterValue;
      this.dataSharingService.applyFilter(
        this.filter.filterValue,
        this.filter.column,
        this.filter.filterName
      );
    }
  }
}
