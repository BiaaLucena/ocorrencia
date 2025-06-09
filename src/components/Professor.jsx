import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Professor.css';

const campos = [
  { name: 'nome', label: 'Nome', type: 'text' },
  { name: 'sobrenome', label: 'Sobrenome', type: 'text' },
  { name: 'matricula', label: 'Matrícula', type: 'number' },
];

export default function ProfessorLogin() {
  const [form, setForm] = useState(Object.fromEntries(campos.map(c => [c.name, ''])));
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) =>
    setForm({ ...form, [name]: value });

  const handleLogin = (e) => {
    e.preventDefault();
    const { matricula, nome, sobrenome } = form;

    if (!matricula || !nome || !sobrenome) {
      setErro('Preencha todos os campos.');
      return;
    }

   
    localStorage.setItem('logado', 'true');
    localStorage.setItem('professorNome', `${nome} ${sobrenome}`);
    localStorage.setItem('professorDisciplina', 'Desconhecida');
    navigate('/ocorrencia');
  };

  return (
    <div className="login-container">
      <h1>Login Professor</h1>
      <form onSubmit={handleLogin} className="login-form">
        {campos.map(({ name, label, type }) => (
          <div className="campo" key={name}>
            <label>{label}:</label>
            <input
              name={name}
              type={type}
              value={form[name]}
              onChange={handleChange}
              required
              className={name === 'matricula' ? 'no-spinner' : ''}
            />
          </div>
        ))}

       

        
  {erro && <p className="erro">{erro}</p>}

  <button className="botao" type="submit">Entrar</button>
      </form>
    </div>
  );
}


