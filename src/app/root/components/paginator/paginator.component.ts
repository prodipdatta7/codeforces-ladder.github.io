import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent implements OnInit, OnChanges {
  @Input() totalSize = 0;
  @Input() pageSize = 15;
  @Input() pageNumber = 1;
  @Input() pageOptions: number[] = [15];
  @Output() onPageNumberChange: EventEmitter<number> = new EventEmitter();
  @Output() onPageSizeChange: EventEmitter<number> = new EventEmitter();

  totalPages = 0;
  pageNumbers: number[] = [];
  paginatorForm!: FormGroup;
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.paginatorForm = this.fb.group({
      paginator: [this.pageSize],
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['totalSize'].currentValue) {
      this.totalPages = Math.ceil(this.totalSize / this.pageSize);
    }
  }

  generatePages() {
    for (let i = 1; i < this.totalPages; ++i) {
      this.pageNumbers.push(i);
    }
  }

  pageChanged(page: number): void {
    this.pageNumber = page;
    this.onPageNumberChange.emit(page);
  }

  pageSizeChage(event: any) {
    this.pageSize = event.option.value;
    this.totalPages = Math.ceil(this.totalSize / this.pageSize);
    if (this.totalPages < this.pageNumber) {
      this.pageNumber = this.totalPages;
      this.pageChanged(this.pageNumber);
    }
    this.onPageSizeChange.emit(this.pageSize);
  }

  pageBack() {
    this.pageNumber = Math.max(1, this.pageNumber - 1);
    this.pageChanged(this.pageNumber);
  }
  pageNext() {
    this.pageNumber = Math.min(this.totalPages, this.pageNumber + 1);
    this.pageChanged(this.pageNumber);
  }

  onSelectPage(page: number): void {
    this.pageNumber = page;
    this.pageChanged(page);
  }
}
