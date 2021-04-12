import { Component, OnInit } from '@angular/core';
import { CrudService } from '../../service/crud.service' ;
import Swal from 'sweetalert2' ;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  product: any = [] ;
  constructor(private crudService:CrudService) { }

  ngOnInit(): void {
    this.crudService.getProduct().subscribe(res => {
      console.log(res) 
      this.product = res ;
    })
  }

  deleteClick(id: any, i: any) {
    console.log(id) ;
    Swal.fire({
      title: 'Are you sure?',
      text: 'Delete This Product',
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
      confirmButtonColor: '#ffa500',
      focusCancel: true,
    }).then((result) => {
      if (result.value) {
          this.crudService.deleteProduct(id).subscribe((res) => {
          this.product.splice(i, 1) ;
        })
      } 
    })

    // if(window.confirm('Do you want to delete?'))
    // {
    //   this.crudService.deleteProduct(id).subscribe((res) => {
    //     this.product.splice(i, 1) ;
    //   })
    // }
  }
}
