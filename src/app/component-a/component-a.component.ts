import { ConfirmDialogComponent } from './../dialog/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { getItems } from './store/component-a-store.actions';
import { map } from 'rxjs/operators';
import { ComponentAStoreFacade } from './store/component-a-store.facade';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-component-a',
  templateUrl: './component-a.component.html',
  styleUrls: ['./component-a.component.css']
})
export class ComponentAComponent implements OnInit {
  list$ = this.facade.list$.pipe(
    map(n => !n || n.length == 0 ? null : n)
  );

  active = null;
  formGroup: FormGroup;
  @ViewChild('form') form: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private facade: ComponentAStoreFacade,
    private dialog: MatDialog,
  ) {
    this.formGroup = formBuilder.group({
      name: [null, Validators.required]
    })
  }

  ngOnInit(): void {
    this.facade.init();
    this.facade.getItems();
  }

  onAdd() {
    this.facade.addItem({id: null, name: this.formGroup.controls.name.value, added: Date.now()});
    this.form.resetForm();
    this.formGroup.reset();
  }
  onDelete(item) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '400px',
      data: {context: item.id+' : '+item.name, result: false}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.facade.removeItem(item);
      }
    });
  }

}
