import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/*
  Textures
*/

const textLoader = new THREE.TextureLoader()

const doorAlbedo = textLoader.load("./textures/door/color.jpg")
const doorAlpha = textLoader.load("./textures/door/alpha.jpg")
const doorAO = textLoader.load("./textures/door/ambientOcclusion.jpg")
const doorHeight = textLoader.load("./textures/door/height.jpg")
const doorNormal = textLoader.load("./textures/door/normal.jpg")
const doorMetallic = textLoader.load("./textures/door/metalness.jpg")
const doorRoughness = textLoader.load("./textures/door/roughness.jpg")
const matcap = textLoader.load("./textures/matcaps/8.png")
const gradient = textLoader.load("./textures/gradients/3.jpg")

doorAlbedo.colorSpace = THREE.SRGBColorSpace
matcap.colorSpace = THREE.SRGBColorSpace

/*
  Objects
*/

// MeshBasicMaterial

// const material = new THREE.MeshBasicMaterial()
// material.map = doorAlbedo
// material.color = new THREE.Color('#ffa500')
// material.wireframe = true
// material.transparent = true
// material.opacity = 0.5
// material.alphaMap = doorAlpha
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.side = THREE.DoubleSide

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcap

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.8
material.roughness = 0


const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  material
)

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(1, 1),
  material
)

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32),
  material
)

sphere.position.x = 1.5
torus.position.x = -1.5

scene.add(sphere, plane, torus)

/*
  Lights
*/

// const ambient = new THREE.AmbientLight("#ffffff", 1)
// scene.add(ambient)

// const point = new THREE.PointLight("#ffffff", 30)
// scene.add(point)
// point.position.x = 2
// point.position.y = 3
// point.position.z = 4


/*
  Environment Map
*/

const rgbe = new RGBELoader()
rgbe.load('./textures/environmentMap/2k.hdr', (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping
  scene.background = environmentMap
  scene.environment = environmentMap
})

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects

    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()