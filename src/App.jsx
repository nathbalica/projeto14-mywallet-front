import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { AuthContextProvider } from "./contexts/AuthContext"
import EditTransactionPage from "./pages/EditTransactionPage"


export default function App() {

  return (
    <AuthContextProvider>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:type" element={<TransactionsPage />} />
            <Route path="/editar-registro/:type/:id" element={<EditTransactionPage />} />
            {/* <Route path="/editar-registro/:tipo/:id" element={<EditTransactionPage />} /> */}
          </Routes>
        </BrowserRouter>
      </PagesContainer>
    </AuthContextProvider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
