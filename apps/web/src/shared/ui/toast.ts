// Thông báo nổi ngắn gọn (thay cho alert()). Dùng chung style .sol-toast trong styles.css.
export function toast(message: string, type: 'success' | 'error' = 'success') {
  document.querySelector('.sol-toast')?.remove();
  const el = document.createElement('div');
  el.className = `sol-toast sol-toast--${type}`;
  el.setAttribute('role', type === 'error' ? 'alert' : 'status');
  el.innerHTML = `<span class="sol-toast__icon" aria-hidden="true">${type === 'error' ? '!' : '✓'}</span>`;
  el.append(message);
  document.body.append(el);
  window.setTimeout(() => el.remove(), type === 'error' ? 5000 : 3200);
}
