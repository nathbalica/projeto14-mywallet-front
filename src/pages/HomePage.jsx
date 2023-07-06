import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import apis from "../services/apis"
import useAuth from "../hooks/auth"
import { useState } from "react"
import { useEffect } from "react"
import dayjs from "dayjs"
import { useNavigate } from "react-router-dom"

export default function HomePage() {
  const [transactions, setTransactions] = useState(null)
  const { userAuth } = useAuth();
  const navigate = useNavigate()

  console.log(userAuth.token)

  function handleGetTransactions() {
    apis.getTransaction(userAuth.token)
      .then(res => {
        setTransactions(res.data)
        console.log(res.data)
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  useEffect(() => {
    handleGetTransactions()
}, [])

  if (transactions === null) {
    return <h1>Carregando...</h1>;
  }

  const totalBalance = transactions.reduce((sum, transaction) => {
    if (transaction.type === "profit") {
      return sum + transaction.value;
    } else {
      return sum - Math.abs(transaction.value);
    }
  }, 0);

  const balanceColor = totalBalance >= 0 ? "positivo" : "negativo";

  return (
    <HomeContainer>

      <Header>
        <h1>Olá, {userAuth.userName}</h1>
        <BiExit />
      </Header>
      {transactions.length === 0 ? (
        <CenteredTransactionsContainer>
          <h1>Não há registros de entrada ou saída</h1>
        </CenteredTransactionsContainer>
      ) : (
        <TransactionsContainer>
          <ul>
            {transactions.map((transaction) => (
              <ListItemContainer key={transaction._id}>
                <div>
                  <span>{dayjs(transaction.date).format('DD/MM')}</span>
                  <strong>{transaction.description}</strong>
                </div>
                <Value color={transaction.type === "profit" ? "positivo" : "negativo"}>
                  {transaction.value.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </Value>
              </ListItemContainer>
            ))}
          </ul>

          <article>
            <strong>Saldo</strong>
            <Value color={balanceColor}>
              {totalBalance.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </Value>
          </article>
        </TransactionsContainer>

      )}

      <ButtonsContainer>

        <button onClick={() => navigate("/nova-transacao/entrada")}>
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>
      
        <button onClick={() => navigate("/nova-transacao/saida")}>
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
        </button>

      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`

const CenteredTransactionsContainer = styled(TransactionsContainer)`
    justify-content: center;
    padding: 0 63px;
    h1{
    color: #868686;
    text-align: center;
    font-family: Raleway;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`

export const Legend = styled.p`
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 28px;
    color: #666666;
    margin-top: 28px;
    padding: 0 17px;
`