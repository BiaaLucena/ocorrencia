import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Professor as ProfessorModel } from '../model/Professor';

import './Professor.css';

function Professor() {
  const navigate = useNavigate();

  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [matricula, setMatricula] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [erro, setErro] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nome || !sobrenome || !matricula || !disciplina) {
      setErro('Preencha todos os campos!');
      return;
    }

    const professor = new ProfessorModel(
      nome.trim(),
      Number(matricula),
      disciplina.trim(),
      sobrenome.trim()
    );

    // Armazenar no localStorage (simulando sessão)
    localStorage.setItem('professor', JSON.stringify(professor));
    localStorage.setItem('logado', 'true');

    navigate('/professor');
  };

  return (
    <div className="container">
      <h1 className="titulo">Login Professor</h1>

      {erro && <p className="erro">{erro}</p>}

      <form onSubmit={handleSubmit} className="formulario">
        <div className="campo">
          <label>Nome:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </div>

        <div className="campo">
          <label>Sobrenome:</label>
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Digite seu sobrenome"
          />
        </div>

        <div className="campo">
          <label>Matrícula:</label>
          <input
            type="number"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            placeholder="Digite sua matrícula"
          />
        </div>

        <div className="campo">
          <label>Disciplina:</label>
          <input
            type="text"
            value={disciplina}
            onChange={(e) => setDisciplina(e.target.value)}
            placeholder="Ex.: Matemática, Português..."
          />
        </div>

        <button type="submit" className="botao">
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Professor;
