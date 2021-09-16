import {Component, ElementRef, ViewChild} from '@angular/core';

import * as THREE from 'three';
import {FORMATION_11} from '@lineup-app/core/config/lineups.config';
import {Lineup_11} from '@lineup-app/core/model/Lineup';
import {AbstractTeammateService, Teammate} from '@lineup-app/rest/service/teammate/abstract-teammate.service';
import {FormBuilder} from "@angular/forms";
import {from} from "rxjs";

@Component({
  selector: 'app-lineup',
  templateUrl: './lineup.component.html',
  styleUrls: ['./lineup.component.css']
})
export class LineupComponent /*implements OnInit, AfterViewInit*/ {

  // @ts-ignore
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  lineup: Lineup_11 = new Lineup_11();

  camZ = 0;

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

  formations = [
    { title: '4-4-2', value: "FORMATION_4_4_2"},
    { title: '4-3-3', value: "FORMATION_4_3_3"}
  ];

  name = 'Angular';
  renderer: THREE.WebGLRenderer;
  // @ts-ignore
  camera: THREE.PerspectiveCamera = null;
  scene: THREE.Scene;
  teammates: Teammate[] = [];
  form;
  formDto: {
    formation: String;
    color: string;
  } = {
    formation: this.formations[1].value,
    color: this.colors[0].value
  };

  constructor(
    private builder: FormBuilder,
    /*public translate: TranslateService,*/
    public teammateService: AbstractTeammateService) {
    teammateService.getTeammates().subscribe(res => {
      this.teammates = res;
    }, err => {

    });

    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.form = this.builder.group({
      formation: [this.formDto.formation],
      color: [this.formDto.color]
    });

    this.form.get("formation").valueChanges.subscribe(f => {
      console.log(JSON.stringify(f));
      this.render();
    });

    this.form.get("color").valueChanges.subscribe(c => {
      console.log(c);
      this.render();
    });

    console.log(this.form.get("color").value)

    /*translate.addLangs(['en', 'fa']);
    translate.setDefaultLang('fa');

    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fa/) ? browserLang : 'en');*/
  }

  baseCamZ = 870;
  // @ts-ignore
  onResize = event => {
    // console.log(event);
    this.renderer.setSize( (event.newWidth), (event.newHeight) );
    this.camera.aspect = (event.newWidth)  / (event.newHeight);
    this.camera = new THREE.PerspectiveCamera( 45, event.newWidth / event.newHeight, 0.1, 5000 );
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    console.log(event.newWidth, event.newWidth / 400)
    this.baseCamZ = (1 + (1 - event.newWidth / 400)) * 870;
    this.camera.position.z = this.camera.aspect * this.baseCamZ + this.camZ;
    // console.log(this.camera.aspect, this.camera.position.z)
    this.camera.updateProjectionMatrix();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.rendererContainer.nativeElement.appendChild( this.renderer.domElement );

    // this.camera.position.z = 620;
    this.camera.position.z = this.camera.aspect * this.baseCamZ + this.camZ;

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

    console.log(this.form.get("formation").value, FORMATION_11[this.form.get("formation").value])
    for(let pos of FORMATION_11[this.form.get("formation").value].original) {
      const cr7Texture = new THREE.TextureLoader().load('assets/images/person/cr7.jpg');
      const material = new THREE.MeshBasicMaterial( {
        map: cr7Texture,
        color: this.getColor(this.form.get("color").value),
        transparent: true
      } );
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
  asString(obj): string {
    return JSON.stringify(obj);
  }

  cameraUp() {
    this.camZ += 40;
    this.camera.position.z = this.camera.aspect * this.baseCamZ + this.camZ;
    this.render();
  }

  cameraDown() {
    this.camZ -= 40;
    this.camera.position.z = this.camera.aspect * this.baseCamZ + this.camZ;
    this.render();
  }

  swapMode = false;
  swapFrom: Teammate;
  swapTo: Teammate;

  onSwapFrom(item) {
    this.swapMode = true;
    this.swapFrom = item;
    console.log(item);
  }

  onSwapTo(item){
    console.log(item);
    this.swapTo = item;
    let fromIdx = -1;
    let toIdx = -1;
    for (let i = 0; i < this.teammates.length; i++) {
      if(this.teammates[i] == this.swapFrom) {
        fromIdx = i;
      } else if(this.teammates[i] == this.swapTo) {
        toIdx = i;
      }
      if(toIdx > -1 && fromIdx > -1)
        break;
    }
    this.teammates.splice(toIdx, 1, this.swapFrom);
    this.teammates.splice(fromIdx, 1, this.swapTo);
    this.swapTo = null;
    this.swapFrom = null;
    this.swapMode = false;
  }

  onSwapCancel() {
    this.swapMode = false;
    this.swapFrom = null;
  }

}
