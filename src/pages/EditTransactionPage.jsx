import styled from "styled-components";
import apis from "../services/apis";
import useAuth from "../hooks/auth";
import { useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";

export default function EditTransactionPage() {
    const { tipo } = useParams();
    const { state: transaction } = useLocation();
    const [form, setForm] = useState({ value: transaction.value, description: transaction.description });
    const { userAuth } = useAuth();
    const navigate = useNavigate();


    function handleForm(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    function handleUpdateTransaction(e) {
        e.preventDefault();

        const data = { ...form, type: tipo };


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
            <h1>Editar {tipo === 'entrada' ? 'Entrada' : 'Saída'}</h1>
            <form onSubmit={handleUpdateTransaction}>
                <input
                    data-test="registry-amount-input"
                    placeholder="Valor"
                    type="number"
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
                    Atualizar {tipo === 'entrada' ? 'Entrada' : 'Saída'}
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
