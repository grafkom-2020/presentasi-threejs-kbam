var camera, scene, renderer;
var mesh;

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 5;

    scene = new THREE.Scene();

    var geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3(-1, -1,  1),  // 0
        new THREE.Vector3( 1, -1,  1),  // 1
        new THREE.Vector3(-1,  1,  1),  // 2
        new THREE.Vector3( 1,  1,  1),  // 3
        new THREE.Vector3(-1, -1, -1),  // 4
        new THREE.Vector3( 1, -1, -1),  // 5
        new THREE.Vector3(-1,  1, -1),  // 6
        new THREE.Vector3( 1,  1, -1),  // 7
      );
    
      /*
           6----7
          /|   /|
         2----3 |
         | |  | |
         | 4--|-5
         |/   |/
         0----1
      */
    
      geometry.faces.push(
         // front
         new THREE.Face3(0, 3, 2),
         new THREE.Face3(0, 1, 3),
         // right
         new THREE.Face3(1, 7, 3),
         new THREE.Face3(1, 5, 7),
         // back
         new THREE.Face3(5, 6, 7),
         new THREE.Face3(5, 4, 6),
         // left
         new THREE.Face3(4, 2, 6),
         new THREE.Face3(4, 0, 2),
         // top
         new THREE.Face3(2, 7, 6),
         new THREE.Face3(2, 3, 7),
         // bottom
         new THREE.Face3(4, 1, 0),
         new THREE.Face3(4, 5, 1),
      );
    
    var material = new THREE.MeshBasicMaterial({color: 0x00FF00});

    mesh = new THREE.Mesh( geometry, material );
    scene.add( mesh );

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
    requestAnimationFrame( animate );

    mesh.rotation.x += 0.005;
    mesh.rotation.y += 0.01;

    renderer.render( scene, camera );
}
