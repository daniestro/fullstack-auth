import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import './App.css';

function TextInput({ label, type = 'text', value, onChange }) {
  return (
    <label className="auth-form__field">
      <span className="auth-form__label">{label}</span>
      <input
        className="auth-form__input"
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
      />
    </label>
  )
}

function PasswordButton({ isVisible, onToggle }) {
  return (
    <button
      className="password-block__toggle"
      type="button"
      aria-label={isVisible ? 'Hide password' : 'Show password'}
      onClick={() => onToggle(!isVisible)}
    >
      {isVisible ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  )
}

function PasswordBlock({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="password-block">
      <TextInput label="Password" type={showPassword ? 'text' : 'password'} value={value} onChange={onChange} />
      <PasswordButton isVisible={showPassword} onToggle={setShowPassword} />
    </div>
  )
}

function SubmitButton({ children, disabled }) {
  return (
    <button className="auth-form__submit" type="submit" disabled={disabled}>
      {children}
    </button>
  )
}

export async function login({ email, password }) {
  const res = await fetch('/auth', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  if (!res.ok) throw new Error(`Login failed: ${res.status}`)
  return res.json()
}

export function useLogin() {
  const [error, setError] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submit = async (credentials) => {
    setError(null)
    setIsSubmitting(true)
    try {
      return await login(credentials)
    } catch (err) {
      setError(err.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return { submit, error, isSubmitting }
}

function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { submit, error, isSubmitting } = useLogin()

  const handleSubmit = (e) => {
    e.preventDefault()
    submit({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <TextInput label="Email" type="email" value={email} onChange={setEmail} />
      <PasswordBlock value={password} onChange={setPassword} />
      <SubmitButton disabled={isSubmitting}>
        {isSubmitting ? 'Signing in...' : 'Sign in'}
      </SubmitButton>
      {error && <p className="auth-form__error">{error}</p>}
    </form>
  )
}

function App() {
  return (
    <AuthForm />
  )
}

export default App;
