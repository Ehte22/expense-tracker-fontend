import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css'
})
export class PaginationComponent implements OnChanges {
  @Input() currentPage: number = 1
  @Input() limit: number = 5
  @Input() total: number = 0
  @Output() pageChange = new EventEmitter<number>();


  pages: number[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['currentPage'] || changes['limit'] || changes['total']) {
      this.calculatePages()
    }
  }

  calculatePages() {
    const totalPages = Math.ceil(this.total / this.limit);
    this.pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.pageChange.emit(this.currentPage)
    }
  }

  nextPage() {
    if (this.currentPage < this.pages.length) {
      this.currentPage++
      this.pageChange.emit(this.currentPage)
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.total)
      this.currentPage = page
    this.pageChange.emit(this.currentPage)
  }
}
