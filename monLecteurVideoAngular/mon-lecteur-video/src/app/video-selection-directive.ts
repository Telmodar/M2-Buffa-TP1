import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: "[vidChangeVideo]"
})

export class VideoSelectDirective {
    constructor(private el: ElementRef) {

    }
}