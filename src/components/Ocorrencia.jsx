import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ocorrencia.css';

export default function Ocorrencia() {
  const [alunoNome, setAlunoNome] = useState('');
  const [alunoSobrenome, setAlunoSobrenome] = useState('');
  const [alunoMatricula, setAlunoMatricula] = useState('');
  const [data, setData] = useState('');
  const [motivo, setMotivo] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const professorNome = localStorage.getItem('professorNome') || 'Desconhecido';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!alunoNome || !alunoSobrenome || !alunoMatricula || !data || !motivo) {
      setErro('Preencha todos os campos.');
      return;
    }

    const aluno = {
      nome: alunoNome,
      sobrenome: alunoSobrenome,
      matricula: Number(alunoMatricula),
    };

    console.log('Ocorrência registrada:', {
      aluno,
      professor: professorNome,
      data,
      motivo,
    });

    alert('Ocorrência registrada com sucesso!');
    navigate('/');
  };

  return (
    <div className="ocorrencia-container">
      <h1>Registrar Ocorrência</h1>
      <p className="professor-info">Professor: {professorNome}</p>

      <form className="ocorrencia-form" onSubmit={handleSubmit}>
        <div className="campo">
          <label>Nome do Aluno:</label>
          <input
            type="text"
            value={alunoNome}
            onChange={(e) => setAlunoNome(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Sobrenome do Aluno:</label>
          <input
            type="text"
            value={alunoSobrenome}
            onChange={(e) => setAlunoSobrenome(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Matrícula do Aluno:</label>
          <input
            type="number"
            value={alunoMatricula}
            onChange={(e) => setAlunoMatricula(e.target.value)}
            required
            className="no-spinner"
          />
        </div>

        <div className="campo">
          <label>Data:</label>
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>

        <div className="campo">
          <label>Motivo:</label>
          <textarea
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            rows="4"
            required
          />
        </div>

        {erro && <p className="erro">{erro}</p>}

        <button className="botao">Registrar</button>
      </form>
    </div>
  );
}

