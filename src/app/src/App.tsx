import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [detectResult, setDetectResult] = useState(undefined as string | undefined)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <input type="file" accept=".jpg,.png" onChange={(event) => {
          const file = event.target.files?.[0]
          if (file) {
            setDetectResult(undefined)
            const reader = new FileReader()
            reader.onload = async (event) => {              
              await fetch('/api/detect', {
                method: 'POST',
                headers: {
                  'Content-Type': file.type
                },
                body: event.target?.result
              }).then(response => response.json()).then(data => setDetectResult(data))
            }
            reader.readAsArrayBuffer(file)
          }
        }} />
        {detectResult && <div><pre>{JSON.stringify(detectResult, null, 2)}</pre></div>}
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
