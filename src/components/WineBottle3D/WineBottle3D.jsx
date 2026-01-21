import { useRef, useEffect } from 'react'
import "./WineBottle3D.css"
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, OrbitControls, Environment, Float } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'

// Composant pour charger et afficher le modèle 3D de bouteille
function WineBottle3D({ modelPath }) {
  const bottleRef = useRef()
  const groupRef = useRef()
  
  // Charger le modèle GLB/GLTF
  // Le modèle doit être placé dans : public/models/wine-bottle.glb
  const { scene } = useGLTF(modelPath)
  
  useEffect(() => {
    if (scene) {
      // Configurer le modèle
      scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true
          child.receiveShadow = true
          
          // Ajuster les matériaux pour un meilleur rendu
          if (child.material) {
            child.material.metalness = 0.9
            child.material.roughness = 0.9
            child.material.envMapIntensity = 1
          }
        }
      })
      
      // Centrer et dimensionner le modèle
      const box = new THREE.Box3().setFromObject(scene)
      const center = box.getCenter(new THREE.Vector3())
      const size = box.getSize(new THREE.Vector3())
      
      const maxDim = Math.max(size.x, size.y, size.z)
      const scale = 5 / maxDim  // Très grande taille pour être bien visible
      
      scene.position.x = -center.x * scale + 0.5
      scene.position.y = -center.y * scale - 0.25  // Baisser la bouteille
      scene.position.z = -center.z * scale
      scene.scale.setScalar(scale)
      
      // Positionner la bouteille avec un angle élégant
      scene.rotation.z = -0.08  // Inclinaison très légère
      scene.rotation.y = Math.PI * 0.15   // Rotation initiale clean (27°)
    }
  }, [scene])

  useEffect(() => {
    if (groupRef.current) {
      // Animation d'entrée élégante avec GSAP
      gsap.from(groupRef.current.position, {
        y: -8,
        opacity: 0,
        duration: 3.5,
        ease: 'power4.out',
        delay: 0.3
      })
      
      gsap.from(groupRef.current.rotation, {
        y: Math.PI * 2.5,
        duration: 4,
        ease: 'power3.inOut'
      })
      
      gsap.from(groupRef.current.scale, {
        x: 0.5,
        y: 0.5,
        z: 0.5,
        duration: 2.5,
        ease: 'back.out(1.4)'
      })
    }
  }, [])

  // Animation continue de rotation élégante
  useFrame((state) => {
    if (groupRef.current) {
      // Rotation lente et fluide
      groupRef.current.rotation.y += 0.001
      
      // Mouvement vertical très subtil et fluide
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.1
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={groupRef}>
        <primitive object={scene} ref={bottleRef} />
      </group>
    </Float>
  )
}

// Composant principal pour la scène 3D
export default function WineBottle3DBackground({ modelPath = '/models/wine-bottle.glb' }) {
  return (
    <div className="wine-bottle-3d-container">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        {/* Lumières pour meilleure visibilité */}
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={0.8}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 3, 3]} intensity={0.6} color="#ffffff" />
        <pointLight position={[3, -2, 2]} intensity={0.4} color="#ffffff" />
        
        {/* Environnement pour les réflexions */}
        <Environment preset="studio" />
        
        {/* Modèle 3D */}
        <WineBottle3D modelPath={modelPath} />
        
        {/* Contrôles interactifs */}
        <OrbitControls 
          enableZoom={true}
          enablePan={false}
          minDistance={4}
          maxDistance={12}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
          dampingFactor={0.05}
          rotateSpeed={0.5}
          zoomSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}

// Précharger le modèle
useGLTF.preload('/models/wine-bottle.glb')
