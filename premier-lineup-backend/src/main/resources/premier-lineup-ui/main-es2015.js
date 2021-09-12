(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "/zHf":
/*!******************************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/component/squad/squad.component.ts ***!
  \******************************************************************************/
/*! exports provided: SquadComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SquadComponent", function() { return SquadComponent; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "Womt");
/* harmony import */ var _config_lineups_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/lineups.config */ "98lz");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var angular_resize_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-resize-event */ "4D4C");




const _c0 = ["rendererContainer"];
class SquadComponent {
    constructor() {
        this.name = 'Angular';
        // @ts-ignore
        this.camera = null;
        // @ts-ignore
        /*onResize = event => {
          console.log(event.target.innerWidth, event.target.innerHeight);
          this.camera.aspect = (event.target.innerWidth)  / (event.target.innerHeight);
          this.renderer.setSize( (event.target.innerWidth), (event.target.innerHeight) );
          this.camera.updateProjectionMatrix();
        }*/
        // @ts-ignore
        this.onResize = event => {
            console.log(event);
            this.renderer.setSize((event.newWidth), (event.newHeight));
            this.camera.aspect = (event.newWidth) / (event.newHeight);
            this.camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](45, event.newWidth / event.newHeight, 0.1, 5000);
            this.camera.position.x = 18;
            this.camera.position.y = 0;
            this.camera.position.z = this.camera.aspect * 1000;
            console.log(this.camera.aspect, this.camera.position.z);
            this.camera.updateProjectionMatrix();
        };
        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({ alpha: true });
        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](45, window.innerWidth / window.innerHeight, 0.1, 1000);
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        // this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera.position.z = 620;
        const cr7Texture = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load('assets/images/person/avatar-2.png');
        const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({ map: cr7Texture, transparent: true });
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        for (let pos of _config_lineups_config__WEBPACK_IMPORTED_MODULE_1__["LU4_4_2"]) {
            const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["CircleGeometry"](20, 20);
            const cube = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
            cube.translateZ(10);
            cube.translateX(pos.x);
            cube.translateY(pos.y);
            this.scene.add(cube);
        }
        for (let pos of _config_lineups_config__WEBPACK_IMPORTED_MODULE_1__["LD4_4_2"]) {
            const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["CircleGeometry"](20, 20);
            const cube = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
            cube.translateZ(10);
            cube.translateX(pos.x);
            cube.translateY(pos.y);
            this.scene.add(cube);
        }
        const texture = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load('assets/images/lineup/gland.png');
        const geometry2 = new three__WEBPACK_IMPORTED_MODULE_0__["PlaneGeometry"](384, 512);
        const material2 = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({ map: texture, side: three__WEBPACK_IMPORTED_MODULE_0__["DoubleSide"] });
        const plane = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry2, material2);
        this.scene.add(plane);
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
        const animate = () => {
            requestAnimationFrame(animate);
            /*cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;*/
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
}
SquadComponent.ɵfac = function SquadComponent_Factory(t) { return new (t || SquadComponent)(); };
SquadComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: SquadComponent, selectors: [["app-squad"]], viewQuery: function SquadComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.rendererContainer = _t.first);
    } }, decls: 6, vars: 0, consts: [[1, "container"], [1, "row"], [1, "col", "col-sm-12", "col-md-8", "col-lg-6", 2, "min-height", "512px", "min-width", "384px", "border", "solid 1px gray", 3, "resized"], ["rendererContainer", ""], [1, "col", "col-sm-12", "col-md-4", "col-lg-6"]], template: function SquadComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("resized", function SquadComponent_Template_div_resized_2_listener($event) { return ctx.onResize($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](5, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, directives: [angular_resize_event__WEBPACK_IMPORTED_MODULE_3__["ResizedDirective"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcXVhZC5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ 0:
/*!*****************************************************!*\
  !*** multi ./project/premier-lineup-ui/src/main.ts ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! E:\business\premier-lineup\premier-lineup-ui\project\premier-lineup-ui\src\main.ts */"bVwh");


/***/ }),

/***/ "2DBd":
/*!*************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/model/Position.ts ***!
  \*************************************************************/
/*! exports provided: Position */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Position", function() { return Position; });
class Position {
    constructor(x, y) {
        this._x = x;
        this._y = y;
    }
    get x() {
        return this._x;
    }
    set x(value) {
        this._x = value;
    }
    get y() {
        return this._y;
    }
    set y(value) {
        this._y = value;
    }
}


/***/ }),

/***/ "5329":
/*!**************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/model/Formation.ts ***!
  \**************************************************************/
/*! exports provided: Formation */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Formation", function() { return Formation; });
class Formation {
    constructor(original, up, down) {
        this._original = original;
        this._up = up;
        this._down = down;
    }
    get original() {
        return this._original;
    }
    set original(value) {
        this._original = value;
    }
    get up() {
        return this._up;
    }
    set up(value) {
        this._up = value;
    }
    get down() {
        return this._down;
    }
    set down(value) {
        this._down = value;
    }
}


/***/ }),

/***/ "98lz":
/*!********************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/config/lineups.config.ts ***!
  \********************************************************************/
/*! exports provided: LD4_4_2, LU4_4_2, L4_4_2, FORMATION_4_4_2, LD4_3_3, LU4_3_3, L4_3_3, FORMATION_4_3_3, LD2_2, LU2_2, L2_2, LD2_1_1, LU2_1_1, L2_1_1, LD1_2_1, LU1_2_1, L1_2_1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LD4_4_2", function() { return LD4_4_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LU4_4_2", function() { return LU4_4_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L4_4_2", function() { return L4_4_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORMATION_4_4_2", function() { return FORMATION_4_4_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LD4_3_3", function() { return LD4_3_3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LU4_3_3", function() { return LU4_3_3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L4_3_3", function() { return L4_3_3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FORMATION_4_3_3", function() { return FORMATION_4_3_3; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LD2_2", function() { return LD2_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LU2_2", function() { return LU2_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L2_2", function() { return L2_2; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LD2_1_1", function() { return LD2_1_1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LU2_1_1", function() { return LU2_1_1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L2_1_1", function() { return L2_1_1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LD1_2_1", function() { return LD1_2_1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LU1_2_1", function() { return LU1_2_1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "L1_2_1", function() { return L1_2_1; });
/* harmony import */ var _model_Position__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../model/Position */ "2DBd");
/* harmony import */ var _lineup_app_model_Formation__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lineup-app/model/Formation */ "5329");


const LD4_4_2 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-130, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-40, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](40, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](130, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-130, -75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-40, -75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](40, -75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](130, -75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-25, -20),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](25, -20),
];
const LU4_4_2 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-130, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-40, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](40, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](130, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-130, 75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-40, 75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](40, 75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](130, 75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-25, 20),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](25, 20),
];
const L4_4_2 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-130, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-40, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](40, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](130, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-130, 15),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-40, 15),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](40, 15),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](130, 15),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-25, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](25, 150),
];
const FORMATION_4_4_2 = new _lineup_app_model_Formation__WEBPACK_IMPORTED_MODULE_1__["Formation"](L4_4_2, LU4_4_2, LD4_4_2);
const LD4_3_3 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-130, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-40, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](40, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](130, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-90, -75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](90, -75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-90, -20),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -20),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](90, -20),
];
const LU4_3_3 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-130, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-40, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](40, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](130, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-90, 75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](90, 75),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-90, 20),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 20),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](90, 20),
];
const L4_3_3 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-130, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-40, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](40, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](130, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-90, 15),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 15),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](90, 15),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-90, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](90, 150),
];
const FORMATION_4_3_3 = new _lineup_app_model_Formation__WEBPACK_IMPORTED_MODULE_1__["Formation"](L4_3_3, LU4_3_3, LD4_3_3);
const LD2_2 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, -50),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, -50)
];
const LU2_2 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, 50),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, 50)
];
const L2_2 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, -70),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, -70),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, 70),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, 70)
];
const LD2_1_1 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -80),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -20)
];
const LU2_1_1 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 80),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 20)
];
const L2_1_1 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, -70),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, -70),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 0),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 70)
];
const LD1_2_1 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, -80),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, -80),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -20)
];
const LU1_2_1 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, 150),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, 80),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 20)
];
const L1_2_1 = [
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -220),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, -70),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](-50, 0),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](50, 0),
    new _model_Position__WEBPACK_IMPORTED_MODULE_0__["Position"](0, 70)
];


/***/ }),

/***/ "CWkB":
/*!*************************************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/service/teammate/mock-teammate.service.ts ***!
  \*************************************************************************************/
/*! exports provided: MockTeammateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MockTeammateService", function() { return MockTeammateService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class MockTeammateService {
    constructor() { }
    getTeammates() {
        let teammates = [
            { firstName: 'john1', lastName: 'doe1', avatar: 'avatar.png', number: 1, alias: 'teammate1' },
            { firstName: 'john2', lastName: 'doe2', avatar: 'avatar.png', number: 2, alias: 'teammate2' },
            { firstName: 'john3', lastName: 'doe3', avatar: 'avatar.png', number: 3, alias: 'teammate3' },
            { firstName: 'john4', lastName: 'doe4', avatar: 'avatar.png', number: 4, alias: 'teammate4' },
            { firstName: 'john5', lastName: 'doe5', avatar: 'avatar.png', number: 5, alias: 'teammate5' },
            { firstName: 'john6', lastName: 'doe6', avatar: 'avatar.png', number: 6, alias: 'teammate6' },
            { firstName: 'john7', lastName: 'doe7', avatar: 'avatar.png', number: 7, alias: 'teammate7' },
            { firstName: 'john8', lastName: 'doe8', avatar: 'avatar.png', number: 8, alias: 'teammate8' },
            { firstName: 'john9', lastName: 'doe9', avatar: 'avatar.png', number: 9, alias: 'teammate9' },
            { firstName: 'john10', lastName: 'doe10', avatar: 'avatar.png', number: 10, alias: 'teammate10' },
            { firstName: 'john11', lastName: 'doe11', avatar: 'avatar.png', number: 11, alias: 'teammate11' }
        ];
        return teammates;
    }
}
MockTeammateService.ɵfac = function MockTeammateService_Factory(t) { return new (t || MockTeammateService)(); };
MockTeammateService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: MockTeammateService, factory: MockTeammateService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "EcvI":
/*!*****************************************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/service/teammate/abstract-teammate.service.ts ***!
  \*****************************************************************************************/
/*! exports provided: AbstractTeammateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AbstractTeammateService", function() { return AbstractTeammateService; });
class AbstractTeammateService {
}


/***/ }),

/***/ "Ejcq":
/*!****************************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/component/test/test.component.ts ***!
  \****************************************************************************/
/*! exports provided: TestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TestComponent", function() { return TestComponent; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "Womt");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const _c0 = ["rendererContainer"];
class TestComponent {
    constructor() {
        this.name = 'Angular';
        this.camera = null;
        this.renderer = null;
        this.cube = null;
        this.scene = null;
        this.animate = () => {
            requestAnimationFrame(this.animate);
            // @ts-ignore
            this.cube.rotation.x += 0.01;
            // @ts-ignore
            this.cube.rotation.y += 0.01;
            // @ts-ignore
            this.renderer.render(this.scene, this.camera);
        };
        // @ts-ignore
        this.onResize = event => {
            // @ts-ignore
            this.camera.aspect = (event.target.innerWidth) / (event.target.innerHeight);
            // @ts-ignore
            this.renderer.setSize((event.target.innerWidth), (event.target.innerHeight));
            // @ts-ignore
            this.camera.updateProjectionMatrix();
        };
    }
    ngAfterViewInit() {
        // @ts-ignore
        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
        // @ts-ignore
        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](75, window.innerWidth / window.innerHeight, 0.1, 1000);
        // @ts-ignore
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({ antialias: true });
        // @ts-ignore
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        // @ts-ignore
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        // @ts-ignore
        // document.body.appendChild( this.renderer.domElement );
        const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["BoxGeometry"](1, 1, 1);
        const texture = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load('assets/images/lineup/gress.png');
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({ map: texture });
        // @ts-ignore
        this.cube = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
        // @ts-ignore
        this.scene.add(this.cube);
        // @ts-ignore
        this.camera.position.z = 5;
        this.animate();
    }
    ngOnInit() {
    }
}
TestComponent.ɵfac = function TestComponent_Factory(t) { return new (t || TestComponent)(); };
TestComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: TestComponent, selectors: [["app-test"]], viewQuery: function TestComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.rendererContainer = _t.first);
    } }, decls: 3, vars: 0, consts: [[1, "container"], [1, "row", 3, "resize"], ["rendererContainer", ""]], template: function TestComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1, 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("resize", function TestComponent_Template_div_resize_1_listener($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ0ZXN0LmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "Ob+J":
/*!*****************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/app-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/router */ "tyNb");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");



const routes = [
    {
        path: 'lineup', loadChildren: () => __webpack_require__.e(/*! import() | view-lineup-lineup-module */ "view-lineup-lineup-module").then(__webpack_require__.bind(null, /*! ./view/lineup/lineup.module */ "N4eD"))
            .then(m => m.LineupModule)
    }
];
class AppRoutingModule {
}
AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineNgModule"]({ type: AppRoutingModule });
AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjector"]({ factory: function AppRoutingModule_Factory(t) { return new (t || AppRoutingModule)(); }, imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵsetNgModuleScope"](AppRoutingModule, { imports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]], exports: [_angular_router__WEBPACK_IMPORTED_MODULE_0__["RouterModule"]] }); })();


/***/ }),

/***/ "Rwo4":
/*!******************************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/component/ortho/ortho.component.ts ***!
  \******************************************************************************/
/*! exports provided: OrthoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrthoComponent", function() { return OrthoComponent; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "Womt");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");


const _c0 = ["rendererContainer"];
class OrthoComponent {
    constructor() {
        this.name = 'Angular';
        // @ts-ignore
        this.onResize = event => {
            console.log(event.target.innerWidth, event.target.innerHeight);
            // this.camera.aspect = (event.target.innerWidth)  / (event.target.innerHeight);
            this.renderer.setSize((event.target.innerWidth), (event.target.innerHeight));
            this.camera.updateProjectionMatrix();
        };
        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__["OrthographicCamera"](0, 384, 512, 0, 0.1, 100);
        // this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]();
        this.renderer.setSize(384, 512);
        // this.renderer.setSize( window.innerWidth, window.innerHeight );
        this.camera.position.set(0, 0, 100);
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        const square = new three__WEBPACK_IMPORTED_MODULE_0__["Shape"]();
        square.moveTo(384, 0);
        square.lineTo(384, 512);
        square.lineTo(0, 512);
        square.lineTo(0, 0);
        const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["ShapeGeometry"](square);
        const texture = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load('assets/images/lineup/pland.png');
        const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({
            map: texture,
            side: three__WEBPACK_IMPORTED_MODULE_0__["DoubleSide"],
            depthWrite: true
        });
        let squareMesh = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
        this.scene.add(squareMesh);
        // const texture = new THREE.TextureLoader().load('assets/images/lineup/gress.png');
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        const animate = () => {
            requestAnimationFrame(animate);
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
}
OrthoComponent.ɵfac = function OrthoComponent_Factory(t) { return new (t || OrthoComponent)(); };
OrthoComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({ type: OrthoComponent, selectors: [["app-ortho"]], viewQuery: function OrthoComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵloadQuery"]()) && (ctx.rendererContainer = _t.first);
    } }, decls: 4, vars: 0, consts: [[1, "container"], [1, "row"], [1, "col", "col-auto", 2, "width", "384px", "height", "512px", 3, "resize"], ["rendererContainer", ""]], template: function OrthoComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "div", 2, 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("resize", function OrthoComponent_Template_div_resize_2_listener($event) { return ctx.onResize($event); }, false, _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵresolveWindow"]);
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
    } }, styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJvcnRoby5jb21wb25lbnQuY3NzIn0= */"] });


/***/ }),

/***/ "Wr7J":
/*!**********************************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/component/squad2d/squad2d.component.ts ***!
  \**********************************************************************************/
/*! exports provided: Squad2dComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Squad2dComponent", function() { return Squad2dComponent; });
/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ "Womt");
/* harmony import */ var _config_lineups_config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../config/lineups.config */ "98lz");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var angular_resize_event__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! angular-resize-event */ "4D4C");




const _c0 = ["rendererContainer"];
class Squad2dComponent {
    constructor() {
        this.name = 'Angular';
        // @ts-ignore
        this.onResize = event => {
            console.log(event);
            this.camera.aspect = (event.newWidth) / (event.newHeight);
            this.renderer.setSize((event.newWidth), (event.newHeight));
            this.camera.updateProjectionMatrix();
        };
        this.scene = new three__WEBPACK_IMPORTED_MODULE_0__["Scene"]();
        this.camera = new three__WEBPACK_IMPORTED_MODULE_0__["PerspectiveCamera"](45, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.renderer = new three__WEBPACK_IMPORTED_MODULE_0__["WebGLRenderer"]({ alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0xffffff, 1);
        this.camera.position.z = 620;
    }
    ngOnInit() {
    }
    ngAfterViewInit() {
        this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
        const cr7Texture = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load('assets/images/person/cr7.jpg');
        const material = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({ map: cr7Texture });
        // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        for (let pos of _config_lineups_config__WEBPACK_IMPORTED_MODULE_1__["LU4_4_2"]) {
            const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["CircleGeometry"](20, 20);
            const cube = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
            cube.translateZ(10);
            cube.translateX(pos.x);
            cube.translateY(pos.y);
            this.scene.add(cube);
        }
        for (let pos of _config_lineups_config__WEBPACK_IMPORTED_MODULE_1__["LD4_4_2"]) {
            const geometry = new three__WEBPACK_IMPORTED_MODULE_0__["CircleGeometry"](20, 20);
            const cube = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry, material);
            cube.translateZ(10);
            cube.translateX(pos.x);
            cube.translateY(pos.y);
            this.scene.add(cube);
        }
        const texture = new three__WEBPACK_IMPORTED_MODULE_0__["TextureLoader"]().load('assets/images/lineup/gland.png');
        const geometry2 = new three__WEBPACK_IMPORTED_MODULE_0__["PlaneGeometry"](384, 512);
        const material2 = new three__WEBPACK_IMPORTED_MODULE_0__["MeshBasicMaterial"]({ map: texture, side: three__WEBPACK_IMPORTED_MODULE_0__["DoubleSide"] });
        const plane = new three__WEBPACK_IMPORTED_MODULE_0__["Mesh"](geometry2, material2);
        this.scene.add(plane);
        const animate = () => {
            requestAnimationFrame(animate);
            /*cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;*/
            this.renderer.render(this.scene, this.camera);
        };
        animate();
    }
}
Squad2dComponent.ɵfac = function Squad2dComponent_Factory(t) { return new (t || Squad2dComponent)(); };
Squad2dComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineComponent"]({ type: Squad2dComponent, selectors: [["app-squad2d"]], viewQuery: function Squad2dComponent_Query(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵviewQuery"](_c0, 1);
    } if (rf & 2) {
        let _t;
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵqueryRefresh"](_t = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵloadQuery"]()) && (ctx.rendererContainer = _t.first);
    } }, decls: 9, vars: 0, consts: [[1, "container"], [1, "row"], [1, "col", "col-sm-12", "col-md-8", "col-lg-6"], [1, "container", "m-0", "p-0"], [1, "row", "justify-content-md-center"], [1, "col", "col-auto", "p-0", "m-0", 2, "height", "522px", "width", "394px", 3, "resized"], ["rendererContainer", ""], [1, "col", "col-sm-12", "col-md-4", "col-lg-6"]], template: function Squad2dComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](0, "div", 0);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](1, "div", 1);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](2, "div", 2);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](3, "div", 3);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](4, "div", 4);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](5, "div", 5, 6);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵlistener"]("resized", function Squad2dComponent_Template_div_resized_5_listener($event) { return ctx.onResize($event); });
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementStart"](7, "div", 7);
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵtext"](8, "\u00A0");
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵelementEnd"]();
    } }, directives: [angular_resize_event__WEBPACK_IMPORTED_MODULE_3__["ResizedDirective"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcXVhZDJkLmNvbXBvbmVudC5jc3MifQ== */"] });


/***/ }),

/***/ "Wsbi":
/*!********************************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/service/teammate/teammate.service.ts ***!
  \********************************************************************************/
/*! exports provided: TeammateService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TeammateService", function() { return TeammateService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");

class TeammateService {
    constructor() { }
    getTeammates() {
        return [];
    }
}
TeammateService.ɵfac = function TeammateService_Factory(t) { return new (t || TeammateService)(); };
TeammateService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({ token: TeammateService, factory: TeammateService.ɵfac, providedIn: 'root' });


/***/ }),

/***/ "YVxY":
/*!************************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/app.component.ts ***!
  \************************************************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "tyNb");


class AppComponent {
    constructor() {
        this.name = 'Angular';
    }
}
AppComponent.ɵfac = function AppComponent_Factory(t) { return new (t || AppComponent)(); };
AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({ type: AppComponent, selectors: [["app-root"]], decls: 1, vars: 0, template: function AppComponent_Template(rf, ctx) { if (rf & 1) {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](0, "router-outlet");
    } }, directives: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterOutlet"]], styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */"] });


/***/ }),

/***/ "bVwh":
/*!***********************************************!*\
  !*** ./project/premier-lineup-ui/src/main.ts ***!
  \***********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "fXoL");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "wjem");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "gMGV");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["enableProdMode"])();
}
_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(err => console.error(err));


/***/ }),

/***/ "gMGV":
/*!*******************************************************************!*\
  !*** ./project/premier-lineup-ui/src/environments/environment.ts ***!
  \*******************************************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "wjem":
/*!*********************************************************!*\
  !*** ./project/premier-lineup-ui/src/app/app.module.ts ***!
  \*********************************************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "jhN1");
/* harmony import */ var _lineup_app_app_routing_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lineup-app/app-routing.module */ "Ob+J");
/* harmony import */ var _lineup_app_app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @lineup-app/app.component */ "YVxY");
/* harmony import */ var _lineup_app_component_squad_squad_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lineup-app/component/squad/squad.component */ "/zHf");
/* harmony import */ var _lineup_app_component_test_test_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lineup-app/component/test/test.component */ "Ejcq");
/* harmony import */ var _lineup_app_component_ortho_ortho_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @lineup-app/component/ortho/ortho.component */ "Rwo4");
/* harmony import */ var _lineup_app_component_squad2d_squad2d_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @lineup-app/component/squad2d/squad2d.component */ "Wr7J");
/* harmony import */ var angular_resize_event__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angular-resize-event */ "4D4C");
/* harmony import */ var _lineup_app_service_teammate_abstract_teammate_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @lineup-app/service/teammate/abstract-teammate.service */ "EcvI");
/* harmony import */ var _lineup_app_service_teammate_teammate_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @lineup-app/service/teammate/teammate.service */ "Wsbi");
/* harmony import */ var _lineup_app_service_teammate_mock_teammate_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @lineup-app/service/teammate/mock-teammate.service */ "CWkB");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ "fXoL");












const production = [
    { provide: _lineup_app_service_teammate_abstract_teammate_service__WEBPACK_IMPORTED_MODULE_8__["AbstractTeammateService"], useClass: _lineup_app_service_teammate_teammate_service__WEBPACK_IMPORTED_MODULE_9__["TeammateService"] }
];
const test = [
    { provide: _lineup_app_service_teammate_abstract_teammate_service__WEBPACK_IMPORTED_MODULE_8__["AbstractTeammateService"], useClass: _lineup_app_service_teammate_mock_teammate_service__WEBPACK_IMPORTED_MODULE_10__["MockTeammateService"] }
];
class AppModule {
}
AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineNgModule"]({ type: AppModule, bootstrap: [_lineup_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]] });
AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵdefineInjector"]({ factory: function AppModule_Factory(t) { return new (t || AppModule)(); }, providers: [
        ...test // <--- this can be used for a complete mock runtime modus
        // ...production
    ], imports: [[
            _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
            _lineup_app_app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
            angular_resize_event__WEBPACK_IMPORTED_MODULE_7__["AngularResizedEventModule"]
        ], angular_resize_event__WEBPACK_IMPORTED_MODULE_7__["AngularResizedEventModule"]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_11__["ɵɵsetNgModuleScope"](AppModule, { declarations: [_lineup_app_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
        _lineup_app_component_squad_squad_component__WEBPACK_IMPORTED_MODULE_3__["SquadComponent"],
        _lineup_app_component_squad2d_squad2d_component__WEBPACK_IMPORTED_MODULE_6__["Squad2dComponent"],
        _lineup_app_component_test_test_component__WEBPACK_IMPORTED_MODULE_4__["TestComponent"],
        _lineup_app_component_ortho_ortho_component__WEBPACK_IMPORTED_MODULE_5__["OrthoComponent"]], imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
        _lineup_app_app_routing_module__WEBPACK_IMPORTED_MODULE_1__["AppRoutingModule"],
        angular_resize_event__WEBPACK_IMPORTED_MODULE_7__["AngularResizedEventModule"]], exports: [angular_resize_event__WEBPACK_IMPORTED_MODULE_7__["AngularResizedEventModule"]] }); })();


/***/ }),

/***/ "zn8P":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "zn8P";

/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es2015.js.map