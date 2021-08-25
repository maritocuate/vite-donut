import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
})

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
camera.position.setZ(30)
camera.position.setX(-3)

//  Torus
const donutTexture = new THREE.TextureLoader().load('donut.jpg')
const geometry = new THREE.TorusGeometry(10, 4, 16, 100)
const material = new THREE.MeshStandardMaterial({map:donutTexture})
const torus = new THREE.Mesh(geometry, material)
scene.add(torus)

//  Light
const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(30, 35, 35)
const ambientLight = new THREE.AmbientLight(0xffffff)
const gridHelper = new THREE.GridHelper(200, 50)
//const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(pointLight, ambientLight, gridHelper/* , lightHelper */)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)

//  Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 24, 24)
  const material = new THREE.MeshStandardMaterial({color:0xffffff})
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100))
  star.position.set(x, y, z)

  scene.add(star)
}
Array(200).fill().forEach(addStar)

// Textures
const spaceTexture = new THREE.TextureLoader().load('space.jpg')
scene.background = spaceTexture

//  Scroll
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  /* moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01; */

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}
document.body.onscroll = moveCamera
moveCamera()


function animate() {
  requestAnimationFrame(animate)
  torus.rotation.x += 0.01
  torus.rotation.y += 0.001
  torus.rotation.z += 0.01

  console.log(document.body.onscroll)

  controls.update()
  renderer.render(scene, camera)
}
animate()