'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import '../../connect.css'

export default function DashboardLoginPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/connect/dashboard-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    setLoading(false)

    if (!res.ok) {
      setError('Incorrect password.')
      return
    }

    router.push('/connect/dashboard')
    router.refresh()
  }

  return (
    <main className="connect-page">
      <div className="connect-card">
        <h1>Dashboard login</h1>
        <form className="connect-email-form" onSubmit={handleSubmit}>
          <input
            className="connect-email-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
          {error && <p className="connect-error">{error}</p>}
          <button className="connect-submit-btn" type="submit" disabled={loading}>
            {loading ? 'Checking...' : 'Enter'}
          </button>
        </form>
      </div>
    </main>
  )
}
