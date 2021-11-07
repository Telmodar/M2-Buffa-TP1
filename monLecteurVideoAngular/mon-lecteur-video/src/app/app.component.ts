import { Component, OnInit, ViewChild, Input } from '@angular/core';

//import { Video } from './video'; 
import { VIDEOS } from './mock-videos';
import { Video } from './video';

@Component({
	selector: 'video-app',
	templateUrl: `./app.component.html`,
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit { 
	

	
     
	// m'oblige de mettre undefined ??? + idem dans video.ts
	videos: Video[] | undefined;

	title: string = "Angutube"; 
	videoLink = "https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4";

	
	
	ngOnInit(){
		this.videos = VIDEOS; 
	}

	selectVideo(video: Video){};

	log(){
		console.log(Video)
	}

	

	
	

}


