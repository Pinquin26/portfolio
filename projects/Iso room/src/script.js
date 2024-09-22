import GUI from "lil-gui";
import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";

/**
 * Base
 */
// Debug
const gui = new GUI({
    width: 400,
});

gui.close();
gui.hide();

if (window.location.hash === "#debug") {
    gui.show();
}

const debugObject = {};

const loadingBarBackground = document.querySelector(".loading-background");
const loadingBarElement = document.querySelector(".loading-bar");
const percentage = document.querySelector(".percentage");

let sceneReady = false;
const loadingManager = new THREE.LoadingManager(
    // Loaded
    () => {
        window.setTimeout(() => {
            loadingBarBackground.classList.add("ended");
            loadingBarBackground.style.transform = "";
            loadingBarElement.classList.add("ended");
            percentage.classList.add("ended");
            loadingBarElement.style.transform = "";
            percentage.style.transform = "";
            window.setTimeout(() => {
                loadingBarBackground.remove();
                loadingBarElement.remove();
                percentage.remove();
            }, 5000);
        }, 500);
        window.setTimeout(() => {
            sceneReady = true;
        }, 3500);
    },
    (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal;
        loadingBarElement.style.transform = `scaleX(${progressRatio})`;
        percentage.innerText = (progressRatio * 100).toFixed(0) + " %";
    }
);

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader(loadingManager);

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("draco/");

// GLTF loader
const gltfLoader = new GLTFLoader(loadingManager);
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Textures
 */
const bakedTexture1 = textureLoader.load("/textures/Baked6.1.jpg");
bakedTexture1.flipY = false;
bakedTexture1.colorSpace = THREE.SRGBColorSpace;

/**
 * Materials
 */
// Emission Material fire
const orangeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffa500,
});

// Materiaal voor roodachtige kleur
const redMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});

// Baked Material
const material1 = new THREE.MeshBasicMaterial({
    map: bakedTexture1,
});

let stone;
let mixer = null;
let isAnimationPlaying = true;

gltfLoader.load("/models/smith-room_export7.glb", (gltf) => {
    mixer = new THREE.AnimationMixer(gltf.scene);

    const action = mixer.clipAction(gltf.animations[0]);
    action.play();

    gltf.scene.traverse((child) => {
        if (child.isMesh) {
            child.material = material1;
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.name === "stone") {
                stone = child;
            } else if (child.name === "bigflame") {
                child.material = orangeMaterial;
                child.scale.set(1, 0.9, 0.9);
                animateFlame(child, 0.15, 2);
            } else if (child.name === "bigflame2") {
                child.material = orangeMaterial;
                child.scale.set(0.6, 0.6, 0.6);
                animateFlame(child, 0.15, 2.4);
            } else if (child.name === "centerflame") {
                child.material = redMaterial;
                child.scale.set(0.5, 0.5, 0.5);
                animateFlame(child, 0.15, 2);
            } else if (child.name === "centerflame2") {
                child.material = redMaterial;
                child.scale.set(0.3, 0.3, 0.3);
                animateFlame(child, 0.15, 2.4);
            }
        }
    });

    scene.add(gltf.scene);
});

function animateFlame(flame, scaleAmount, duration) {
    const times = [0, duration / 2, duration];
    const values = [
        flame.scale.x,
        flame.scale.x + scaleAmount,
        flame.scale.x,
        flame.scale.y,
        flame.scale.y + scaleAmount,
        flame.scale.y,
        flame.scale.z,
        flame.scale.z + scaleAmount,
        flame.scale.z,
    ];

    const scaleXTrack = new THREE.KeyframeTrack(
        `${flame.name}.scale[x]`,
        times,
        values.slice(0, 3)
    );
    const scaleYTrack = new THREE.KeyframeTrack(
        `${flame.name}.scale[y]`,
        times,
        values.slice(3, 6)
    );
    const scaleZTrack = new THREE.KeyframeTrack(
        `${flame.name}.scale[z]`,
        times,
        values.slice(6, 9)
    );

    const clip = new THREE.AnimationClip(`${flame.name}_Action`, duration, [
        scaleXTrack,
        scaleYTrack,
        scaleZTrack,
    ]);
    const action = mixer.clipAction(clip);
    action.play();
}

/**
 * POI
 */

const points = [
    {
        position: new THREE.Vector3(4.3, 2.5, 1.4),
        element: document.querySelector(".point-0"),
    },
    {
        position: new THREE.Vector3(3.2, 6.5, -4.45),
        element: document.querySelector(".point-1"),
    },
    {
        position: new THREE.Vector3(-2.75, 3.25, 0.4),
        element: document.querySelector(".point-2"),
    },
];

debugObject.poi = true;
gui.add(debugObject, "poi")
    .onChange((val) => {
        for (const point of points) {
            if (!val) {
                point.element.classList.remove("visible");
            } else {
                point.element.classList.add("visible");
            }
        }
    })
    .name("Points of Interest");

gui.add({ playAnimation: true }, "playAnimation")
    .name("Toggle Animation")
    .onChange((value) => {
        isAnimationPlaying = value;
        if (mixer) {
            if (isAnimationPlaying) {
                mixer.paused = false;
            } else {
                mixer.paused = true;
                mixer.time = 0; // Reset animation to the first frame
            }
        }
    });

points.forEach((point, index) => {
    gui.add({ [`Go to POI ${(index)+1}`]: () => moveToPOI(point.position) }, `Go to POI ${(index)+1}`);
});

function moveToPOI(position) {
    gsap.to(camera.position, {
        duration: 1.5,
        x: position.x,
        y: position.y + 2,
        z: position.z + 2,
        onUpdate: () => {
            controls.target.set(position.x, position.y, position.z);
            controls.update();
        },
        onComplete: () => {
            controls.target.set(position.x, position.y, position.z);
        },
    });
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
);
camera.position.x = 10;
camera.position.y = 15  ;
camera.position.z = 10;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;


controls.minAzimuthAngle = THREE.MathUtils.degToRad(-5);
controls.maxAzimuthAngle = THREE.MathUtils.degToRad(90);
controls.minPolarAngle = THREE.MathUtils.degToRad(45);
controls.maxPolarAngle = THREE.MathUtils.degToRad(75); 

/**
 * Renderer
 */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
});
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 2;

/**
 * Animate
 */
const raycaster = new THREE.Raycaster();

const clock = new THREE.Clock();
let prevTime = 0;


const tick = () => {
    const currentTime = clock.getElapsedTime();
    const deltaTime = currentTime - prevTime;
    prevTime = currentTime;

    // Update controls
    controls.update();

    if (mixer && isAnimationPlaying) {
        mixer.update(deltaTime);
    }

    if (sceneReady) {
        for (const point of points) {
            const screenPosition = point.position.clone();
            screenPosition.project(camera);

            raycaster.setFromCamera(screenPosition, camera);
            const intersects = raycaster.intersectObjects(scene.children, true);

            if (intersects.length === 0 && debugObject.poi) {
                point.element.classList.add("visible");
            } else {
                const intersectionDistance = intersects[0].distance;
                const pointDistance = point.position.distanceTo(
                    camera.position
                );

                if (intersectionDistance < pointDistance) {
                    point.element.classList.remove("visible");
                } else if (
                    intersectionDistance > pointDistance &&
                    debugObject.poi
                ) {
                    point.element.classList.add("visible");
                }
            }

            const translateX = screenPosition.x * sizes.width * 0.5;
            const translateY = -screenPosition.y * sizes.height * 0.5;
            point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
        }
    }

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
