import {Component, ViewChild, ElementRef, OnInit, AfterViewInit, HostListener} from '@angular/core';
import * as THREE from 'three';
import {L4_4_2, LD4_4_2, LU4_4_2} from '../../config/lineups.config';

@Component({
  selector: 'app-squad2d',
  templateUrl: './squad2d.component.html',
  styleUrls: ['./squad2d.component.css']
})
export class Squad2dComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  name = 'Angular';
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.renderer.setClearColor( 0xffffff, 1);
    this.camera.position.z = 620;
  }

  // @ts-ignore
  onResize = event => {
    console.log(event);
    this.camera.aspect = (event.newWidth)  / (event.newHeight);
    this.renderer.setSize( (event.newWidth), (event.newHeight) );
    this.camera.updateProjectionMatrix();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.rendererContainer.nativeElement.appendChild( this.renderer.domElement );
    const cr7Texture = new THREE.TextureLoader().load('assets/images/person/cr7.jpg');
    const material = new THREE.MeshBasicMaterial( { map: cr7Texture } );
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    for(let pos of LU4_4_2) {
      const geometry = new THREE.CircleGeometry( 20, 20 );
      const cube = new THREE.Mesh( geometry, material );
      cube.translateZ(10);
      cube.translateX(pos.x);
      cube.translateY(pos.y);
      this.scene.add( cube );
    }

    for(let pos of LD4_4_2) {
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

    const animate =  () => {
      requestAnimationFrame( animate );

      /*cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;*/

      this.renderer.render( this.scene, this.camera );
    };

    animate();
  }
}
