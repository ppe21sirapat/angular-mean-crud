import { Component, NgZone, OnInit } from '@angular/core' ;
import { Router, ActivatedRoute } from "@angular/router" ;
import { CrudService } from "./../../service/crud.service" ;
import { FormGroup, FormBuilder } from "@angular/forms" ;

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

 getId: any ;
 updateForm: FormGroup ;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activateRoute: ActivatedRoute,
    private crudService: CrudService,
  ) { 
      this.getId = this.activateRoute.snapshot.paramMap.get('id') ;
      this.crudService.detailProduct(this.getId).subscribe(res => {
        this.updateForm.setValue({
          name: res['name'],
          price: res['price'],
          description: res['description']
        })
      })

      this.updateForm = this.formBuilder.group({
        name: [''],
        price: [''],
        description: ['']
      })
  }

  ngOnInit(): void {
  }

  onUpdate(): any {
    this.crudService.updateProduct(this.getId, this.updateForm.value).subscribe(() => {
      this.ngZone.run(() => this.router.navigateByUrl('/product-list'))
    }, (err) => {
      console.log(err) ;
    })
  }

}
