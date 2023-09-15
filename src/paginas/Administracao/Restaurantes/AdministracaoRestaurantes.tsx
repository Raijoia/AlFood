import { useEffect, useState } from "react"
import IRestaurante from "../../../interfaces/IRestaurante"
import { TableContainer, Paper, Table, TableHead, TableCell, TableRow, TableBody, Button } from "@mui/material"
import { Link } from "react-router-dom"
import http from "../../../http"

const AdministracaoRestaurantes = () => {
  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([])

  useEffect(() => {
    http.get<IRestaurante[]>("restaurantes/")
      .then(resposta => {
        setRestaurantes(resposta.data)
      })
  }, [])

  const excluir = (restauranteAhSerExcluido: IRestaurante) => {
    http.delete(`restaurantes/${restauranteAhSerExcluido.id}/`)
      .then(() => {
        const listaRestaurante = restaurantes.filter(restaurante => restaurante.id !== restauranteAhSerExcluido.id)
        setRestaurantes([...listaRestaurante])
      })
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {restaurantes.map(restaurante => 
            <TableRow key={restaurante.id}>
              <TableCell>
                {restaurante.nome}
              </TableCell>
              <TableCell>
                [ <Link to={`/adm/restaurantes/${restaurante.id}`} >Editar</Link> ]
              </TableCell>
              <TableCell>
                <Button variant="outlined" color="error" onClick={() => excluir(restaurante)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default AdministracaoRestaurantes