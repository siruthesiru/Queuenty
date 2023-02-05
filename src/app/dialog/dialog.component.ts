import { Component } from '@angular/core';
import { Form, FormGroup } from '@angular/forms';
import {FormBuilder, Validators} from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})

export class DialogComponent {
  transactionForm !: FormGroup;

  constructor(private formBuilder : FormBuilder, private api : ApiService, private dialogRef : MatDialogRef<DialogComponent>) {

  }

  ngOnInit(): void {
    this.transactionForm = this.formBuilder.group({
      idNumber : ['', Validators.max(99999999),],
      transactionType : ['', Validators.required],
      amount : ['', Validators.required],
      remarks : ['',],
    })

    
  }

  queueTransaction() {

    if(this.transactionForm.valid) {
      this.api.postTransaction(this.transactionForm.value)
      .subscribe({
        next:(res)=>{
          alert("Transaction queued. Please wait your turn.")
          this.transactionForm.reset();
          this.dialogRef.close();
        },
        error:()=>{
          alert("An error has occured. Please try again.")
        }
        
      })
    }
  }
}