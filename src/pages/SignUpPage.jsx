import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import apis from "../services/apis"
import { ThreeDots } from "react-loader-spinner"
import useAuth from "../hooks/auth";


export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirmPassword: "" })


  const navigate = useNavigate()

  function handleForm(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function register(e) {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    const { confirmPassword, ...loginData } = form;


    const promise = apis.signUp(loginData)
    promise.then(res => {

      navigate("/")
    });
    promise.catch(err => {

      alert(err.response.data);

    })

  }

  return (
    <SingUpContainer>
      <form onSubmit={register}>
        <MyWalletLogo />
        <input
          data-test="name"
          placeholder="Nome"
          type="text"
          name="name"
          onChange={handleForm}
          value={form.name}
          required

        />
        <input
          data-test="email"
          placeholder="E-mail"
          type="email"
          name="email"
          onChange={handleForm}
          value={form.email}
          required

        />
        <input
          data-test="password"
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
          name="password"
          onChange={handleForm}
          value={form.password}
          required

        />
        <input
          data-test="conf-password"
          placeholder="Confirme a senha"
          type="password"
          autoComplete="new-password"
          name="confirmPassword"
          onChange={handleForm}
          value={form.confirmPassword}
          required
        />
        <button type="submit" data-test="sign-up-submit">
          Cadastrar
        </button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
