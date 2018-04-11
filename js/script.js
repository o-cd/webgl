/*

Procedural City

! Refactor in accordance with official doc.
! Create global variables for colors

 */

var scene, camera, renderer,
    geometry, material, light,
    plane, rectangle, rectangles, world,

    colorBackground = 'linear-gradient( #90A4AE, #CFD8DC )', // Material Blue Grey 300, 100
    colorPlane = 0x37474F; // Material Blue Grey 800

function init() {

  document.body.style.background = colorBackground;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 1, 1000
  );
  camera.position.y = 500;
  camera.position.z = 500;
  camera.rotation.x = -30 * Math.PI / 180;

  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.shadowMap.enabled = true;
  renderer.setSize( window.innerWidth / 4, window.innerHeight / 4, false );
  document.body.appendChild( renderer.domElement );

}

function animate() {

  renderer.render( scene, camera );

  // camera.rotation.y += .01;

  requestAnimationFrame( animate );

}

function initWorld() {

  geometry = new THREE.PlaneGeometry( 2500, 1000 );

  material = new THREE.MeshBasicMaterial({ color: colorPlane });

  plane = new THREE.Mesh( geometry, material );
  plane.rotation.x = -90 * Math.PI / 180;
  plane.receiveShadow = true;
  scene.add( plane );


  geometry = new THREE.CubeGeometry( 1, 1, 1 );
  // moving origin to bottom by moving all vertices and faces without moving it
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, .5, 0) );

  material = new THREE.MeshPhongMaterial({
    color: 0x263238 // Material Blue Grey 900
  });

  // // flows from 'light.position' to 'light.target.position'
  // light = new THREE.DirectionalLight( 0xFF6E40, 1 ); // Material Deep Orange A200
  // light.position.set( 1, 3, 2 );
  // light.castShadow = true;
  // scene.add( light );

  // // ( color, density )
  // // density increases with distance
  // // alternative: Fog( color, minimum & maximum visibility distances )
  // scene.fog = new THREE.FogExp2( 0xFF6E40, .002 ); // Material Deep Orange A200


  rectangles = new THREE.Geometry();
  for ( var i = 0; i < 300; i++ ) {
    rectangle = new THREE.Mesh( geometry.clone() );

    rectangle.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
    rectangle.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;

    rectangle.scale.x = Math.random() * 50 + 10;
    rectangle.scale.y = Math.random() * rectangle.scale.x * 8 + 8;
    rectangle.scale.z = rectangle.scale.x;

    THREE.GeometryUtils.merge( rectangles, rectangle );
  }
  world = new THREE.Mesh( rectangles, material );
  world.castShadow = true;
  world.receiveShadow = true;
  scene.add( world );

}


init();
initWorld();
animate();


/*

'Game Development with Three.js' p. 38 -- Lighting

 */
