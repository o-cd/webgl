function init(){camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1e3),camera.position.z=200,scene=new THREE.Scene,geometry=new THREE.TorusGeometry(150,75,8,6);var e=(new THREE.TextureLoader).load("../img/teeth.jpg");material=new THREE.MeshBasicMaterial({map:e}),mesh=new THREE.Mesh(geometry,material),scene.add(mesh),renderer=new THREE.WebGLRenderer,renderer.setSize(window.innerWidth/4,window.innerHeight/4,!1),document.body.appendChild(renderer.domElement)}function animate(){requestAnimationFrame(animate),mesh.rotation.x=5e-4*Date.now(),mesh.rotation.y=.001*Date.now(),renderer.render(scene,camera)}var camera,scene,renderer,geometry,material,mesh;init(),animate();