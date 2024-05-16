import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent implements OnChanges {
  constructor() {}
  currentPage: number = 1;
  @Input() itemsPerPage: number = 0;
  @Input() totalItems: number = 0;
  @Output() pageChanges: EventEmitter<number> = new EventEmitter<number>();

  public pages: number[] = [];
  public totalPages = 0;

  ngOnChanges(): void {
    this.getTotalPages();
  }

  public nextPage(): void {
    this.currentPage++;

    this.pageChanges.emit(this.currentPage);
  }

  public prevPage(): void {
    this.currentPage--;
    this.pageChanges.emit(this.currentPage);
  }

  public goToPage(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.pageChanges.emit(this.currentPage);
  }

  private getTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);

    this.pages = Array(this.totalPages)
      .fill(0)
      .map((x, i) => i + 1);
  }
}
