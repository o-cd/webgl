var scene, camera, renderer,
    geometry, material,
    plane, rectangle;

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

  material = new THREE.MeshDepthMaterial();


  for ( var i = 0; i < 300; i++ ) {
    rectangle = new THREE.Mesh( geometry.clone(), material.clone() );

    rectangle.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
    rectangle.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;

    rectangle.scale.x = Math.random() * 50 + 10;
    rectangle.scale.y = Math.random() * rectangle.scale.x * 8 + 8;
    rectangle.scale.z = rectangle.scale.x;

    scene.add( rectangle );
  }

}


init();
initWorld();
animate();
