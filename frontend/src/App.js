import { useState } from 'react'
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

function PasswordButton({ value, onClick }) {
  return (
    <button
      className="password-block__toggle"
      type="button"
      onClick={() => onClick(!value)}
    >{value ? 'Скрыть' : 'Показать'}</button>
  )
}

function PasswordBlock({ value, onChange }) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="password-block">
      <TextInput label="Password" type={showPassword ? 'text' : 'password'} value={value} onChange={onChange} />
      <PasswordButton value={showPassword} onClick={setShowPassword} />
    </div>
  )
}

function SubmitButton({ children, type = 'submit' }) {
  return <button className="auth-form__submit" type={type}>{children}</button>
}

function AuthForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Логин:', { email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <TextInput label="Email" type="email" value={email} onChange={setEmail} />
      <PasswordBlock value={password} onChange={setPassword} />
      <SubmitButton>Войти</SubmitButton>
    </form>
  )
}

function App() {
  return (
    <AuthForm />
  )
}

export default App;
