import type { ReactNode } from 'react';

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  /** Từ in nghiêng kiểu editorial đặt sau tiêu đề, giống "Sanctuary" ở landing. */
  flourish?: string;
  subtitle?: string;
  actions?: ReactNode;
}

/** Đầu trang chuẩn của portal: eyebrow + tiêu đề serif + đường kẻ vàng, đồng bộ với landing. */
export function PageHeader({ eyebrow, title, flourish, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="portal-header">
      <div>
        <p className="portal-eyebrow">{eyebrow}</p>
        <h1 className="portal-title">
          {title}
          {flourish && <> <em>{flourish}</em></>}
        </h1>
        {subtitle && <p className="portal-subtitle">{subtitle}</p>}
      </div>
      {actions && <div className="portal-header__actions">{actions}</div>}
    </div>
  );
}
