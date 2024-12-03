import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/* 
    Galaxy
*/

const params = {}
params.count = 1000
params.size = 0.02
params.radius = 5
params.branches = 3
params.spin = 1
params.randomness = 0.2



let geom = null
let material = null
let points = null


const generateGalaxy = () => {

    if(points!== null){
        geom.dispose()
        material.dispose()
        scene.remove(points)
    }

    geom = new THREE.BufferGeometry()
    const pointLocs = new Float32Array(params.count * 3)

    // Loop and assign values to point locations

    for(let i = 0; i < params.count; i++) {

        const i3 = i * 3


        const radius = Math.random() * params.radius
        const spinAngle = radius * params.spin
        const branchAngle = ((i % params.branches) / params.branches) * Math.PI * 2


        const randomX = Math.random() - 0.5 * params.randomness
        const randomY = Math.random() - 0.5 * params.randomness
        const randomZ = Math.random() - 0.5 * params.randomness



        pointLocs[i3 + 0] = Math.cos(branchAngle + spinAngle) * radius + randomX
        pointLocs[i3 + 1] = 0 + randomY
        pointLocs[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ

    }

    // Set buffer geometry with generated points

    geom.setAttribute(
        'position',
        new THREE.BufferAttribute(pointLocs, 3)
    )

    // Create the material for the particles

    material = new THREE.PointsMaterial({
        size: params.size,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    })

    // Create the objust from it's buffer geometry and material

    points = new THREE.Points(geom, material)

    // Add the object to the scene

    scene.add(points)

}

generateGalaxy()







gui.add(params, 'count').min(10).max(1_000_000).step(10).onFinishChange(generateGalaxy)
gui.add(params, 'size').min(0.001).max(0.25).step(0.001).onFinishChange(generateGalaxy)
gui.add(params, 'radius').min(0.25).max(10).step(0.25).onFinishChange(generateGalaxy)
gui.add(params, 'branches').min(2).max(12).step(1).onFinishChange(generateGalaxy)
gui.add(params, 'spin').min(-5).max(5).step(0.1).onFinishChange(generateGalaxy)
gui.add(params, 'randomness').min(0).max(2).step(0.1).onFinishChange(generateGalaxy)



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
camera.position.x = 3
camera.position.y = 3
camera.position.z = 3
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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()