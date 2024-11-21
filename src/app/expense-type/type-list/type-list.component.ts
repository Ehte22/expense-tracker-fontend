import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Type, TypeState } from '../../models/type';
import { addType, deleteType, getType, updateType } from '../../store/actions/type.actions';
import { TypeService } from '../../services/type.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrl: './type-list.component.css'
})
export class TypeListComponent implements OnInit {
  isDeleteSuccess: Observable<boolean> = new Observable()
  typeForm: FormGroup = new FormGroup({})
  getAllType: Type[] = []
  selectedType: Type | null = null
  searchType: string = ""
  currentPage: number = 1
  limit: number = 5
  total: number = 0
  pages: number[] = [];
  sortByOrder: string = "desc"

  constructor(
    private formBuilder: FormBuilder,
    private store: Store<{ type: TypeState }>,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.typeForm = this.formBuilder.group({
      type: ["", Validators.required]
    })

    this.getTypes()

    this.isDeleteSuccess = this.store.select(state => state.type.isDeleteSuccess)
    this.isDeleteSuccess.subscribe((isScucess) => {
      if (isScucess) {
        this.getTypes()
      }
    })

  }

  handleChange(e: Event) {
    const input = e.target as HTMLInputElement
    if (input.type === "search") {
      this.searchType = input.value.toLowerCase()
    }
    this.currentPage = 1
    this.getTypes()
  }

  sortByDate(order: string) {
    this.sortByOrder = order;
    this.getTypes()
  }

  onSubmit() {
    if (this.typeForm.valid) {
      if (this.selectedType?._id) {
        this.store.dispatch(updateType({ id: this.selectedType._id, types: this.typeForm.value }))
      } else {
        this.store.dispatch(addType({ types: this.typeForm.value }))
      }
      this.typeForm.reset()
    } else {
      this.typeForm.markAllAsTouched()
      this.toastr.error("Type is required", "Error", {
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      })
    }

  }

  getTypes() {
    this.store.dispatch(getType({
      page: this.currentPage,
      limit: this.limit,
      searchType: this.searchType,
      sortByOrder: this.sortByOrder
    }))
    this.store.select(state => state.type).subscribe((data) => {
      this.getAllType = data.types

      this.total = data.total
      this.currentPage = data.page
    })
  }

  deleteType(id: string) {
    this.store.dispatch(deleteType({ id }))
  }

  editType(data: Type) {
    this.selectedType = data
    this.typeForm.patchValue({
      type: data.type
    })
  }

  onPageChange(page: number) {
    this.currentPage = page
    this.getTypes()
  }
}
