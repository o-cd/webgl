var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

  // ( FOV: degree, Aspect Ratio, Near & Far Clipping Planes )
  camera = new THREE.PerspectiveCamera(
      75, window.innerWidth / window.innerHeight, 1, 1000
  );
  camera.position.z = 200;

  scene = new THREE.Scene();

  geometry = new THREE.Geometry();
  geometry.vertices = [
      new THREE.Vector3(   0,   0,   0 ),
      new THREE.Vector3(   0, 100,   0 ),
      new THREE.Vector3(   0,   0, 100 )
  ];
  geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
  geometry.computeBoundingSphere();
  // might be needed for displaying a texture
  // geometry.computeFaceNormals();
  // geometry.computeVertexNormals();

  // not affected by lighting
  material = new THREE.MeshBasicMaterial( {
    color: 0xffffff,
    wireframe: true,
    wireframeLinewidth: 2
  } );

  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  renderer = new THREE.WebGLRenderer();
  // rendering at quarter resolution
  renderer.setSize( window.innerWidth / 4, window.innerHeight / 4, false );

  document.body.appendChild( renderer.domElement );

}

function animate() {

  requestAnimationFrame( animate );

  mesh.rotation.x = Date.now() * 0.0005;
  mesh.rotation.y = Date.now() * 0.001;

  // ( object, perspective )
  renderer.render( scene, camera );

}

/*

'Game Development with Three.js' p. 25 -- 3D shapes
                                 p. 26 -- 2D shapes
http://threejsplaygnd.brangerbriz.net/gui/ -- custom shape creator

Using lines instead of meshes creates unexpected results:
  geometry = new THREE.IcosahedronGeometry( 200, 2 );
  // | LineDashedMaterial
  material = new THREE.LineBasicMaterial( { color: 0x000000 } );
  mesh = new THREE.Line( geometry, material );

 */
