import { Component, OnInit } from '@angular/core';
import { Type, TypeState } from '../../models/type';
import { Store } from '@ngrx/store';
import { getType } from '../../store/actions/type.actions';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { Expense, ExpensesStateType } from '../../models/expense';
import { addExpense, getExpenses, updateExpense } from '../../store/actions/expense.actions';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrl: './create-update.component.css'
})
export class CreateUpdateComponent implements OnInit {
  isEdit: boolean = false
  getAllTypes: Type[] = []
  expenseForm: FormGroup = new FormGroup({})
  selectedExpense?: Expense
  currentPage: number = 1
  limit: number = 5
  total: number = 0
  searchType: string = ""
  sortByOrder: string = "desc"

  maxDate: string = ""
  minDate: string = ""

  constructor(
    private store: Store<{ type: TypeState, expense: ExpensesStateType }>,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.expenseForm = this.formBuilder.group({
      type: ["", Validators.required],
      title: ["", Validators.required],
      desc: ["", Validators.required],
      date: ["", Validators.required],
      amount: ["", Validators.required],
      tags: this.formBuilder.array([
        this.formBuilder.group({
          key: ["", Validators.required],
          value: ["", Validators.required],
        })
      ])
    })


    const today = new Date();
    this.maxDate = this.formatDate(today);

    const sixtyDaysAgo = new Date();
    sixtyDaysAgo.setDate(today.getDate() - 60);
    this.minDate = this.formatDate(sixtyDaysAgo);


    this.getTypes()
    this.editExpense()

  }


  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);

    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  getTypes() {
    this.store.dispatch(getType({ isFetchAll: false, page: this.currentPage, limit: this.limit, searchType: this.searchType, sortByOrder: this.sortByOrder }))
    this.store.select(state => state.type).subscribe((data) => {
      this.getAllTypes = data.types

      this.total = data.total
      this.currentPage = data.page

    })
  }

  onSubmit() {
    if (this.expenseForm.valid) {
      if (this.selectedExpense) {
        this.isEdit = true
        this.updateExpense()
      } else {
        this.isEdit = false
        this.addExpense()
      }
    } else {
      this.expenseForm.markAllAsTouched()
      this.toastr.error("All fields are requied", "Error", {
        timeOut: 5000,
        closeButton: true,
        progressBar: true
      })
    }
  }

  get tags() {
    return this.expenseForm.get('tags') as FormArray
  }

  removeTag(id: number) {
    this.tags.removeAt(id)
  }

  addTag() {
    this.tags.push(this.formBuilder.group({
      key: ["", Validators.required],
      value: ["", Validators.required],
    }))
  }

  validateField(field: string) {
    return this.expenseForm.get(field)?.touched && this.expenseForm.get(field)?.errors ? 'is-invalid' : ''
  }

  addExpense() {
    this.store.dispatch(addExpense({ expenseData: this.expenseForm.value }))
  }

  editExpense() {
    const id = this.activeRoute.snapshot.params?.['id']

    this.store.select(state => state.expense).subscribe((data) => {
      this.selectedExpense = data.expenses.find(item => item._id === id)
    })

    if (this.selectedExpense) {
      this.isEdit = true
      this.expenseForm.patchValue({
        type: this.selectedExpense.type,
        title: this.selectedExpense.title,
        desc: this.selectedExpense.desc,
        date: this.selectedExpense.date,
        amount: this.selectedExpense.amount
      })
      this.setTags(this.selectedExpense?.tags || [])
    }
  }

  setTags(tags: { key: string; value: string }[]): void {
    const tagsFormArray = this.expenseForm.get('tags') as FormArray;
    tagsFormArray.clear()

    tags.forEach(tag => {
      tagsFormArray.push(this.formBuilder.group({
        key: [tag.key, Validators.required],
        value: [tag.value, Validators.required]
      }));
    });
  }

  updateExpense() {
    if (this.selectedExpense && this.selectedExpense._id) {
      this.store.dispatch(updateExpense({ id: this.selectedExpense?._id, selectedExpense: this.expenseForm.value }))
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--
      this.getTypes()
    }
  }

  nextPage() {
    if (this.currentPage < (this.total / this.limit)) {
      this.currentPage++
      this.getTypes()
    }
  }
}
