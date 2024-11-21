import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Type } from '../models/type';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TypeService {
  baseUrl: string = environment.BACKEND_URL = 'type'

  constructor(
    private http: HttpClient
  ) { }

  addType(expenseType: Type): Observable<{ result: Type, message: string }> {
    console.log(expenseType);

    return this.http.post<{ result: Type, message: string }>(`${this.baseUrl}/add-type`, expenseType, {
      withCredentials: true
    })
  }

  getTypes(page: number, limit: number, searchType: string, sortByOrder: string, isFetchAll?: boolean,): Observable<{ result: Type[], message: string, page: number, limit: number, total: number }> {
    const params = new HttpParams()
      .set("page", page.toString())
      .set("limit", limit.toString())
      .set("searchType", searchType)
      .set("sortByOrder", sortByOrder)
      .set("isFetchAll", isFetchAll ? true : false)
    return this.http.get<{ result: Type[], message: string, page: number, limit: number, total: number }>(this.baseUrl, {
      params,
      withCredentials: true
    })
  }

  updateType(id: string, expenseType: Type): Observable<{ result: Type, message: string, page: number, limit: number, total: number }> {
    return this.http.put<{ result: Type, message: string, page: number, limit: number, total: number }>(`${this.baseUrl}/update-type/${id}`, expenseType, {
      withCredentials: true
    })
  }

  deleteType(id: string): Observable<{ message: string }> {
    console.log(id);

    return this.http.delete<{ message: string }>(`${this.baseUrl}/delete-type/${id}`, {
      withCredentials: true
    })
  }

}
