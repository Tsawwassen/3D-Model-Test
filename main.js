import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { GUI } from 'dat.gui';

// /** ---------Working Demo-------- */
// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera( 10, window.innerWidth / window.innerHeight, 0.1, 200 );
camera.position.z = 100;

// GUI
const gui = new GUI();

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setAnimationLoop( renderFrame ); //Do I always need this animation loop?
document.body.appendChild( renderer.domElement );

// Params for the initial cube size.
const params = { width: 5, height: 5, depth: 5 };

// Make the cube and add it to the scene
// const geometry = new THREE.BoxGeometry( params.width, params.height, params.depth );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(5, 10, 7.5);
scene.add(light);

// Load glTF file
const loader = new GLTFLoader();

let tableTop;
let tableLegs = [];


loader.load(
  //'./assets/Table/exported_model.glb', // Path to modifited top file. doesn't look like it has legs
  //'./assets/Table/table.glb', // just a block
  
  './assets/working/table-sceneGraph-mesh-applyModifiers.gltf', // Loads the table with legs. Best working example. Don't know if I can edit the nodes yet
  (gltf) => {

    /** DEV NOTE
     * Thought it would be clean to have a variable for each mesh of the table (top part and the legs)
     * To get these variables, i traversed the gltf file to find the closest child that had a scale value and saved that
     * Don't use the first 'scale' value since that will scale the whole model, and not the one part you want to change.
     * Not sure if this is a long term solution since the legs don't move with the table as expected
     * 
     */


    //logic to add individual mesh parts to variables
    tableTop = gltf.scenes[0].children[0];

    gltf.scenes[0].children[0].children.forEach(child => {
      tableLegs.push(child);
    });
    
    scene.add(tableTop);
   
    tableLegs.forEach((mesh) => {
      scene.add(mesh);
  });

    console.log('Model loaded:', gltf);
  },
  (xhr) => {
    // Progress callback (optional)
    console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
  },
  (error) => {
    // Error callback
    console.error('An error happened', error);
  }
);

// Add GUI elements, resize cube, log new size
// TODO : Have the values not be float
//      : See what other options I can use to get size from user
//      : Legs are not moving with the top with the user changes the width/height value
gui.add(params, 'width', 1, 10).onChange((value) => {
  tableTop.scale.x = value;
  console.log(`new width ${value}`);
});

gui.add(params, 'height', 1, 10).onChange((value) => { 
  tableLegs.forEach((leg) => {
    leg.scale.y = value;
  });

  console.log(`new height ${value}`);
});

gui.add(params, 'depth', 1, 10).onChange((value) => {
  tableTop.scale.z = value;
  console.log(`new depth ${value}`);
});

// Animation Loop. Needs to have the renderer.render in this loop so that the image is updated
// Renamed to 'renderFrame' to tell that the animation loop renders a frame
function renderFrame() {

    scene.rotation.x += 0.001;
    scene.rotation.y += 0.001;
    
    renderer.render( scene, camera );
 }

// DEV NOTE : not too sure what the difference between the below animation block and the 'Set Animation Loop' function that uses the above code
//  function animate() {
//   requestAnimationFrame(animate);

//   // Optionally, rotate the model
//   scene.rotation.y += 0.001;

//   renderer.render(scene, camera);
// }

// animate();


/** ------------------------------ */


// /** ---------Arrow -------- */
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
// camera.position.set( 0, 0, 100 );
// camera.lookAt( 0, 0, 0 );

// const scene = new THREE.Scene();

// const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
// const points = [];
// points.push( new THREE.Vector3( - 10, 0, 0 ) );
// points.push( new THREE.Vector3( 0, 10, 0 ) );
// points.push( new THREE.Vector3( 10, 0, 0 ) );

// const geometry = new THREE.BufferGeometry().setFromPoints( points );

// const line = new THREE.Line( geometry, material );

// scene.add( line );
// renderer.render( scene, camera );
// /** ------------------------------ */


/** ---------Loading 3D Model -------- */

// Scene
//const scene = new THREE.Scene();

// Camera
//const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//camera.position.set( 0, 0, 5 );
//camera.lookAt( 0, 0, 0 );

// Renderer
//const renderer = new THREE.WebGLRenderer();
//renderer.setSize(window.innerWidth, window.innerHeight);
//document.body.appendChild(renderer.domElement);

// const loader = new GLTFLoader();

// loader.load(
//   //'./assets/Table/exported_model.glb', // Path to modifited top file. doesn't look like it has legs
//   //'./assets/Table/table.glb', // just a block
  
//   './assets/Table/tible-sceneGraph-mesh-applyModifiers.gltf', // Loads the table with legs. Best working example. Don't know if I can edit the nodes yet
//   (gltf) => {
//     // Add the loaded model to the scene
//     scene.add(gltf.scene);
//     console.log('Model loaded:', gltf);
    
//   },
//   (xhr) => {
//     // Progress callback (optional)
//     console.log(`Loading progress: ${(xhr.loaded / xhr.total) * 100}%`);
//   },
//   (error) => {
//     // Error callback
//     console.error('An error happened', error);
//   }
// );

// function animate() {
//     requestAnimationFrame(animate);
  
//     // Optionally, rotate the model
//     scene.rotation.y += 0.001;
  
//     renderer.render(scene, camera);
//   }
  
//   animate();

  // Add lighting
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(5, 10, 7.5);
// scene.add(light);

/** ------------------------------ */
/** --------- UI controls -------- */

// const scene = new THREE.Scene();
// const camera =  new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 10000 );

// const gui = new GUI();

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const params = { width: 100, height: 100, depth: 100 };

// const boxGeometry = new THREE.BoxGeometry(params.width, params.height, params.depth);
// const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
// const box = new THREE.Mesh(boxGeometry, material);

// scene.add(box);
// camera.position.z = 50000;

// gui.add(params, 'width', 0.1, 10).onChange((value) => {
//   box.scale.x = value;
//   console.log(`new width ${value}`);
// });
// gui.add(params, 'height', 0.1, 10).onChange((value) => {
//   box.scale.y = value;
//   console.log(`new height ${value}`);
// });
// gui.add(params, 'depth', 0.1, 10).onChange((value) => {
//   box.scale.z = value;
//   console.log(`new depth ${value}`);
// });
// renderer.render( scene, camera );

/** ------------------------------ */