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
  const { userAuth, login } = useAuth();
  const navigate = useNavigate()

  useEffect(() => {
    if (!userAuth?.token) {
      navigate("/");
    } else {
      handleGetTransactions();
    }
  }, [userAuth?.token, navigate]);


  function handleGetTransactions() {
    apis.getTransaction(userAuth.token)
      .then(res => {
        setTransactions(res.data)
      })
      .catch(error => {
        console.log(error.response);
      })
  }

  function handleLogout() {
    apis.logout(userAuth.token)
      .then(res => {
        localStorage.removeItem("userAuth");
        login(null);
        navigate("/")
      })
      .catch((err) => {
        alert(err.response.data)
      })
  }

  function handleDeleteTransaction(transactionId) {
    const confirmed = window.confirm("Deseja excluir este registro?");
    if (confirmed) {
      apis.deleteTransaction(transactionId, userAuth.token)
        .then((res) => {
          handleGetTransactions();
        })
        .catch((err) => {
          alert(err.response.data);
        });
    }
  }



  if (!userAuth) {
    return null;
  }
  if (transactions === null) {
    return <h1>Carregando...</h1>;
  }

  const totalBalance = transactions.reduce((sum, transaction) => {
    if (transaction.type === "profit") {
      return sum + transaction.value;
    } else {
      return sum - transaction.value;
    }
  }, 0);

  const balanceColor = totalBalance >= 0 ? "positivo" : "negativo";

  return (
    <HomeContainer>

      <Header>
        <h1 data-test="user-name">Olá, {userAuth.userName}</h1>
        <BiExit data-test="logout" onClick={handleLogout} />
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
                  <strong
                    onClick={() => navigate(`/editar-registro/${transaction.type  === "expense" ? "saida" : "entrada"}`, { state: transaction })}
                    data-test="registry-name"
                  >
                    {transaction.description}
                  </strong>
                </div>
                <div>

                  <Value
                    data-test="registry-amount"
                    color={transaction.type === "profit" ? "positivo" : "negativo"}
                  >
                    {transaction.value.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                      useGrouping: false,
                    })}
                  </Value>
                  <DeleteButton
                    data-test="registry-delete"
                    onClick={() => handleDeleteTransaction(transaction._id)}
                  >
                    x
                  </DeleteButton>
                </div>
              </ListItemContainer>
            ))}
          </ul>

          <article>
            <strong>Saldo</strong>
            <Value data-test="total-amount" color={balanceColor}>
              {Math.abs(totalBalance).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
                useGrouping: false,
              })}
            </Value>
          </article>
        </TransactionsContainer>

      )}

      <ButtonsContainer>

        <button
          data-test="new-income"
          onClick={() => navigate("/nova-transacao/entrada")}
        >
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
        </button>

        <button
          data-test="new-expense"
          onClick={() => navigate("/nova-transacao/saida")}
        >
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
  ul {
    max-height: 350px; /* Defina uma altura máxima para a lista */
    overflow-y: auto; /* Adicione rolagem quando necessário */
    scrollbar-width: none;
    ::-webkit-scrollbar {
      width: 0px;
      background: transparent;
    }
  }

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
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div {
    display: flex;
    align-items: center;
  }

  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`

const DeleteButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 16px;
  width: 5px;
  color: #C6C6C6;
  margin-right: 0;
  flex-shrink: 0;
  padding-right: 0;

  cursor: pointer;
`;

export const Legend = styled.p`
    font-size: 18px;
    line-height: 22px;
    margin-bottom: 28px;
    color: #666666;
    margin-top: 28px;
    padding: 0 17px;
`