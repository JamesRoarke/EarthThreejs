import * as THREE from './build/three.module.js';
import { OrbitControls } from  '/jsm/controls/OrbitControls.js';
import Stats from '/jsm/libs/stats.module.js'

let scene;
let camera;
let renderer;
const canvas = document.querySelector('.webgl')

scene = new THREE.Scene();

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
scene.add(camera);

renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.autoClear = false;
renderer.setClearColor(0x00000, 0.0);

const controls = new OrbitControls(camera, renderer.domElement);


const earthGeo = new THREE.SphereGeometry(0.6, 32, 32);
const earthMaterial = new THREE.MeshPhongMaterial({
    roughness: 1,
    metalness: 0,
    map: THREE.ImageUtils.loadTexture('texture/earthmap1k.png'),
    bumpMap: THREE.ImageUtils.loadTexture('texture/earthbump.png'),
    bumpScale: 0.4
});

const earthMesh = new THREE.Mesh(earthGeo, earthMaterial);
scene.add(earthMesh);

const cloudGeo = new THREE.SphereGeometry(0.63, 32, 32);
const cloudMeterial = new THREE.MeshPhongMaterial({
    map: THREE.ImageUtils.loadTexture('texture/earthCloud.png'),
    transparent: true
});
const cloudMesh = new THREE.Mesh(cloudGeo, cloudMeterial);
scene.add(cloudMesh); 

const starGeo = new THREE.SphereGeometry(80, 64, 64);
const starMaterial = new THREE.MeshBasicMaterial({
    map : THREE.ImageUtils.loadTexture('texture/galaxy.png'),
    side: THREE.BackSide
});
const starMesh = new THREE.Mesh(starGeo, starMaterial);
scene.add(starMesh);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);//x,y,z
scene.add(pointLight)

const animate = () =>{
    requestAnimationFrame(animate);
    earthMesh.rotation.y -= 0.0015;
    cloudMesh.rotation.y -= 0.0012;
    starMesh.rotation.y -= 0.002;
    controls.update();
    render();
}

const render =()=>{
    renderer.render(scene, camera);
}

animate();