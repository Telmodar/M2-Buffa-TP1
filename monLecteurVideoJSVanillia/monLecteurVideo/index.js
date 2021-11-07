import './lib/webaudio-controls.js';

const template = document.createElement("template")
const getBaseURL = () => {
    return new URL('.', import.meta.url);
}

template.innerHTML = /*html*/`



  <video id="player"></video>

  <br>
  
  <button 
    id="play"   
  >
  <img 
    src="./monLecteurVideo/assets/play.png"
    width="30" 
    height="30"
  > 
  </button>

  <button 
    id="pause">
    <img
    src="./monLecteurVideo/assets/pause.png"
    width="30" 
     height="30"
  >
  </button>
  

  <button 
  id="recul10">
  <img
    src="./monLecteurVideo/assets/back.png"
    width="30" 
     height="30"
  >
  </button>

  <input
  id="inputSetTime"
  type="number" 
  placeholder="Temps de la vidéo en secs" 
  > 

  <button id="setTime" type="button">GO</button>

  <button id="avance10"><img
  src="./monLecteurVideo/assets/head.png"
  width="30" 
   height="30"
></button>

  <button id="vitesseMoins2"><img
  src="./monLecteurVideo/assets/less.png"
  width="30" 
   height="30"
></button>

  <button id="vitessePlus2" ><img
  src="./monLecteurVideo/assets/plus.png"
  width="30" 
   height="30"
></button>



<label id="vol">
<webaudio-knob 
diameter="60" 
id="volume" 
in="0" 
max="1" 
value="0.5" 
step="0.01" 
tooltip="%s" 
src="./assets/Aqua.png" 
sprites="100"
></webaudio-knob>

  <br>

 
<h2>
Vitesse du lecteur : 
  <span class="infoBoxes" id="vitesseLecteur"></span>
<br>

Temps actuel :
<span class="infoBoxes" id="afficherCurrentTime"></span> / <span class="infoBoxes" id="tempsDeLaVideo"></span>

<br>

Volume :
<span class="infoBoxes" id="afficherVolume"></span>
</h2>

<div>

<button 
    id="video1"   
  >
  <img 
    src="./monLecteurVideo/assets/video/1.jpg"
    width="200" 
    height="200"
  > 
  <br>
  Installer une canalisation 
  </button>

  <button 
  id="video2"   
>
<img 
  src="./monLecteurVideo/assets/video/2.jpg"
  width="200" 
  height="200"
> 
<br>
Passants retournent une voiture 
</button>

<button 
    id="video3"   
  >
  <img 
    src="./monLecteurVideo/assets/video/3.jpg"
    width="200" 
    height="200"
  >
  <br>
  Témoignage d'un héros 
  </button>
</div>
<div>

<button 
    id="video4"   
  >
  <img 
    src="./monLecteurVideo/assets/video/4.jpg"
    width="200" 
    height="200"
  >
  <br>
  Enfants sur un immeuble  
  </button>

  <button 
  id="video5"   
>
<img 
  src="./monLecteurVideo/assets/video/5.jpg"
  width="200" 
  height="200"
> 
<br>
Best interview of the World
</button>

<button 
    id="video6"   
  >
  <img 
    src="./monLecteurVideo/assets/video/6.jpg"
    width="200" 
    height="200"
  > 
  <br>
  Koreusity n°13
  </button>
</div>
  `
   


class MyVideoPlayer extends HTMLElement {
    constructor() {
        super();
        this.src = this.getAttribute("src")
        console.log("BaseURL = " + getBaseURL());
        this.attachShadow({ mode: "open" });
    }

    afficherVitesseDuLecteur() {
    let vitesseLecteur = this.player.playbackRate;
    var output = this.shadowRoot.querySelector("#vitesseLecteur");
    output.innerHTML = vitesseLecteur + " x";
    }

    afficherCurrentTime() {
    let afficherCurrentTime = this.player.currentTime;
    var output = this.shadowRoot.querySelector("#afficherCurrentTime");
    output.innerHTML = Math.round(afficherCurrentTime*100)/100 + " secs";
    console.log("temps actuel de la vidéo : " + afficherCurrentTime);
    
    }

    afficherVolume() {
      let afficherVolume = this.player.volume;
      var output = this.shadowRoot.querySelector("#afficherVolume");
      output.innerHTML = Math.round(afficherVolume*100) + " %";
      console.log("Volume de la vidéo : " + afficherVolume);
    }

    tempsDeLaVideo() {
    let tempsDeLaVideo = this.player.duration;
    var output = this.shadowRoot.querySelector("#tempsDeLaVideo");
    output.innerHTML = Math.round(tempsDeLaVideo) + " secs";
    console.log("temps de la vidéo : " + tempsDeLaVideo);
    
    
    }

    fixRelativeURLs() {
        // pour les knobs
        let knobs = this.shadowRoot.querySelectorAll('webaudio-knob, webaudio-switch, webaudio-slider, button');
        knobs.forEach((e) => {
            let path = e.getAttribute('src');
            e.src = getBaseURL() + '/' + path;
        });

    }
    connectedCallback() {
        // Appelée avant affichage du composant
 
    this.shadowRoot.appendChild(template.content.cloneNode(true))
    this.player = this.shadowRoot.querySelector("#player")
    this.player.src = this.src
    this.shadowRoot.querySelector("#play").onclick = (event) => this.play(event) //good
    this.shadowRoot.querySelector("#pause").onclick = (event) => this.pause(event) //good
    this.shadowRoot.querySelector("#recul10").onclick = () => this.recul10() //good
    this.shadowRoot.querySelector("#avance10").onclick = () => this.avance10() //good
    this.shadowRoot.querySelector("#vitesseMoins2").onclick = (event) => this.vitesseMoins2(event) //good
    this.shadowRoot.querySelector("#vitessePlus2").onclick = (event) => this.vitessePlus2(event) //good


    // Changement des liens de la video
    this.shadowRoot.querySelector("#video1").onclick = () => this.setLien(1)
    this.shadowRoot.querySelector("#video2").onclick = () => this.setLien(2)
    this.shadowRoot.querySelector("#video3").onclick = () => this.setLien(3)
    this.shadowRoot.querySelector("#video4").onclick = () => this.setLien(4)
    this.shadowRoot.querySelector("#video5").onclick = () => this.setLien(5)
    this.shadowRoot.querySelector("#video6").onclick = () => this.setLien(6)

    

      // Fix des URL
        
        this.fixRelativeURLs();

        this.player = this.shadowRoot.querySelector("#player");
        // récupération de l'attribut HTML
        this.player.src = this.getAttribute("src");

        // déclarer les écouteurs sur les boutons
        this.definitEcouteurs();

    
        

    }

    definitEcouteurs() {
        console.log("ecouteurs définis")

        // Play
        this.shadowRoot.querySelector("#play").onclick = () => {
            this.play();
            this.tempsDeLaVideo();
            this.afficherCurrentTime();         
      
            // Affichage du current time ??? (A changer)
            //intervalCurrentTime = setInterval(this.afficherCurrentTime(),1000);
        }
        

        
        //  Réglage du volume   
        this.shadowRoot.querySelector("#volume").oninput = (event) => {
            const vol = parseFloat(event.target.value);
            this.player.volume = vol;
            this.afficherVolume();
            
        }
      
        // Input time
        this.shadowRoot.querySelector("#setTime").onclick = () => {
            this.getSetTime()
        }

      
           
            
        // Initialisation des données au début 
        this.afficherVitesseDuLecteur();
        this.getSetTime();
        this.afficherVolume();
    

        // CURRENT TIME NE FONCTIONNE PAS 
        //var intervalID = setInterval(function(afficherCurrentTime){this.afficherCurrentTime()}, 1000);
        //var intervalID2 = setInterval(function(){alert("Interval reached");}, 5000);
        // let intervalCurrentTime = setInterval(afficherCurrentTime(),1000);

 
        // -----------TO DO--------------

        //Barre de vitesse de la vidéo 
         
    }

  // API de mon composant

    // Fonction de play sur la vidéo par bouton "play" 
    play() {
        this.player.play();
    }

    // Fonction de pause sur la vidéo par bouton "pause" 
    pause() {
        this.player.pause();
        this.afficherCurrentTime()

    }

    // Fonction de modification +10 secs du current time par bouton "recul10" 
    recul10() {
      this.player.currentTime -= 10;
      console.log("currentTime -= 10")
      this.afficherCurrentTime()
    }

    // Fonction de modification +10 secs du current time par bouton "avance10" 
    avance10(){
      this.player.currentTime += 10;
      console.log("currentTime += 10")
      this.afficherCurrentTime()
    }

    // Fonction de modification -2X la vitesse de diffusion par bouton "vitesseMoins2"
    vitesseMoins2(){
      this.player.playbackRate -= 2
      this.afficherVitesseDuLecteur()
      this.afficherCurrentTime()
    }

    // Fonction de modification +2X la vitesse de diffusion par bouton "vitessePlus2"
    vitessePlus2(){
      this.player.playbackRate += 2
      this.afficherVitesseDuLecteur()
      this.afficherCurrentTime()
    }

    // Fonction de modification du current time par l'input "inputSetTime" 
    getSetTime() {
        var newTime = this.shadowRoot.getElementById("inputSetTime");
        this.player.currentTime = newTime.value
        this.afficherCurrentTime()
    }



    setLien(id){
      switch(id){
          case 1:{
            // Video : Comment installer une canalisation dans une tranchée
              this.player.src="https://embed.koreus.com/00071/202111/installer-canalisation-tranchee.mp4"
              break
          }
          case 2:{
            // Video : Des passants retournent une voiture tombée à l'eau
              this.player.src="https://embed.koreus.com/00071/202111/passants-retournent-voiture-eau.mp4" 
              break
          }
          case 3:{
            // Video : Le témoignage d'un héros modeste en 1976 (Archives RTS)
              this.player.src="https://embed.koreus.com/00071/202111/heros-modeste-1976.mp4" 
              break
          }
          case 4:{
            // Video : Deux enfants s'amusent au sommet de deux immeubles
            this.player.src="https://embed.koreus.com/00071/202111/enfants-sauter-vide-immeubles.mp4"
            break
        }
          case 5:{
            // Video : La meilleure interview de golf de tous les temps
            this.player.src="https://embed.koreus.com/00071/202111/interview-golfeur-japonais.mp4" 
            break
        }
          case 6:{
            // Video : Koreusity n°13 
            this.player.src="https://embed.koreus.com/00071/201211/koreusity-13.mp4" 
            break
        }
          default:
      }
    }
    
}

customElements.define("my-player", MyVideoPlayer);

