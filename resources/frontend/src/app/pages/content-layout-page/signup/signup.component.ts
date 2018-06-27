import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @ViewChild('f') registerForm: NgForm;

  constructor() { }

  ngOnInit() {
  }

  //  On submit click, reset field value
  onSubmit() {
    this.registerForm.reset();
  }
}
