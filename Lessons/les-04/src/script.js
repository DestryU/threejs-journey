import * as THREE from 'three'


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 0.8
// mesh.position.y = -0.3
// mesh.position.z = 2
// mesh.position.set(-1, 0.5, -2)
// mesh.scale.set(.2, 5, 1)
// scene.add(mesh)

const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// mesh.rotation.z = Math.PI * .17


const group = new THREE.Group
scene.add(group)

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'red'})
)
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'green'})
)
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({color: 'blue'})
)

cube1.position.y = 0.8
cube2.position.x = -1
cube3.position.z = -3

cube1.scale.x = 0.5
cube2.scale.y = 2
cube3.scale.z = 1

cube1.rotation.y = 0.5
cube2.rotation.x = -1
cube3.rotation.z = 3

group.add(cube1, cube2, cube3)

group.rotation.z = Math.PI *.3





/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)




/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)