interface HeaderProps {
  title?: string
}

export const Header: React.FC<HeaderProps> = ({ title = 'Ecoleta' }) => {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}
