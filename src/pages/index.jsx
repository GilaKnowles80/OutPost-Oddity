// src/pages/index.jsx (Pages Router - if still using)
import '../styles/globals.css'
import { GameScene } from '../components/GameScene'

export default function IndexPage() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* 3D Canvas fills the background */}
      <GameScene />
      
      {/* Optional overlay UI on top of 3D */}
      <div className="absolute top-4 left-4 text-white z-50">
        <h1 className="text-2xl font-bold">OutPost Oddity</h1>
        <p className="text-sm mt-2">Version 2.0 - Interactive</p>
      </div>
      
      {/* Bottom controls */}
      <div className="absolute bottom-6 left-6 right-6 flex justify-center z-50">
        <p className="text-sm text-gray-300">
          WASD to move · Mouse to look · E to interact
        </p>
      </div>
    </div>
  )
}
