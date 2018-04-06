// Procedural City

var scene, camera, renderer,
    geometry, material,
    floor, building;

function setup() {

  document.body.style.backgroundColor = '#d7f0f7';

  setupThreeJS();
  setupWorld();

  requestAnimationFrame( function animate() {
    renderer.render( scene, camera );

    requestAnimationFrame( animate );
  });

}

function setupThreeJS() {

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 1, 10000
  );
  camera.position.y = 400;
  camera.position.z = 400;
  // tilting camera 45 degrees down
  camera.rotation.x = -45 * Math.PI / 180;
  // alternative method: look at default scene origin
  // camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

  renderer = new THREE.CanvasRenderer();
  renderer.setSize( window.innerWidth / 4, window.innerHeight / 4, false );
  document.body.appendChild( renderer.domElement );

}

function setupWorld() {

  // splitting plane into 20 x 20 grid
  geometry = new THREE.PlaneGeometry( 2000, 2000, 20, 20 );
  material = new THREE.MeshBasicMaterial({
    color: 0xFF9E80,
    overdraw: true
  })
  floor = new THREE.Mesh( geometry, material );
  floor.rotation.x = -90 * Math.PI / 180;
  // laying plane flat
  scene.add( floor );

  geometry = new THREE.CubeGeometry( 1, 1, 1 );
  // moving origin to bottom by moving all vertices and faces without moving it
  geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );
  material = new THREE.MeshDepthMaterial({
    overdraw: true
  });

  for ( var i = 0; i < 300; i++ ) {
    building = new THREE.Mesh( geometry.clone(), material.clone() );

    building.position.x = Math.floor( Math.random() * 200 - 100 ) * 4;
    building.position.z = Math.floor( Math.random() * 200 - 100 ) * 4;

    building.scale.x = Math.random() * 50 + 10;
    building.scale.y = Math.random() * building.scale.x * 8 + 8;
    building.scale.z = building.scale.x;

    scene.add( building );
  }

}

setup();
