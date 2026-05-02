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

function SubmitButton({ children }) {
  return <button className="auth-form__submit" type="submit">{children}</button>
}

function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login:', { email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <TextInput label="Email" type="email" value={email} onChange={setEmail} />
      <PasswordBlock value={password} onChange={setPassword} />
      <SubmitButton>Sign in</SubmitButton>
    </form>
  )
}

function App() {
  return (
    <AuthForm />
  )
}

export default App;
