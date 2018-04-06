var camera, scene, renderer;
var geometry, texture, material, mesh;

init();
animate();

function init() {

  // ( FOV: degree, Aspect Ratio, Near & Far Clipping Planes )
  camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 1, 1000
  );
  camera.position.z = 200;

  scene = new THREE.Scene();

  geometry = new THREE.CylinderGeometry( 1, 25*3, 25*3, 4 );

  texture = new THREE.TextureLoader().load( 'img/teeth.jpg' );
  // unlit
  // material = new THREE.MeshBasicMaterial( {
  //   map: texture
  // } );
  material = new THREE.MeshPhongMaterial({color: 0xfa4444});

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer({
    alpha: true
  });
  // rendering at fullscreen quarter resolution
  renderer.setSize( window.innerWidth / 4, window.innerHeight / 4, false );

  document.body.appendChild( renderer.domElement );

}

function animate() {

  requestAnimationFrame( animate );

  mesh.rotation.x = Math.PI;
  mesh.rotation.y = Date.now() * .001;

  // ( object, perspective )
  renderer.render( scene, camera );

}

/*

'Game Development with Three.js' p. 25 -- 3D shapes
                                 p. 26 -- 2D shapes
                                 p. 27 -- custom shapes

                                 p. 29 -- fonts geometry

                                 p. 30 -- materials

http://threejsplaygnd.brangerbriz.net/gui/ -- GUI custom shape creator

Using lines instead of meshes creates unexpected results:
  geometry = new THREE.IcosahedronGeometry( 200, 2 );
  // | LineDashedMaterial
  material = new THREE.LineBasicMaterial( { color: 0x000000 } );
  mesh = new THREE.Line( geometry, material );

 */
