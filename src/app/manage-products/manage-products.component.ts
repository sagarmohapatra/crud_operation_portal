import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProductService } from '../appService/product.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
  styleUrls: ['./manage-products.component.scss'],
})
export class ManageProductsComponent {
  constructor(private _sagaProduct: ProductService) {}
  dataTitle: any = this._sagaProduct.getDataTitle();
  fetching: any = false;

  @ViewChild('id') id: any = ElementRef;
  @ViewChild('name') name: any = ElementRef;
  @ViewChild('price') price: any = ElementRef;

  editMode: any = false;
  products = [
    { id: 'p1', name: 'Laptop', price: 45000 },
    // {
    //   id: 'p2',
    //   name: 'mobile',
    //   price: 55000,
    // },
    // { id: 'p3', name: 'tv', price: 56000 },
    // { id: 'p4', name: 'tv', price: 77000 },
  ];
  editIndex:any;
  onAddProduct(id: any, name: any, price: any) {
    if (this.editMode) {
      console.log("show",this.products[this.editIndex]);
      
      this.products[this.editIndex]={
        id: id.value,
        name: name.value,
        price: price.value,
      }
      this.editMode=false
      this.id.nativeElement.value ='';
      this.name.nativeElement.value = '';
      this.price.nativeElement.value = '';
    } else {
      this.products.push({
        id: id.value,
        name: name.value,
        price: price.value,
      });
    }
    this. onSubmit()
  }
  onFetchData() {
    this.fetching = true;
    this._sagaProduct.fetchProduct().subscribe((Response) => {
      console.log(Response),
        (this.products = JSON.parse(JSON.stringify(Response)));
      this.fetching = false;
    });
  }
  onSubmit() {
    this._sagaProduct.saveProducts(this.products).subscribe(
      (Response) => console.log(Response),
      (err) => console.log(err)
    );
  }

  onDeleteProduct(i: any) {
    if (confirm('do you want to delete this product')) {
      this.products.splice(i, 1);
      this.onSubmit();
    }
  }
  
  onEditProduct(e: any) {
    this.editMode = true;
    this.editIndex=e
    console.log(this.editIndex);
    
    console.log(this.products[e].id);
    this.id.nativeElement.value = this.products[e].id;
    this.name.nativeElement.value = this.products[e].name;
    this.price.nativeElement.value = this.products[e].price;
  }
  ngOnInit() {
    this.onFetchData();
  }
}
