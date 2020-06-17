import Router from 'next/router'
import { useLazyQuery, useQuery, useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ChangeEvent, useEffect, useState, FormEvent } from 'react'
import { FiArrowLeft } from 'react-icons/fi'
import {
  Container,
  Form,
  ItemsList,
  ItemsListItem,
} from '../Components/CadastroComponents'
import { withApollo } from '../graphql/client'
import { NexusGenTypes } from '../graphql/generated/nexus-typegen'

const MapWithNoSSR = dynamic(() => import('../Components/Map'), {
  ssr: false,
})

const ALL_ITEMS = gql`
  query ItemsQuery {
    items {
      id
      image
      title
      imageUrl
    }
  }
`

const ALL_UFS = gql`
  query UfsQuery {
    ufs(orderBy: "nome") {
      id
      nome
      sigla
    }
  }
`

const CITY_BY_UF = gql`
  query CitiesByUf($uf: String!) {
    citiesByUF(uf: $uf, orderBy: "nome") {
      id
      nome
    }
  }
`

const ADD_POINT = gql`
  mutation CreatePoint($data: PointCreateInput!) {
    createOnePoint(data: $data) {
      id
      name
    }
  }
`

const Cadastro = () => {
  const itensQuery = useQuery<{
    items: Array<NexusGenTypes['fieldTypes']['Item']>
  }>(ALL_ITEMS)
  const ufsQuery = useQuery<{ ufs: Array<NexusGenTypes['fieldTypes']['UF']> }>(
    ALL_UFS
  )
  const [getCities, cityQuery] = useLazyQuery<{
    citiesByUF: Array<NexusGenTypes['fieldTypes']['Municipio']>
  }>(CITY_BY_UF)

  const [addPoint] = useMutation<
    { createOnePoint: NexusGenTypes['fieldTypes']['Point'] },
    { data: NexusGenTypes['inputTypes']['PointCreateInput'] }
  >(ADD_POINT)

  const [selectedUF, setSelectedUF] = useState<string>('')
  const [data, setData] = useState({
    nome: '',
    email: '',
    whatsapp: '',
  })
  const [selectedCity, setSelectedCity] = useState<string>('')
  const [selectedItems, setSelectedItems] = useState<number[]>([])
  const [selectedPosition, setSelectedPosition] = useState<[number, number]>([
    -22.8904704,
    -47.2044824,
  ])

  useEffect(() => {
    if (selectedUF) {
      getCities({ variables: { uf: selectedUF } })
    }
  }, [selectedUF])

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setData((data) => ({ ...data, [name]: value }))
  }

  const handleSelectItem = (itemId: number) => {
    const isInArray = selectedItems.indexOf(itemId) >= 0
    if (isInArray) {
      const filteredItems = selectedItems.filter((id) => id !== itemId)
      setSelectedItems(filteredItems)
    } else {
      setSelectedItems((ids) => [...ids, itemId])
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const result = await addPoint({
      variables: {
        data: {
          email: data.email,
          name: data.email,
          whatsapp: data.whatsapp,
          image:
            'https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60',
          city: selectedCity,
          uf: selectedUF,
          latitude: selectedPosition[0],
          longitude: selectedPosition[1],
          items: {
            connect: selectedItems.map((id) => ({
              id,
            })),
          },
        },
      },
    })
    if (!result.errors) {
      alert('Ponto de coleta criado!')
      Router.push('/')
    }
  }

  return (
    <Container>
      <header>
        <img src="/assets/logo.svg" alt="Ecoleta" />
        <Link href="/">
          <a>
            <FiArrowLeft />
            Voltar para home
          </a>
        </Link>
      </header>
      <Form onSubmit={handleSubmit}>
        <h1>
          Cadastro do <br /> ponto de coleta
        </h1>
        <fieldset>
          <div className="legend">
            <h2>Dados</h2>
          </div>
          <div className="field">
            <label htmlFor="name">Nome da entidade</label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
          </div>
          <div className="field-group">
            <div className="field">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                onChange={handleInputChange}
              />
            </div>
            <div className="field">
              <label htmlFor="whatsapp">Whatsapp</label>
              <input
                type="text"
                name="whatsapp"
                id="whatsapp"
                onChange={handleInputChange}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div className="legend">
            <h2>Endereço</h2>
            <span>Selecione o endereço no mapa</span>
          </div>
          <MapWithNoSSR
            mapProps={{
              center: selectedPosition,
              zoom: 15,
              onclick: (e) => {
                setSelectedPosition([e.latlng.lat, e.latlng.lng])
              },
            }}
            markerProps={{ position: selectedPosition }}
          />

          <div className="field-group">
            <div className="field">
              <label htmlFor="uf">Estado (UF)</label>
              <select
                value={selectedUF}
                onChange={(e) => {
                  setSelectedUF(e.target.value)
                }}
                name="uf"
                id="uf"
              >
                <option value="0">Selecione uma UF</option>
                {ufsQuery.data?.ufs.map((uf) => (
                  <option key={uf.id} value={uf.sigla}>
                    {uf.sigla}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="city">Cidade</label>
              <select
                name="city"
                id="city"
                value={selectedCity}
                onChange={(e) => {
                  setSelectedCity(e.target.value)
                }}
                disabled={cityQuery.loading || !cityQuery.called}
              >
                <option value="0">Selecione uma cidade</option>
                {cityQuery.data?.citiesByUF.map((city) => (
                  <option key={city.id} value={city.nome}>
                    {city.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>
        <fieldset>
          <div className="legend">
            <h2>Ítems de coleta</h2>
            <span>Selecione um ou mais itens abaixo</span>
          </div>
          {itensQuery.loading ? (
            <div>loading</div>
          ) : (
            <ItemsList>
              {itensQuery.data?.items.map((item) => (
                <ItemsListItem
                  className={`${selectedItems.includes(item.id) && 'selected'}`}
                  onClick={() => handleSelectItem(item.id)}
                  key={item.id}
                >
                  <img src={item.imageUrl} alt="Teste" />
                  <span>{item.title}</span>
                </ItemsListItem>
              ))}
            </ItemsList>
          )}
        </fieldset>
        <button type="submit">Cadastrar ponto de coleta</button>
      </Form>
    </Container>
  )
}

export default withApollo(Cadastro, { ssr: false })
