function init(){camera=new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,1,1e3),camera.position.z=200,scene=new THREE.Scene,geometry=new THREE.Geometry,geometry.vertices=[new THREE.Vector3(0,0,0),new THREE.Vector3(0,100,0),new THREE.Vector3(0,0,100)],geometry.faces.push(new THREE.Face3(0,1,2)),geometry.computeBoundingSphere(),material=new THREE.MeshBasicMaterial({color:16777215,wireframe:!0,wireframeLinewidth:2}),mesh=new THREE.Mesh(geometry,material),scene.add(mesh),renderer=new THREE.WebGLRenderer,renderer.setSize(window.innerWidth/4,window.innerHeight/4,!1),document.body.appendChild(renderer.domElement)}function animate(){requestAnimationFrame(animate),mesh.rotation.x=5e-4*Date.now(),mesh.rotation.y=.001*Date.now(),renderer.render(scene,camera)}var camera,scene,renderer,geometry,material,mesh;init(),animate();