import * as THREE from 'three'
import GUI from 'lil-gui'

/**
 * Debug
 */
const gui = new GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
      toon.color.set(parameters.materialColor)
    })

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

const  textureLoader = new THREE.TextureLoader()
const gradient = textureLoader.load('/textures/gradients/3.jpg')
gradient.minFilter = THREE.NearestFilter
gradient.magFilter = THREE.NearestFilter
gradient.generateMipmaps = false

/* 
  Objects
*/

const toon = new THREE.MeshToonMaterial({ color: parameters.materialColor, gradientMap: gradient })

const objectsDistance = 4

const mesh1 = new THREE.Mesh(
  new THREE.TorusGeometry(1, 0.4, 16, 60),
  toon
)
const mesh2 = new THREE.Mesh(
  new THREE.ConeGeometry(1, 2, 32),
  toon
)
const mesh3 = new THREE.Mesh(
  new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
  toon
)

mesh1.position.y = objectsDistance * 0
mesh2.position.y = objectsDistance * -1
mesh3.position.y = objectsDistance * -2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2



scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [mesh1, mesh2, mesh3]

/* 
  Lights
*/

const directional = new THREE.DirectionalLight('#ffffff', 2.5)
directional.position.set(-1, 1, -0.5)

scene.add(directional)

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

const cameraGroup = new THREE.Group()
scene.add(cameraGroup)


// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    /* 
      Sets the background of the render to be transparent
    */
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/*
  Scroll
*/

let scrollY = window.scrollY

window.addEventListener('scroll', () => {
  scrollY = window.scrollY
})

/*
  Cursor
*/

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) => {
  cursor.x = (event.clientX / sizes.width * 2) - 1
  cursor.y = (event.clientY / sizes.height * 2) - 1
  console.log(cursor.x)
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    camera.position.y  = - scrollY / sizes.height * objectsDistance

    /*
      This equation is the number of pixels scrolled so far, divided by the height of the window.
      This gives us unit scales for how many windows we've scrolled down, from 0-2. Then we multiply
      this by the distance between our objects, to match the 3D camera poisiton to our object positions
      to our HTML elements. 
    */

    const parallaxX = cursor.x
    const parallaxY = - cursor.y
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 0.1
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 0.1

   for(const mesh of sectionMeshes) {
      mesh.rotation.x = elapsedTime * 0.1
      mesh.rotation.y = elapsedTime * 0.08
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()