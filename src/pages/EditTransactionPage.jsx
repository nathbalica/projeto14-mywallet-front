import styled from "styled-components";
import apis from "../services/apis";
import useAuth from "../hooks/auth";
import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { replace } from "lodash";

export default function EditTransactionPage() {
    const { type } = useParams();
    const { state: transaction } = useLocation();
    const [form, setForm] = useState({ value: transaction.value, description: transaction.description });
    const { userAuth } = useAuth();
    const navigate = useNavigate();
    const textUpdate = type === "entrada" ? "Entrada" : "Saída"


    function handleForm(e) {
        let { name, value } = e.target;
      
        if (name === "value") {
          value = replace(value, ",", ".");

          if (!isValidNumber(value)) {
            return; // Ignora o valor inválido
          }
        }
      
        setForm({ ...form, [name]: value });
      }

      function isValidNumber(value) {
        // Verifica se o valor é um número válido
        return !isNaN(parseFloat(value)) && isFinite(value);
      }

    function handleUpdateTransaction(e) {
        e.preventDefault();

        const data = { ...form, type: transaction.type};


        apis.updateTransaction(transaction._id, userAuth.token, data)
            .then((res) => {
                navigate("/home");
            })
            .catch((err) => {
                alert(err.response.data);
            });
    }

    return (
        <TransactionsContainer>
            <h1>Editar {textUpdate}</h1>
            <form onSubmit={handleUpdateTransaction}>
                <input
                    data-test="registry-amount-input"
                    placeholder="Valor"
                    type="text"
                    name="value"
                    value={form.value}
                    onChange={handleForm}
                    required
                />
                <input
                    data-test="registry-name-input"
                    placeholder="Descrição"
                    type="text"
                    name="description"
                    value={form.description}
                    onChange={handleForm}
                />
                <button
                    data-test="registry-save"
                    type="submit"
                >
                    Atualizar {textUpdate}
                </button>
            </form>
        </TransactionsContainer>
    );
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
`;
