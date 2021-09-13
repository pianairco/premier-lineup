import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';
import {FORMATION_4_3_3, FORMATION_4_4_2, L4_3_3, L4_4_2, LD4_3_3, LD4_4_2, LU4_3_3, LU4_4_2} from '@lineup-app/config/lineups.config';
import {Position} from '@lineup-app/model/Position';
import {Formation} from '@lineup-app/model/Formation';
import {Lineup_11} from '@lineup-app/model/Lineup';
import {AbstractTeammateService, Teammate} from '@lineup-app/service/teammate/abstract-teammate.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  lineup: Lineup_11 = new Lineup_11();

  colors = [
    { title: 'white', value: 'white'},
    { title: 'blue', value: 'blue'},
    { title: 'aqua', value: 'aqua'},
    { title: 'red', value: 'red'},
    { title: 'orange', value: 'orange'},
    { title: 'black', value: 'black'},
    { title: 'gray', value: 'gray'},
    { title: 'green', value: 'green'},
    { title: 'yellow', value: 'yellow'},
    { title: 'violet', value: 'violet'},
    { title: 'pink', value: 'pink'},
  ];

  color: string = this.colors[0].value;

  formations = [
    { title: '4-4-2', value: FORMATION_4_4_2},
    { title: '4-3-3', value: FORMATION_4_3_3}
  ];

  formation: Formation = this.formations[1].value;

  name = 'Angular';
  renderer: THREE.WebGLRenderer;
  // @ts-ignore
  camera: THREE.PerspectiveCamera = null;
  scene: THREE.Scene;
  teammates: Teammate[] = [];

  constructor(
    /*public translate: TranslateService,*/
    private teammateService: AbstractTeammateService) {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

    /*translate.addLangs(['en', 'fa']);
    translate.setDefaultLang('fa');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fa/) ? browserLang : 'en');*/
  }

  // @ts-ignore
  onResize = event => {
    console.log(event);
    this.renderer.setSize( (event.newWidth), (event.newHeight) );
    this.camera.aspect = (event.newWidth)  / (event.newHeight);
    this.camera = new THREE.PerspectiveCamera( 45, event.newWidth / event.newHeight, 0.1, 5000 );
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = this.camera.aspect * 560;
    console.log(this.camera.aspect, this.camera.position.z)
    this.camera.updateProjectionMatrix();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.rendererContainer.nativeElement.appendChild( this.renderer.domElement );

    this.camera.position.z = 620;

    this.render();
  }

  animate =  () => {
    requestAnimationFrame( this.animate );

    this.renderer.render( this.scene, this.camera );
  };

  // @ts-ignore
  getColor(color: string): number {
    switch (color) {
      case 'white':
        return 0xffffff;
      case 'blue':
        return 0x0000ff;
      case 'aqua':
        return 0x0088ff;
      case 'red':
        return 0xff0000;
      case 'orange':
        return 0xff8800;
      case 'black':
        return 0x000000;
      case 'gray':
        return 0xa2a2a2;
      case 'green':
        return 0x00ff00;
      case 'yellow':
        return 0x00ffff;
      case 'violet':
        return 0xffff00;
      case 'pink':
        return 0xff8833;
    }
  }

  render() {
    this.scene.clear();

    const cr7Texture = new THREE.TextureLoader().load('assets/images/person/avatar-2.png');
    const material = new THREE.MeshBasicMaterial( {
      map: cr7Texture,
      color: this.getColor(this.color),
      transparent: true
    } );
    for(let pos of this.formation.original) {
      const geometry = new THREE.CircleGeometry( 20, 20 );
      const cube = new THREE.Mesh( geometry, material );
      cube.translateZ(10);
      cube.translateX(pos.x);
      cube.translateY(pos.y);
      this.scene.add( cube );
    }

    const texture = new THREE.TextureLoader().load('assets/images/lineup/gland.png');
    const geometry2 = new THREE.PlaneGeometry( 384, 512 );
    const material2 = new THREE.MeshBasicMaterial( { map: texture, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry2, material2 );
    this.scene.add( plane );

    this.animate();
  }

  // @ts-ignore
  onChangeColor(e) {
    this.render();
  }

  // @ts-ignore
  onChange(e) {
    this.render();
  }

  // @ts-ignore
  asString(obj): string {
    return JSON.stringify(obj);
  }
}
