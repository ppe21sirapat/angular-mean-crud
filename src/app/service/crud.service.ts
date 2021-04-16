import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators' ;
import { Observable, throwError } from 'rxjs' ;
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http' ;

export class product {
  _id! : String ;
  name! : String ;
  price! : String ;
  description! : String ;
}

@Injectable({
  providedIn: 'root'
})

export class CrudService {

  // Node Express API 
  REST_API: string = 'http://localhost:8000/api'

  // Http Headers
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json') ;

  constructor(private httpClient: HttpClient) { }

  // ADD
  addProduct(data: product): Observable<any> {
    let API_URL = `${this.REST_API}/add-product` ; 
    return this.httpClient.post(API_URL, data)
           .pipe(catchError(this.handleError)) 
  }

  // Get product
  getProduct() {
    return this.httpClient.get(`${this.REST_API}`) 
  }

  // Detail product
  detailProduct(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/detail-product/${id}` ;
    return this.httpClient.get(API_URL, {headers: this.httpHeaders})
           .pipe(map ((res: any) => {
             return res || {}
           }),
           catchError(this.handleError) 
           )
  }

  // Update 
  updateProduct(id: any, data: any): Observable<any> {
    let API_URL = `${this.REST_API}/update-product/${id}` ;
    return this.httpClient.put(API_URL, data, {headers: this.httpHeaders})
           .pipe(
             catchError(this.handleError)
           )
  }

  //Delete 
  deleteProduct(id: any): Observable<any> {
    let API_URL = `${this.REST_API}/delete-product/${id}` ;
    return this.httpClient.delete(API_URL, {headers: this.httpHeaders})
           .pipe(
             catchError(this.handleError)
           )
  }

  //ERROR
  handleError(error: HttpErrorResponse)
  {
    let errorMessage = '' ;
    if(error.error instanceof ErrorEvent)
    {
      // Handle client error
      errorMessage = error.error.message ;
    }
    else
    {
      // Handle server error
      errorMessage = `Error Code: ${error.status} \n Message: ${error.message}` ;
    }
    console.log(errorMessage) ;
    return throwError(errorMessage) ;
  }


}


  

