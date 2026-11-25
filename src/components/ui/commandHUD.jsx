export default function PrototypePage() {
  return (
    <main style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Background 3D Canvas */}
      <OutpostScene />

      {/* HTML UI Overlay Layer */}
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, pointerEvents: 'auto' }}>
        <h1 style={{ color: '#fff', fontSize: '1.5rem', fontFamily: 'sans-serif' }}>OutPost Oddity — 3D Prototype</h1>
        <p style={{ color: '#aaa', fontSize: '0.9rem' }}>WASD — Move | Drag — Look Around | Scroll — Zoom</p>
        
        {/* Wired Action Button */}
        <a 
          href="url?id=1" 
          style={{
            display: 'inline-block',
            marginTop: '10px',
            padding: '8px 16px',
            backgroundColor: '#7df9ff',
            color: '#000',
            fontWeight: 'bold',
            borderRadius: '4px',
            textDecoration: 'none'
          }}
        >
          [Play Episode 1]
        </a>
      </div>
    </main>
  );
}