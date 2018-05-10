import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, ValidatorFn, Validators, AbstractControl } from '@angular/forms';

import { ValidatorsService } from '../forms/validators.service';
import { JsonMetadata, METADATA_KEY, PatternMetadata, MinMetadata, MaxMetadata, RangeMetadata, DisplayNameMetadata, CompareMetadata } from './decorators';
import { BehaviorSubject } from 'rxjs';
import { Metadata } from '../types';
import { defineHideProperty } from '../common/methods/define-hide-property';
import { valueToDisplay } from '../common/methods/value-to-display';
import { isObject } from '../common/methods/is-object';


export interface Validator { name: string; validatorFn: ValidatorFn; }

export class FAbstractControl {
    constructor() {
        defineHideProperty(this, '$parent', null);
    }

    $parent: FGroup | FArray | null
    metadatas: Metadata[] = [];
    getMetadata(key: string) {
        let data = this.metadatas.find(m => m.key == key);
        return data ? data.value : null;
    }
    hasMetadata(key: string) {
        let data = this.metadatas.find(m => m.key == key);
        return data != undefined;
    }
    displayName: string
    validators: BehaviorSubject<Validator[]>;
}

export class FArray extends FAbstractControl {
    controls: FGroup[];
}

export class FGroup extends FAbstractControl {
    controls: {
        [key: string]: FAbstractControl;
    } = {};

    // fGroup 并不会把所有的 prop 制造处理, 比如 foreignResource, 但是可能我们需要到反射, 比如 foreignKey 需要 foreignResource 的标签
    // 所以就简单的方法就是保留整个 resource, 那么就可以通过 $parent.resource 反射出所有的 prop 了
    resource: any

    get(pathString: string) {
        // 抄袭 ng 的 
        let path: (string | number)[] = pathString.split('.');
        return path.reduce((v: FAbstractControl, key) => {
            if (v instanceof FGroup) {
                return v.controls[key] || null;
            }
            else if (v instanceof FArray) {
                return v.controls[key as number] || null;
            }
            else {
                return null;
            }
        }, this);
    }
}

export class FControl extends FAbstractControl {
    constructor(data?: Partial<FControl>) {
        super();
        Object.assign(this, data);
    }
    defaultValue: any
    displayName: string
}



@Injectable()
export class EdmFormService {

    constructor(
        protected v: ValidatorsService,
    ) { }

    buildFormEDM(resource: any, fGroup = new FGroup(), parentDisplayName?: string): FGroup {
        // note :
        // Json JAny & JArrayAny 不处理. take care 哦.
        // 不需要看 odata.type了, resource should be is after parse.
        fGroup.resource = resource;
        fGroup.validators = new BehaviorSubject([]);
        const keys = Object.keys(resource);
        keys.forEach(key => {
            const value = resource[key];
            const isResource = Reflect.hasMetadata(METADATA_KEY.Resource, resource, key);
            const isResources = Reflect.hasMetadata(METADATA_KEY.Resources, resource, key);
            const isManyToMany = Reflect.hasMetadata(METADATA_KEY.ManyToMany, resource, key);
            const isComplexType = Reflect.hasMetadata(METADATA_KEY.ComplexType, resource, key);

            //check json
            const jsonMetaData = Reflect.getMetadata(METADATA_KEY.Json, resource, key) as JsonMetadata;
            const isJson = Reflect.hasMetadata(METADATA_KEY.Json, resource, key);
            const isJsonWithConstructor = isJson && jsonMetaData.hasConstructor;

            let metadatas = Reflect.getMetadataKeys(resource, key).map(metadataKey => {
                return {
                    key: metadataKey,
                    value: Reflect.getMetadata(metadataKey, resource, key)
                }
            });

            let displayNameMetadata: DisplayNameMetadata = Reflect.getMetadata(METADATA_KEY.FormDisplayName, resource, key) || Reflect.getMetadata(METADATA_KEY.DisplayName, resource, key);
            let displayName = displayNameMetadata ? displayNameMetadata.name : valueToDisplay(key, 'spaceFirstUpper');
            if (parentDisplayName) displayName = parentDisplayName + ' ' + displayName;

            let validators: Validator[] = [];
            let type = Reflect.getMetadata(METADATA_KEY.Type, resource, key);
            if (Reflect.hasMetadata(METADATA_KEY.Required, resource, key)) {
                validators.push({ name: 'required', validatorFn: this.v.required() });
            }
            if (Reflect.hasMetadata(METADATA_KEY.Pattern, resource, key)) {
                const patternMetadata = Reflect.getMetadata(METADATA_KEY.Pattern, resource, key) as PatternMetadata;
                validators.push({ name: 'pattern', validatorFn: Validators.pattern(patternMetadata.pattern) });
            }
            if (Reflect.hasMetadata(METADATA_KEY.Min, resource, key)) {
                let { min, equal } = Reflect.getMetadata(METADATA_KEY.Min, resource, key) as MinMetadata;
                validators.push({ name: 'min', validatorFn: this.v.min(min, equal) });
            }
            if (Reflect.hasMetadata(METADATA_KEY.Max, resource, key)) {
                let { max, equal } = Reflect.getMetadata(METADATA_KEY.Max, resource, key) as MaxMetadata;
                validators.push({ name: 'max', validatorFn: this.v.max(max, equal) });
            }
            if (Reflect.hasMetadata(METADATA_KEY.Range, resource, key)) {
                let { min, max, equal } = Reflect.getMetadata(METADATA_KEY.Range, resource, key) as RangeMetadata;
                validators.push({ name: 'range', validatorFn: this.v.range(min, max, equal) });
            }
            if (Reflect.hasMetadata(METADATA_KEY.Amount, resource, key)) {
                validators.push({ name: 'min', validatorFn: this.v.min(0) });
            }
            if (Reflect.hasMetadata(METADATA_KEY.Email, resource, key)) {
                validators.push({ name: 'email', validatorFn: this.v.email() });
            }
            if (Reflect.hasMetadata(METADATA_KEY.SixDigitToken, resource, key)) {
                validators.push({ name: 'sixDigitToken', validatorFn: this.v.sixDigitToken() });
            }
            if (type === Date) {
                validators.push({ name: 'date', validatorFn: this.v.date() });
            }

            if (value != null && (isResource || isComplexType || (isJsonWithConstructor && isObject(value)))) {
                let childGroup = new FGroup();
                childGroup.$parent = fGroup;
                childGroup.metadatas = metadatas;
                childGroup.displayName = displayName;
                fGroup.controls[key] = this.buildFormEDM(value, childGroup, displayName); //递归 
            }
            else if (value != null && ((isResources && !isManyToMany) || (isJsonWithConstructor && Array.isArray(value)))) {
                let fArray = fGroup.controls[key] = new FArray();
                fArray.$parent = fGroup;
                fArray.metadatas = metadatas;
                (fArray as FArray).validators = new BehaviorSubject(validators);
                (value as any[]).forEach(v => {
                    let childGroup = new FGroup();
                    childGroup.$parent = fArray;
                    (fArray as FArray).controls.push(this.buildFormEDM(v, childGroup)); // array 没有 parent display name 的概念
                });
            }
            else {
                let fControl = new FControl({
                    defaultValue: value,
                    validators: new BehaviorSubject(validators),
                    metadatas: metadatas,
                    $parent: fGroup,
                    displayName: displayName
                });
                fGroup.controls[key] = fControl;
            }
        });

        // 处理 Compare Validation, 这个特别麻烦因为它涉及到 2 个 fControl (需要另一个的 display name)
        // 必须等到 2 个 fControl 都好了才能处理. 所以在这个环节才处理它.
        Object.keys(fGroup.controls).forEach(key => {
            let fControl = fGroup.controls[key];
            if (fControl instanceof FControl) {
                let compareMetadata = fControl.getMetadata(METADATA_KEY.Compare) as CompareMetadata;
                if (compareMetadata) {
                    let validators = fGroup.validators.value;
                    let linkToDisplayName = (fControl.$parent as FGroup).get(compareMetadata.linkTo)!.displayName;
                    fGroup.validators.next([
                        ...validators,
                        { name: 'compare', validatorFn: this.v.compare(key, compareMetadata.linkTo, linkToDisplayName, compareMetadata.type) }
                    ]);
                }
            }
        });
        return fGroup;
    }

    buildNgForm(edm: FGroup): FormGroup {
        return this.buildNgControl(edm) as FormGroup;
    }

    easyBuildNgForm(resource: any): FormGroup {
        const edm = this.buildFormEDM(resource);
        return this.buildNgForm(edm);
    }

    buildNgControl(edm: FAbstractControl): AbstractControl {
        let abstractControl: AbstractControl = undefined!;
        if (edm instanceof FGroup) {
            const keys = Object.keys(edm.controls);
            const formGroup = new FormGroup({});
            keys.forEach(key => {
                formGroup.addControl(key, this.buildNgControl(edm.controls[key])); //递归
            });
            abstractControl = formGroup;
        }
        else if (edm instanceof FArray) {
            let formArray = new FormArray(edm.controls.map(v => this.buildNgControl(v))); //递归           
            abstractControl = formArray;
        }
        else if (edm instanceof FControl) {
            let formControl = new FormControl(edm.defaultValue);
            abstractControl = formControl;
        }
        edm.validators.subscribe(validators => {
            abstractControl.setValidators(validators.map(v => v.validatorFn));
            abstractControl.updateValueAndValidity();
        });
        return abstractControl;
    }
}
