import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})

export class CheckoutComponent implements OnInit {
    cart = [1];
    cartTotal = 0;
    checkoutForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      addressOne: ['', Validators.required],
      addressTwo: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });

    constructor(private fb: FormBuilder, private productService: ProductsService, private router: Router) {}

    ngOnInit() {
      this.productService.getCart().subscribe((data: any) => {
        this.cart = [...data];
        this.cartTotal = this.cart.reduce((acc : any, cur: any) => acc + Number(cur.price), 0);
        console.log("this.cart", this.cart);
      });

  }

  doCheckout() {
    console.log("doCheck working");
    const order = {
      ...this.checkoutForm.value,
      items: this.cart
   };
   this.productService.checkout(order).subscribe(res => {
    console.log("response in product liat", res)
        this.router.navigate(['/products']);
   }); 
  }

}
