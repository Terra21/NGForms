import {Component, Input, HostBinding, HostListener, Optional} from '@angular/core';

import {BtnMultiCMP} from '../btn-multi/btn-multi.cmp';

@Component({
    selector: 'btn',
    templateUrl: 'src/components/btn/btn.html'
})

export class BtnCMP {
    constructor(@Optional() protected btnMulti?: BtnMultiCMP) {
    }

    @HostBinding('class') get test() { return 'btn ' + this.class }
    @HostListener('click') onClicked = this.click;

    @Input() value: any = null;
    @Input() busy: boolean = false;
    @Input() selectedClass: string = 'btn-success';
    @Input() set selected(isSelected: boolean) {
        if (isSelected && this.btnMulti)
            this.btnMulti.changeValue(this.value);
    };

    @Input() set negative(isNegative: boolean) {
        this.selectedClass = isNegative ? 'btn-danger' : 'btn-success';
    }

    @Input('class-selected') set classSelected(val:string) { this.selectedClass = val; }

    private _class:string = 'btn-default';
    @Input() set class(val: string) { this._class = val; }
    get class() {
        return this.selected ?
               this.selectedClass :
               this._class;
    }

    get selected() {
        return this.btnMulti 
               && this.value === this.btnMulti.value;
    }

    click() {
        if (this.btnMulti)
            this.btnMulti.changeValue(this.value);
    }
}