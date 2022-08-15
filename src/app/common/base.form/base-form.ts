import { Injectable, OnDestroy } from "@angular/core";
import { FormGroup, ValidationErrors } from "@angular/forms";
import { Subscription } from "rxjs";
import { COFService } from "src/app/_service/COFService";
import { AbstractCrmRequest } from "src/app/_shared/abstract/AbstractCrmRequest";
import { OnDelete } from "./interfaces/delete-hook";
import { OnSave } from "./interfaces/save-hook";

@Injectable()
export abstract class BaseForm implements OnDestroy, OnSave, OnDelete {

    form!: FormGroup;
    private subscription$: Subscription = new Subscription();

    constructor(public cof: COFService) { }

    abstract prepareRequest(): any;

    private validateForm(): void {
        this.form.markAllAsTouched();
    }

    beforeSave(): void { }
    
    onValidError(): void{ }

    saveCallback(result: Object): void { }

    errorCallback(error: Object): void { }

    afterSave(): void { }

    beforeDelete(): void { }

    afterDelete(): void { }

    private sendRequest(): void {
        this.subscription$.add(this.cof
            .doRequest(this.prepareRequest())
            .subscribe({
                next: (v) => this.saveCallback(v),
                error: (e) => this.errorCallback(e),
                complete: () => this.afterSave()
            }));
    }

    public saveProcess() {
        this.beforeSave();
        this.validateForm();
        if (this.form?.valid || this.form == null) {
            this.sendRequest();
        }
        if(!this.form?.valid){
            this.onValidError();
        }
    }

    public deleteProcess() {
        this.beforeDelete();
        this.afterDelete();
    }


    f(formControlName: string): boolean {
        let formControl = this.form.get(formControlName);
        return formControl!.status == 'INVALID' && formControl!.touched;
    }

    ngOnDestroy(): void {
        this.subscription$.unsubscribe();
    }

}
