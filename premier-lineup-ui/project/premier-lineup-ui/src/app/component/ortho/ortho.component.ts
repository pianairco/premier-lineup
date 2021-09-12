import {Component, ViewChild, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import * as THREE from 'three';
import {Vector2} from 'three';

@Component({
  selector: 'app-ortho',
  templateUrl: './ortho.component.html',
  styleUrls: ['./ortho.component.css']
})
export class OrthoComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  name = 'Angular';
  renderer: THREE.WebGLRenderer;
  camera: THREE.OrthographicCamera;
  // camera: THREE.PerspectiveCamera;
  scene: THREE.Scene;

  constructor() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(0, 384, 512, 0, 0.1, 100 );
    // this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( 384, 512 );
    // this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.camera.position.set(0, 0, 100);
  }

  // @ts-ignore
  onResize = event => {
    console.log(event.target.innerWidth, event.target.innerHeight);
    // this.camera.aspect = (event.target.innerWidth)  / (event.target.innerHeight);
    this.renderer.setSize( (event.target.innerWidth), (event.target.innerHeight) );
    this.camera.updateProjectionMatrix();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.rendererContainer.nativeElement.appendChild( this.renderer.domElement );

    const square = new THREE.Shape();
    square.moveTo(384, 0);
    square.lineTo(384, 512);
    square.lineTo(0, 512);
    square.lineTo(0, 0);

    const geometry: THREE.ShapeGeometry = new THREE.ShapeGeometry(square);

    const texture = new THREE.TextureLoader().load('assets/images/lineup/pland.png');

    const material = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      depthWrite: true
    });

    let squareMesh = new THREE.Mesh(geometry, material);

    this.scene.add(squareMesh);

    // const texture = new THREE.TextureLoader().load('assets/images/lineup/gress.png');
    // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );

    const animate =  () => {
      requestAnimationFrame( animate );

      this.renderer.render( this.scene, this.camera );
    };

    animate();
  }
}
