import * as THREE from "three"

const canvas = document.querySelector('canvas.webgl')



const scene = new THREE.Scene()
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({color: 'red', wireframe: true})


const mesh = new THREE.Mesh(geometry, material)

scene.add(mesh)

const sizes = {
    width: 800,
    height: 600
}

const camera = new THREE.PerspectiveCamera(60, sizes.width/sizes.height)

camera.position.z = 3
camera.position.y = 1
scene.add(camera)

const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})

renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)