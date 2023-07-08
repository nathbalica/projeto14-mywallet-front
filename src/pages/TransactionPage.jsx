import styled from "styled-components"
import apis from "../services/apis";
import useAuth from "../hooks/auth";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function TransactionsPage() {
  const [form, setForm] = useState({ value: '', description: '' })
  const { tipo } = useParams();
  const { userAuth } = useAuth();
  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function newTransaction(e) {
    e.preventDefault()

    const data = { ...form, type: tipo === "entrada" ? "entrada" : "saida" }
    console.log(data)

    apis.createTransaction(data, userAuth.token)
      .then(res => {
        navigate('/home')

      })
      .catch(err => 
        alert(err.response.data)
      )

  }
  return (
    <TransactionsContainer>
      <h1>Nova {tipo === 'entrada' ? 'Entrada' : 'Saída'}</h1>
      <form onSubmit={newTransaction}>
        <input
        data-test="registry-amount-input"
          placeholder="Valor"
          ype="text"
          name="value"
          value={form.value}
          onChange={handleForm}
        />
        <input
        data-test="registry-name-input"
          placeholder="Descrição"
          type="text"
          name="description"
          value={form.description}
          onChange={handleForm}
        />
        <button type="submit" data-test="registry-save">Salvar {tipo === 'entrada' ? 'Entrada' : 'Saída'}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
`
