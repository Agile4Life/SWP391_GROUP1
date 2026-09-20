import { FormEvent, useState } from 'react';

export function LoginPage() {
  const [message, setMessage] = useState('');
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage('API đăng nhập sẽ được triển khai trong SCMS-3.');
  }
  return <main className="login-page"><form onSubmit={submit} className="login-card"><p className="eyebrow">SPORTS CENTER</p><h1>Đăng nhập</h1><label>Email<input type="email" autoComplete="email" required /></label><label>Mật khẩu<input type="password" autoComplete="current-password" required /></label><button type="submit">Đăng nhập</button>{message && <p role="status">{message}</p>}</form></main>;
}
