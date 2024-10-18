import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/*
Debug object
*/
const gui = new GUI({
    width: 300,
    title: "Debugger",
    closeFolders: true
})
gui.close()
gui.hide()
const globalDebug = {}

window.addEventListener('keydown', (event) => {
    if(event.key == '`') {
        gui.show(gui._hidden)
    }
})




/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */

globalDebug.color = '#ff0000'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: globalDebug.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const cubeTweaks = gui.addFolder('Cube Tweaks')
const colorTweak = cubeTweaks.addFolder('Color Tweak')

cubeTweaks
    .add(mesh.position, 'y')
    .min(-2)
    .max(2)
    .step(.01)
    .name('Height')

const myObj = {
    myVariable: 1337
}

cubeTweaks
    .add(mesh, 'visible')
    .name('Show Visible')

cubeTweaks
    .add(material, 'wireframe')
    .name('Show Wireframe')


colorTweak
    .addColor(globalDebug, 'color')
    .onChange(() => {
        material.color.set(globalDebug.color)
    })
    .name('Box Color')

globalDebug.boxSpin = () => {
    gsap.to(mesh.rotation, {y: mesh.rotation.y + Math.PI * 2})
}

cubeTweaks
    .add(globalDebug, 'boxSpin')
    .name('Give the box a spin!')

globalDebug.subdiv = 2
cubeTweaks
    .add(globalDebug, 'subdiv')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => {
        mesh.geometry.dispose()
        mesh.geometry = new THREE.BoxGeometry(1, 1, 1, globalDebug.subdiv, globalDebug.subdiv, globalDebug.subdiv)
    })
    .name('Sub-Division Levels')






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

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()