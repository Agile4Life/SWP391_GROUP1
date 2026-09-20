type Props = { title: string; owner: string };

export function PlaceholderPage({ title, owner }: Props) {
  return <section className="page"><p className="eyebrow">SCMS MVP</p><h1>{title}</h1><p>Màn hình đã được tạo route. Owner ticket: <strong>{owner}</strong>.</p><p>Thực hiện theo Jira acceptance criteria trước khi thay placeholder này.</p></section>;
}
