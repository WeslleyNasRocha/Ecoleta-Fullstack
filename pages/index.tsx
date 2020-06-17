import Link from 'next/link'
import { FiLogIn } from 'react-icons/fi'
import { Container } from '../Components/HomeComponents'

const Home = (): JSX.Element => (
  <Container>
    <div className="content">
      <header>
        <img src="/assets/logo.svg" alt="Ecoleta" />
      </header>
      <main>
        <h1>Seu marketplace de coleta de resíduos</h1>
        <p>
          Ajudamos pessoas a encotrarem pontos de coleta de forma eficiente.
        </p>
        <Link href="/cadastro">
          <a>
            <span>
              <FiLogIn />
            </span>
            <strong>cadastre um ponto de coleta</strong>
          </a>
        </Link>
      </main>
    </div>
  </Container>
)

export default Home
