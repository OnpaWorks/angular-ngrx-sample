import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../dialog/confirm-dialog/confirm-dialog.component';
import { ComponentBStoreFacade } from './store/component-b-store.facade';

@Component({
  selector: 'app-component-b',
  templateUrl: './component-b.component.html',
  styleUrls: ['./component-b.component.css']
})
export class ComponentBComponent implements OnInit {
  list$ = this.facade.list$.pipe(
    map(n => !n || n.length == 0 ? null : n)
  );

  active = null;
  formGroup: FormGroup;
  @ViewChild('form') form: NgForm;

  constructor(
    private formBuilder: FormBuilder,
    private facade: ComponentBStoreFacade,
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
    this.facade.addItem({id: null, name: this.formGroup.controls.name.value});
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
