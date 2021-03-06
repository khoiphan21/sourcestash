import { Component, OnInit } from '@angular/core';

import * as Particles from 'particlesjs/src/particles';

// var Particles:any;
// import * as PARTICLES_OPTIONS from 'data/particles.1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  ngOnInit() {
    Particles.init({
      selector: '.background',
      maxParticles: 150,
      connectParticles: true,
      color: '#ffffff',
      sizeVariations: 4,
      speed: 0.2,
    });
  }
}
