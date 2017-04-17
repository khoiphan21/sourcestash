import { Component, OnInit } from '@angular/core';

import * as Particles from 'particlesjs/src/particles';

// var Particles:any;
// import * as PARTICLES_OPTIONS from 'data/particles.1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit() {
    console.log(Particles);
    Particles.init({
      selector: '.background',
      maxParticles: 100,
      connectParticles: true,
      color: '#ffffff',
      sizeVariations: 2
    });
  }
}
