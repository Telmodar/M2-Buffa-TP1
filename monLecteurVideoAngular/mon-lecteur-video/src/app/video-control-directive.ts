import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[vidVideoControl]' 
})
export class VideoControlDirective {
	constructor(private el: ElementRef) {
		
	}

    play() {
        this.el.nativeElement.player.play();
    }

    pause() {
        this.el.nativeElement.player.pause();
    }

    recul10() {
        this.el.nativeElement.player.recul10();
    }

    // Fonction de modification +10 secs du current time par bouton "avance10" 
    avance10(){
        this.el.nativeElement.player.avance10();
    }

    // Fonction de modification du current time par l'imput 
    getSetTime() {
        // var newTime = this.shadowRoot.getElementById("inputSetTime");
        // this.player.currentTime = newTime.value
    }

}