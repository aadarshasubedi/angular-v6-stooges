import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AbstractFormComponent } from '../../../form/components/abstract-form.component';
import { ValidatorsService } from '../../../form/services/validators.service';
import { EControl } from '../../../entity/models/EControl';
import { FormService } from '../../../form/services/form.service';


export class ConfirmDialogData {
  constructor(data?: Partial<ConfirmDialogData>) {
    Object.assign(this, data);
  }
  title: string;
  keyword: string;
  inputType: 'password' | 'number'; //其它的应该不可能吧
}

export class ConfirmForm {

  constructor(data?: Partial<ConfirmForm>) {
    Object.assign(this, data);
  }

  keyword = '';
}

@Component({
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmDialogComponent extends AbstractFormComponent implements OnInit {

  constructor(
    cdr: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private formService: FormService,
    private v: ValidatorsService
  ) {
    super(cdr);
  }

  inputType = 'text';

  async ngOnInit() {
    const eGroup = this.formService.buildFormEDM(new ConfirmForm());
    if (this.data.keyword) {
      let keywordControl = (eGroup.get('keyword') as EControl);
      keywordControl.validators.next([
        ...keywordControl.validators.value,
        { name: 'required', validatorFn: this.v.required() },
        { name: 'matchWithString', validatorFn: this.v.matchWithString(this.data.keyword) }
      ])  
    }
    if (this.data.inputType) {
      this.inputType = this.data.inputType;
    }
    this.form = this.formService.buildNgForm(eGroup);
    this.data.title = this.data.title || 'Are you sure ?';
    this.cdr.markForCheck();
  }

  form: FormGroup;

  protected async internalSubmitAsync(): Promise<boolean> {
    this.dialogRef.close('ok');
    return true;
  }
}
