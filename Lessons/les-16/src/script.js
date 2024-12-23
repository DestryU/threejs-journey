import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Sky } from 'three/addons/objects/Sky.js'
import { Timer } from 'three/addons/misc/Timer.js'
import GUI from 'lil-gui'



/**
 * Base
 */
// Debug //
// const gui = new GUI()

// Canvas //
const canvas = document.querySelector('canvas.webgl')

// Scene //
const scene = new THREE.Scene()

/* 

    Textures

*/


// Texture Loader //
const textLoad = new THREE.TextureLoader()

// Floor Textures //

const floorAlphaTexture = textLoad.load('./floor/alpha.jpg')
const floorAlbedoTexture = textLoad.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_diff_1k.webp')
const floorARMTexture = textLoad.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_arm_1k.webp')
const floorNormalTexture = textLoad.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_nor_gl_1k.webp')
const floorDisplacementTexture = textLoad.load('./floor/coast_sand_rocks_02_1k/coast_sand_rocks_02_disp_1k.webp')

floorAlbedoTexture.colorSpace = THREE.SRGBColorSpace

floorAlbedoTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorAlbedoTexture.wrapS = THREE.RepeatWrapping
floorAlbedoTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping

// Wall Textures //

const wallsAlbedoTexture = textLoad.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_diff_1k.webp')
const wallsARMTexture = textLoad.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_arm_1k.webp')
const wallsNormalTexture = textLoad.load('./wall/castle_brick_broken_06_1k/castle_brick_broken_06_nor_gl_1k.webp')

wallsAlbedoTexture.colorSpace = THREE.SRGBColorSpace

// Roof Textures //

const roofAlbedoTexture = textLoad.load('./roof/roof_slates_02_1k/roof_slates_02_diff_1k.webp')
const roofARMTexture = textLoad.load('./roof/roof_slates_02_1k/roof_slates_02_arm_1k.webp')
const roofNormalTexture = textLoad.load('./roof/roof_slates_02_1k/roof_slates_02_nor_gl_1k.webp')

roofAlbedoTexture.colorSpace = THREE.SRGBColorSpace

roofAlbedoTexture.repeat.set(3, 1)
roofARMTexture.repeat.set(3, 1)
roofNormalTexture.repeat.set(3, 1)

roofAlbedoTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

// Bush Textures //

const bushAlbedoTexture = textLoad.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_diff_1k.webp')
const bushARMTexture = textLoad.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_arm_1k.webp')
const bushNORMALTexture = textLoad.load('./bush/leaves_forest_ground_1k/leaves_forest_ground_nor_gl_1k.webp')

bushAlbedoTexture.colorSpace = THREE.SRGBColorSpace

// Grave Texures //

const graveAlbedoTexture = textLoad.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_diff_1k.webp')
const graveARMTexture = textLoad.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_arm_1k.webp')
const graveNormalTexture = textLoad.load('./grave/plastered_stone_wall_1k/plastered_stone_wall_nor_gl_1k.webp')

graveAlbedoTexture.repeat.set(0.3, 0.4)
graveARMTexture.repeat.set(0.3, 0.4)
graveNormalTexture.repeat.set(0.3, 0.4)

graveAlbedoTexture.colorSpace = THREE.SRGBColorSpace

// Door Textures //

const doorAlbedoTexture = textLoad.load('./door/color.webp')
const doorAlphaTexture = textLoad.load('./door/alpha.webp')
const doorAmbientOcclusionTexture = textLoad.load('./door/ambientOcclusion.webp')
const doorHeightTexture = textLoad.load('./door/height.webp')
const doorNormalTexture = textLoad.load('./door/normal.webp')
const doorMetalnessTexture = textLoad.load('./door/metalness.webp')
const doorRoughnessTexture = textLoad.load('./door/roughness.webp')

doorAlbedoTexture.colorSpace = THREE.SRGBColorSpace


/* 

    House

*/

const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20, 80, 80),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTexture,
        transparent: true,
        map: floorAlbedoTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: 0.15,
        displacementBias: -0.05
    })
)
floor.rotation.x = Math.PI * -0.5
scene.add(floor)




// House Group //

const house = new THREE.Group()
scene.add(house)

// Wall objects //

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallsAlbedoTexture,
        aoMap: wallsARMTexture,
        roughnessMap: wallsARMTexture,
        metalnessMap: wallsARMTexture,
        normalMap: wallsNormalTexture
    })
)
house.add(walls)
walls.position.y = 1.25

// Roof  objects //

const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1.3, 4),
    new THREE.MeshStandardMaterial({
        map: roofAlbedoTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)
house.add(roof)
roof.rotation.y = Math.PI * .25
roof.position.y = 2.5 + .65

// Door objects //

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(1.7, 1.618, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorAlbedoTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        normalMap: doorNormalTexture,
        metalnessMap: doorMetalnessTexture,
        roughnessMap: doorRoughnessTexture
    })
)
house.add(door)
door.position.y = 1.628 / 2
door.position.z = 2.01

// Bush objects //

const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    color: '#ccffcc',
    map: bushAlbedoTexture,
    aoMap: bushARMTexture,
    roughnessMap: bushARMTexture,
    metalnessMap: bushARMTexture,
    normalMap: bushNORMALTexture
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(.5, .5, .5)
bush1.position.set(.8, .2, 2.4)
bush1.rotation.x = -(Math.PI * 0.25)

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(.3, .3, .3)
bush2.position.set(.4, .2, 2.75)
bush2.rotation.x = -(Math.PI * 0.25)

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(.6, .6, .6)
bush3.position.set(-1.3, .2, 2.2)
bush3.rotation.x = -(Math.PI * 0.25)

house.add(bush1, bush2, bush3)

// Grave Objects //

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveAlbedoTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture,
})

const graves = new THREE.Group()
scene.add(graves)

for(let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + (Math.random() * 4)
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius


    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.x = x
    grave.position.z = z

    grave.position.y = Math.random() * 0.4

    grave.rotation.x = (Math.random() - 0.5) * 0.35
    grave.rotation.y = (Math.random() - 0.5) * 0.66
    grave.rotation.z = (Math.random() - 0.5) * 0.35


    graves.add(grave)
}

/* 

    Lights

*/

// Ambient light //

const ambientLight = new THREE.AmbientLight('#86cdff', 0.2)
scene.add(ambientLight)

// Directional light //

const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

const doorlight = new THREE.PointLight('#ff7d46', 5)
doorlight.position.set(0, 2.1, 2.5)
scene.add(doorlight)

/* 

    Ghost Lights

*/

const ghost1 = new THREE.PointLight('#8db9c2', 6)
const ghost2 = new THREE.PointLight('#8db9c2', 6)
const ghost3 = new THREE.PointLight('#8db9c2', 6)
scene.add(ghost1, ghost2, ghost3)


/* 

    Sizes

*/

const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes //
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera //
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer //
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/* 

    Camera

*/

// Base camera //
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls //
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/* 

Renderer

*/

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/* 

    Shadows

*/

renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

// Cast and Receive //
directionalLight.castShadow = true
ghost1.castShadow = true
ghost2.castShadow = true
ghost3.castShadow = true

walls.castShadow = true
walls.receiveShadow = true

roof.castShadow = true

floor.receiveShadow = true

for(const grave of graves.children){
    grave.castShadow = true
    grave.receiveShadow = true
}

bush1.receiveShadow = true
bush2.receiveShadow = true
bush3.receiveShadow = true

// Shadow Mapping //

directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10


/* 

    Sky

*/

const sky = new Sky()
sky.scale.set(100, 100, 100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

/* 

    Fog

*/

scene.fog = new THREE.FogExp2('#04343f', 0.075)

/* 

    Global Tick

*/

const timer = new Timer()

const tick = () =>
{
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()


    // Ghosts //

    const ghost1Angle = elapsedTime * 0.1
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = (Math.sin(ghost1Angle) * Math.sin(ghost1Angle * 2.34) * Math.sin(ghost1Angle * 3.45)) + .5

    const ghost2Angle = - elapsedTime * 0.25
    ghost2.position.x = Math.cos(ghost2Angle) * 6
    ghost2.position.z = Math.sin(ghost2Angle) * 6
    ghost2.position.y = (Math.sin(ghost2Angle) * Math.sin(ghost2Angle * 2.34) * Math.sin(ghost2Angle * 3.45)) + .5

    const ghost3Angle = elapsedTime * 0.35
    ghost3.position.x = Math.cos(ghost3Angle) * 5
    ghost3.position.z = Math.sin(ghost3Angle) * 5
    ghost3.position.y = (Math.sin(ghost3Angle) * Math.sin(ghost3Angle * 3.34) * Math.sin(ghost3Angle * 3.45)) + .5
    
    // Door Light Intensity //

    doorlight.intensity = (Math.sin(elapsedTime) + 1) * (Math.sin(elapsedTime * 3.14) + 1)


    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()