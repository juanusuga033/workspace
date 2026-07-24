import { useEffect, useState } from 'react'
import { supabase } from './supabaseClient'
import Login from './Login'
import Productos from './Productos'

function App() {
  const [session, setSession] = useState(null)
  const [authError, setAuthError] = useState('')

  useEffect(() => {
    if (!supabase) return

    const initSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) {
          setAuthError(error.message)
          return
        }
        setSession(session)
      } catch (err) {
        setAuthError(err.message || 'No se pudo cargar la sesión')
      }
    }

    initSession()

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setAuthError('')
        setSession(session)
      }
    )

    return () => listener.subscription.unsubscribe()
  }, [])

  const handleLogout = async () => {
    if (!supabase) return

    try {
      await supabase.auth.signOut()
      setSession(null)
    } catch (err) {
      setAuthError(err.message || 'No se pudo cerrar la sesión')
    }
  }

  if (!supabase) {
    return (
      <div style={{ maxWidth: 480, margin: '40px auto', padding: 20 }}>
        <h2>No se pudo cargar la app</h2>
        <p>Falta configurar Supabase. Crea un archivo <strong>.env</strong> en la carpeta del proyecto con:</p>
        <pre>{'VITE_SUPABASE_URL=tu-url-de-supabase\nVITE_SUPABASE_ANON_KEY=tu-anon-key'}</pre>
        <p>Luego reinicia Vite.</p>
      </div>
    )
  }

  if (!session) {
    return (
      <div>
        {authError && (
          <p style={{ color: 'red', textAlign: 'center', marginTop: 20 }}>{authError}</p>
        )}
        <Login onLogin={setSession} />
      </div>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 600, margin: '0 auto', paddingTop: 20 }}>
        <h3>Bienvenido, {session.user.email}</h3>
        <button onClick={handleLogout}>Cerrar sesión</button>
      </div>
      <Productos session={session} />
    </div>
  )
}

export default App