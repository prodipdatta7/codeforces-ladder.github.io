import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TAGS } from 'src/app/constants/tags';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Output() onFilterApplied: EventEmitter<any> = new EventEmitter();
  filterForm: FormGroup = new FormGroup({
    contestId: new FormControl(),
    index: new FormControl(),
    tags: new FormControl(),
    minpoints: new FormControl(),
    maxpoints: new FormControl(),
    sortOrder: new FormControl(),
    orderBy: new FormControl(),
  });
  tagList = TAGS;

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.ContestId.setValue(null);
    this.Index.setValue(null);
    this.Tags.setValue(null);
    this.Minpoints.setValue(null);
    this.Maxpoints.setValue(null);
    this.SortOrder.setValue(null);
    this.OrderBy.setValue(null);
  }

  allEmpty() {
    return !this.ContestId.value && !this.Index.value && !this.Maxpoints.value && (!this.Tags.value || !this.Tags.value.length) && !this.SortOrder.value ;
  }

  get ContestId(): FormControl {
    return this.filterForm.get('contestId') as FormControl;
  }
  get Index(): FormControl {
    return this.filterForm.get('index') as FormControl;
  }
  get Minpoints(): FormControl {
    return this.filterForm.get('minpoints') as FormControl;
  }
  get Maxpoints(): FormControl {
    return this.filterForm.get('maxpoints') as FormControl;
  }
  get Tags(): FormControl {
    return this.filterForm.get('tags') as FormControl;
  }
  get SortOrder(): FormControl {
    return this.filterForm.get('sortOrder') as FormControl;
  }
  get OrderBy(): FormControl {
    return this.filterForm.get('orderBy') as FormControl;
  }

  isDisabled(): boolean {
    return (
      this.allEmpty() ||
      ((this.Minpoints?.value || this.Maxpoints?.value) &&
        !(this.Minpoints?.value && this.Maxpoints?.value)) ||
      ((this.SortOrder?.value || this.OrderBy?.value) &&
        !(this.SortOrder?.value && this.OrderBy?.value))
    );
  }

  FilterApplied() {
    const filterValue = this.filterForm.value;
    if (this.Minpoints?.value && this.Maxpoints?.value) {
      if (this.Minpoints?.value > this.Maxpoints?.value) {
        this.Maxpoints.setValue(this.Minpoints.value);
      }
    }
    this.onFilterApplied.emit(filterValue);
  }
}
