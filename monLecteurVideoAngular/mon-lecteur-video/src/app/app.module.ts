import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { BorderCardDirective } from './border-card-directive';
import { VideoControlDirective } from './video-control-directive';
import { VideoSelectDirective} from './video-selection-directive';
import { AppComponent } from './app.component';

@NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent, BorderCardDirective, VideoControlDirective, VideoSelectDirective ],
	bootstrap: [AppComponent]
})
export class AppModule { }
