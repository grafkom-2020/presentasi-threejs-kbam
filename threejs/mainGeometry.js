var camera, scene, renderer;
var mesh = [];

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 10;

    scene = new THREE.Scene();

    var geometry = new THREE.Geometry();
    var bufferGeometry = new THREE.BufferGeometry();

    geometry.vertices.push(
        new THREE.Vector3(-1, -1,  1),  // 0
        new THREE.Vector3( 1, -1,  1),  // 1
        new THREE.Vector3(-1,  1,  1),  // 2
        new THREE.Vector3( 1,  1,  1),  // 3
        new THREE.Vector3(-1, -1, -1),  // 4
        new THREE.Vector3( 1, -1, -1),  // 5
        new THREE.Vector3(-1,  1, -1),  // 6
        new THREE.Vector3( 1,  1, -1),  // 7
        new THREE.Vector3(-2,  2,  1),  // 8
        new THREE.Vector3(-2,  0,  1),  // 9
        new THREE.Vector3(-2,  2, -1),  // A
        new THREE.Vector3(-2,  0, -1),  // B
      );
    
      /*
         A
        / \
       8   6----7
       |\ /|   /|
       | 2----3 |
       | | |  | |
       9 | 4--|-5
        \|/   |/
         0----1
      */
    
      geometry.faces.push(
         // depan
         new THREE.Face3(0, 3, 2),
         new THREE.Face3(0, 1, 3),
         // kanan
         new THREE.Face3(1, 7, 3),
         new THREE.Face3(1, 5, 7),
         // belakang
         new THREE.Face3(5, 6, 7),
         new THREE.Face3(5, 4, 6),
         // atas
         new THREE.Face3(2, 7, 6),
         new THREE.Face3(2, 3, 7),
         // bawah
         new THREE.Face3(4, 1, 0),
         new THREE.Face3(4, 5, 1),
         // kiri
         new THREE.Face3(4, 10, 6),
         new THREE.Face3(4, 11, 10),
         // miring depan
         new THREE.Face3(9, 2, 8),
         new THREE.Face3(9, 0, 2),
         // miring belakang
         new THREE.Face3(11, 8, 10),
         new THREE.Face3(11, 9, 8),
         // miring atas
         new THREE.Face3(8, 6, 10),
         new THREE.Face3(8, 2, 6),
         // miring bawah
         new THREE.Face3(11, 0, 9),
         new THREE.Face3(11, 4, 0)
      );
    
    var vertices = new Float32Array( [
        // depan
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0, -1.0,  1.0,
        
        // kanan
         1.0, -1.0,  1.0,
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,

         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,

        // belakang
         1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,

        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,

        // kiri
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,

        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
        -1.0, -1.0, -1.0,

        // atas
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,

         1.0,  1.0, -1.0,
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,

        // belakang
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,

         1.0, -1.0,  1.0,
         1.0, -1.0, -1.0,
        -1.0, -1.0, -1.0,
        
    ] );
    bufferGeometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

    mesh.push(new THREE.Mesh( geometry, new THREE.MeshBasicMaterial({color: 0x00FF00})));
    mesh.push(new THREE.Mesh( bufferGeometry, new THREE.MeshBasicMaterial({color: 0xFFFF00})));
    scene.add(mesh[0]);
    scene.add(mesh[1]);
    mesh[0].position.x -= 4;
    mesh[1].position.x += 4;

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

    for(var i=0; i<mesh.length; i++){
        mesh[i].rotation.x += 0.005;
        mesh[i].rotation.y += 0.01;
    }

    renderer.render( scene, camera );
}
