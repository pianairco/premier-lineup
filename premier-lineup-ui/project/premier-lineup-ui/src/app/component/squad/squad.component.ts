import {Component, ViewChild, ElementRef, OnInit, AfterViewInit} from '@angular/core';
import * as THREE from 'three';
import {L4_4_2, LD4_4_2, LU4_4_2} from '../../config/lineups.config';

@Component({
  selector: 'app-squad',
  templateUrl: './squad.component.html',
  styleUrls: ['./squad.component.css']
})
export class SquadComponent implements OnInit, AfterViewInit {

  // @ts-ignore
  @ViewChild('rendererContainer') rendererContainer: ElementRef;

  name = 'Angular';
  renderer: THREE.WebGLRenderer;
  // @ts-ignore
  camera: THREE.PerspectiveCamera = null;
  scene: THREE.Scene;

  constructor() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer({ alpha: true });
    this.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 1000 );
  }

  // @ts-ignore
  /*onResize = event => {
    console.log(event.target.innerWidth, event.target.innerHeight);
    this.camera.aspect = (event.target.innerWidth)  / (event.target.innerHeight);
    this.renderer.setSize( (event.target.innerWidth), (event.target.innerHeight) );
    this.camera.updateProjectionMatrix();
  }*/

  // @ts-ignore
  onResize = event => {
    console.log(event);
    this.renderer.setSize( (event.newWidth), (event.newHeight) );
    this.camera.aspect = (event.newWidth)  / (event.newHeight);
    this.camera = new THREE.PerspectiveCamera( 45, event.newWidth / event.newHeight, 0.1, 5000 );
    this.camera.position.x = 18;
    this.camera.position.y = 0;
    this.camera.position.z = this.camera.aspect * 1000;
    console.log(this.camera.aspect, this.camera.position.z)
    this.camera.updateProjectionMatrix();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.rendererContainer.nativeElement.appendChild( this.renderer.domElement );


    // this.renderer.setSize( window.innerWidth, window.innerHeight );

    this.camera.position.z = 620;

    const cr7Texture = new THREE.TextureLoader().load('assets/images/person/avatar-2.png');
    const material = new THREE.MeshBasicMaterial( { map: cr7Texture, transparent: true } );
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


    /*const square = new THREE.Shape();
    square.moveTo( -192, -256 );
    square.lineTo( 192, -256 );
    square.lineTo( 192, 256 );
    square.lineTo( -192, 256 );
    const geometry3: THREE.ShapeGeometry = new THREE.ShapeGeometry(square);
    const material3 = new THREE.MeshBasicMaterial({
      map: texture,
      side: THREE.DoubleSide,
      depthWrite: true
    });
    let squareMesh = new THREE.Mesh(geometry3, material3);
    this.scene.add(squareMesh)*/

    const animate =  () => {
      requestAnimationFrame( animate );

      /*cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;*/

      this.renderer.render( this.scene, this.camera );
    };

    animate();
  }
}
