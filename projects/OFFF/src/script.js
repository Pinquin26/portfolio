import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Base
 */
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();
const gltfLoader = new GLTFLoader();

/**
 * Model
 */
let mixer = null;
let model = null;
let animationAction = null;
let isAnimationPlaying = true;
let speedModifier = 0.2;

gltfLoader.load("/models/offf_keyboard3.glb", (gltf) => {
    mixer = new THREE.AnimationMixer(gltf.scene);
    for (const animation of gltf.animations) {
        const action = mixer.clipAction(animation);
        action.play();
        action.paused = !isAnimationPlaying;
        action.setEffectiveTimeScale(speedModifier);
        animationAction = action; // Store the animation action for later control
    }
    model = gltf.scene;
    model.scale.set(0.5, 0.5, 0.5);
    scene.add(model);
    model.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
});

/**
 * GUI
 */
const debugObject = {
    width: 300,
    title: "GUI",
};
let isCameraRotating = false;

// Functie om de camera een volledige draaiing te geven
const rotateCamera = () => {
    if (isCameraRotating) return; // Controleer of de camera al aan het draaien is

    isCameraRotating = true; // Zet de flag op true om aan te geven dat de camera begint te draaien

    const startPosition = camera.position.clone();
    const targetPosition = controls.target.clone();

    const radiansPerSecond = Math.PI / 2; // Draaisnelheid: 90 graden per seconde
    const totalRadians = Math.PI * 2; // Volledige draaiing: 360 graden

    let radiansRotated = 0;

    const rotate = () => {
        const deltaTime = clock.getDelta();
        const deltaRadians = radiansPerSecond * deltaTime;
        radiansRotated += deltaRadians;

        if (radiansRotated >= totalRadians) {
            camera.position.copy(startPosition);
            controls.target.copy(targetPosition);
            isCameraRotating = false; // Zet de flag op false om aan te geven dat de camera gestopt is met draaien
            return;
        }

        camera.position.applyAxisAngle(
            new THREE.Vector3(0, 1, 0),
            deltaRadians
        );
        camera.lookAt(targetPosition);

        requestAnimationFrame(rotate);
    };

    rotate();
};

gui.add({ rotateCamera: rotateCamera }, "rotateCamera")
    .name("Take a Spin")
    .onChange(rotateCamera);


let guiVisible = false;
gui.hide();
window.addEventListener("keydown", (e) => {
    if (e.key === "h") {
        if (guiVisible) {
            gui.hide();
            guiVisible = false;
        } else {
            gui.show();
            guiVisible = true;
        }
    }
});

gui.add({ speed: 0.2 }, "speed", 0.2, 0.7, 0.1).onChange((value) => {
    speedModifier = value;
    if (animationAction) {
        animationAction.setEffectiveTimeScale(speedModifier);
    }
});
gui.add({ playAnimation: true }, "playAnimation")
    .name("Toggle Animation")
    .onChange((value) => {
        isAnimationPlaying = value;
        if (animationAction) {
            if (isAnimationPlaying) {
                animationAction.paused = false;
            } else {
                animationAction.paused = true;
                animationAction.time = 0; // Reset animation to the first frame
            }
        }
    });
gui.add({ showFloor: true }, "showFloor")
    .name("Toggle Floor Visibility")
    .onChange((value) => {
        floor.visible = value;
    });

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth ,
    height: window.innerHeight ,
};

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth ;
    sizes.height = window.innerHeight ;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Floor
 */
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        color: "#444444",
        metalness: 0,
        roughness: 0.5,
    })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(2048, 2048);
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.position.set(2, 1, 1);
directionalLight.shadow.bias = -0.0001;
scene.add(directionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 1);
scene.add(ambientLight);

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.set(2, 7, 4);
scene.add(camera);

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas);
controls.target.set(0, 0.75, 0);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    if (mixer && isAnimationPlaying) {
        mixer.update(speedModifier);
    }
    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
