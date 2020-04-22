var camera, scene, renderer;
var cube = [];

init();
animate();

function init() {
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 1000 );
    camera.position.z = 15;

    scene = new THREE.Scene();

    var geometry = new THREE.BoxGeometry(4, 4, 4);

    cube.push(
        new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x00FF00})),
        new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0xFF0000})),
        new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({color: 0x0000FF}))
    )

    for(var i=0; i<3; i++){
        scene.add(cube[i]);
    }

    cube[1].position.x += 8;
    cube[2].position.x -= 8;

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

    for(var i=0; i<3; i++){
        cube[i].rotation.x += 0.005;
        cube[i].rotation.y += 0.01;
    }

    renderer.render( scene, camera );

}
