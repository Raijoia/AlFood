import { useEffect, useState } from 'react';
import IRestaurante from '../../interfaces/IRestaurante';
import style from './ListaRestaurantes.module.scss';
import Restaurante from './Restaurante';
import axios from 'axios';

const ListaRestaurantes = () => {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    // obtendo a api
    axios.get("http://localhost:8000/api/v1/restaurantes/")
      .then(resposta => {
        // pegando a respota
        setRestaurantes(resposta.data.results)
      })
      .catch(erro => {
        // caso dê erro
        console.log(erro)
      })
  }, [])

  return (
    <section className={style.ListaRestaurantes}>
      <h1>Os restaurantes mais <em>bacanas</em>!</h1>
      {restaurantes?.map(item => <Restaurante restaurante={item} key={item.id} />)}
    </section>
  )
}

export default ListaRestaurantes