var scene, camera, renderer,
    geometry, material, light,
    plane, rectangle, rectangles, world;

function init() {

  document.body.style.backgroundColor = '#B0BEC5'; // Material Blue Grey 200

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 1, 10000
  );
  // tilting camera 45 degrees down
  // alternative; look at default origin:
  // camera.lookAt( new THREE.Vector3( 0, 0, 0 ) )
  camera.position.x = -45 * Math.PI / 180;
  camera.position.y = 400;
  camera.position.z = 400;

  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  renderer.setSize( window.innerWidth / 4, window.innerHeight / 4, false );
  document.body.appendChild( renderer.domElement );

}

function animate() {

  requestAnimationFrame( function animate() {
    renderer.render( scene, camera );

    requestAnimationFrame( animate );
  });

}

function initWorld() {

  // splitting plane into 20 x 20 grid
  geometry = new THREE.PlaneGeometry( 2000, 2000, 20, 20 );

  material = new THREE.MeshBasicMaterial({
    color: 0xFF6E40 // Material Deep Orange A200
  });

  plane = new THREE.Mesh( geometry, material );
  // laying plane flat by rotating it -90 degrees
  plane.rotation.x = -90 * Math.PI / 180;
  scene.add( plane );


  geometry = new THREE.CubeGeometry( 1, 1, 1 );
  // moving origin to bottom by moving all vertices and faces without moving it
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, .5, 0) );

  material = new THREE.MeshPhongMaterial({
    color: 0x263238 // Material Blue Grey 900
  });

  // flows from 'light.position' to 'light.target.position'
  light = new THREE.DirectionalLight( 0xFF6E40, 1 ); // Material Deep Orange A200
  light.position.set( 1, 3, 2 );
  scene.add( light );

  // ( color, density )
  // density increases with distance
  // alternative: Fog( color, minimum & maximum visibility distances )
  scene.fog = new THREE.FogExp2( 0xFF6E40, .002 ); // Material Deep Orange A200


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
  scene.add( world );

}


init();
initWorld();
animate();


/*

'Game Development with Three.js' p. 38 -- Lighting

 */
