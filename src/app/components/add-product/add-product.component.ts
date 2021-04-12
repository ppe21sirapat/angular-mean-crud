import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router' ;
import { CrudService } from './../../service/crud.service' ;
import { FormGroup, FormBuilder } from '@angular/forms' ;


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  productForm : FormGroup ;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone:NgZone,
    private crudService:CrudService
    ) {
        this.productForm = this.formBuilder.group ({
        name: [''],
        price: [''],
        description: ['']
        })
      }

  ngOnInit(): void {
  }

  onSubmit(): any {
    this.crudService.addProduct(this.productForm.value)
    .subscribe(() => {
      console.log('Product Add Success') ;
      this.ngZone.run(() => this.router.navigateByUrl('/product-list'))
    }, (err) => {
      console.log(err) ;
    })
  }

}
