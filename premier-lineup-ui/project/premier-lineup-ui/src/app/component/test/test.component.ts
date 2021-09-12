import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit, AfterViewInit {

  name = 'Angular';
  camera = null;
  renderer = null;
  cube = null;
  scene = null;
  // @ts-ignore
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  constructor() {

  }

  animate = () => {
    requestAnimationFrame( this.animate );

    // @ts-ignore
    this.cube.rotation.x += 0.01;
    // @ts-ignore
    this.cube.rotation.y += 0.01;

    // @ts-ignore
    this.renderer.render( this.scene, this.camera );
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.scene = new THREE.Scene();
    // @ts-ignore
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    // @ts-ignore
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    // @ts-ignore
    this.rendererContainer.nativeElement.appendChild( this.renderer.domElement );
    // @ts-ignore
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    // @ts-ignore
    // document.body.appendChild( this.renderer.domElement );

    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    const texture = new THREE.TextureLoader().load('assets/images/lineup/gress.png');
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    const material = new THREE.MeshBasicMaterial( { map: texture } );
    // @ts-ignore
    this.cube = new THREE.Mesh( geometry, material );
    // @ts-ignore
    this.scene.add( this.cube );

    // @ts-ignore
    this.camera.position.z = 5;

    this.animate();
  }

  // @ts-ignore
  onResize = event => {
    // @ts-ignore
    this.camera.aspect = (event.target.innerWidth)  / (event.target.innerHeight);
    // @ts-ignore
    this.renderer.setSize( (event.target.innerWidth), (event.target.innerHeight) );
    // @ts-ignore
    this.camera.updateProjectionMatrix();
  }

  ngOnInit(): void {
  }
}
