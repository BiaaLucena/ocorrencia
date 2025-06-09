import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Professor.css';

const campos = [
  { name: 'nome', label: 'Nome', type: 'text' },
  { name: 'sobrenome', label: 'Sobrenome', type: 'text' },
  { name: 'matricula', label: 'Matrícula', type: 'number' },
];

export default function ProfessorLogin() {
<<<<<<< HEAD
  const [form, setForm] = useState({ nome: '', sobrenome: '', matricula: '' });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  function mudou({ target }) {
    setForm({ ...form, [target.name]: target.value });
    if (erro) setErro('');
  }

  function entrar(e) {
=======
  const [form, setForm] = useState(Object.fromEntries(campos.map(c => [c.name, ''])));
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) =>
    setForm({ ...form, [name]: value });

  const handleLogin = (e) => {
>>>>>>> e4e182312073e6cc48a384f3edf48550025c92fc
    e.preventDefault();
    const { matricula, nome, sobrenome } = form;

<<<<<<< HEAD
    if (!form.nome || !form.sobrenome || !form.matricula) {
=======
    if (!matricula || !nome || !sobrenome) {
>>>>>>> e4e182312073e6cc48a384f3edf48550025c92fc
      setErro('Preencha todos os campos.');
      return;
    }

<<<<<<< HEAD
    localStorage.setItem('logado', 'true');
    localStorage.setItem('professorNome', `${form.nome} ${form.sobrenome}`);
    localStorage.setItem('professorDisciplina', 'Desconhecida');

    navigate('/ocorrencia');
  }
=======
   
    localStorage.setItem('logado', 'true');
    localStorage.setItem('professorNome', `${nome} ${sobrenome}`);
    localStorage.setItem('professorDisciplina', 'Desconhecida');
    navigate('/ocorrencia');
  };
>>>>>>> e4e182312073e6cc48a384f3edf48550025c92fc

  return (
    <div className="login-container">
      <h1>Login Professor</h1>
<<<<<<< HEAD
      <form onSubmit={entrar} className="login-form">
        {campos.map(({ name, label, type }) => (
          <div className="campo" key={name}>
            <label htmlFor={name}>{label}:</label>
            <input
              id={name}
              name={name}
              type={type}
              value={form[name]}
              onChange={mudou}
=======
      <form onSubmit={handleLogin} className="login-form">
        {campos.map(({ name, label, type }) => (
          <div className="campo" key={name}>
            <label>{label}:</label>
            <input
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
>>>>>>> e4e182312073e6cc48a384f3edf48550025c92fc
              required
              className={name === 'matricula' ? 'no-spinner' : ''}
            />
          </div>
        ))}

<<<<<<< HEAD
        {erro && <p className="erro">{erro}</p>}

        <button className="botao" type="submit">Entrar</button>
=======
       

        
  {erro && <p className="erro">{erro}</p>}

  <button className="botao" type="submit">Entrar</button>
>>>>>>> e4e182312073e6cc48a384f3edf48550025c92fc
      </form>
    </div>
  );
}


<<<<<<< HEAD

=======
>>>>>>> e4e182312073e6cc48a384f3edf48550025c92fc
