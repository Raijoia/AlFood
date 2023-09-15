import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios, { AxiosRequestConfig } from 'axios';
import { IPaginacao } from '../../interfaces/IPaginacao';
import { Button, InputLabel, MenuItem, Select } from '@mui/material';

interface IParametrosBusca {
  ordering?: string
  search?: string
}

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])
  const [proximaPagina, setProximaPagina] = useState('')
  const [paginaAnterior, setPaginaAnterior] = useState('')
  const [pesquisa, setPesquisa] = useState('')

  const carregarDados = (url: string, opcoes: AxiosRequestConfig = {}) => {
    axios.get<IPaginacao<IRestaurante>>(url, opcoes)
      .then(resposta => {
        // pegando a resposta
        setRestaurantes(resposta.data.results)
        setProximaPagina(resposta.data.next)
        setPaginaAnterior(resposta.data.previous)
      })
      .catch(erro => {
        // caso dê erro
        console.log(erro)
      })
  }

  const pesquisar = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault()
    const opcoes = {
      params: {

      } as IParametrosBusca
    }
    if (pesquisa) {
      opcoes.params.search = pesquisa
    }
    carregarDados('http://localhost:8000/api/v1/restaurantes/', opcoes)
  }

  useEffect(() => {
    carregarDados("http://localhost:8000/api/v1/restaurantes/")
  }, [])


  return (
    <section className={style.ListaRestaurantes}>
      <form onSubmit={pesquisar}>
        <h2>Pesquise pelo seu restaurante</h2>
        <InputLabel id="demo-simple-select-label">Restaurante</InputLabel>
        <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={pesquisa}
        label="Restaurante"
        onChange={evento => setPesquisa(evento.target.value)}
        >
          {restaurantes.map(restaurante => <MenuItem value={restaurante.nome}>{restaurante.nome}</MenuItem>)}
        </Select>
        {/* <TextField 
          value={pesquisa} 
          onChange={evento => setPesquisa(evento.target.value)} 
          label="Pesquisar" 
          variant="outlined" 
        /> */}
        <Button type='submit' variant="contained">Pesquisar</Button>
      </form>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
      {<button onClick={() => carregarDados(paginaAnterior)} disabled={!paginaAnterior}> Página Anterior </button>}
      {<button onClick={() => carregarDados(proximaPagina)} disabled={!proximaPagina}> Próxima página </button>}
    </section>
  )
}

export default ListaRestaurantes