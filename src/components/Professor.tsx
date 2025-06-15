import { useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import './Professor.css';

interface FormularioLogin {
  nome: string;
  sobrenome: string;
  matricula: string;
  senha: string;
}

export default function ProfessorLogin() {
  const [dados, setDados] = useState<FormularioLogin>({
    nome: '',
    sobrenome: '',
    matricula: '',
    senha: ''
  });

  const [erro, setErro] = useState('');
  const [verSenha, setVerSenha] = useState(false);
  const navegar = useNavigate();

  function aoDigitar(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setDados(prev => ({ ...prev, [name]: value }));
    if (erro) setErro('');
  }

  function aoEntrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const camposPreenchidos = Object.values(dados).every(campo => campo.trim() !== '');
    if (!camposPreenchidos) {
      setErro('Preencha todos os campos.');
      return;
    }

    localStorage.setItem('logado', 'true');
    localStorage.setItem('professorNome', `${dados.nome} ${dados.sobrenome}`);
    localStorage.setItem('professorDisciplina', 'Desconhecida');

    navegar('/ocorrencia');
  }

  return (
    <div className="login-container">
      <h1>Login Professor</h1>

      <form onSubmit={aoEntrar} className="login-form">
        {['nome', 'sobrenome', 'matricula'].map((campo) => (
          <div key={campo} className="campo">
            <label htmlFor={campo}>{campo.charAt(0).toUpperCase() + campo.slice(1)}:</label>
            <input
              id={campo}
              name={campo}
              type={campo === 'matricula' ? 'number' : 'text'}
              value={dados[campo as keyof FormularioLogin]}
              onChange={aoDigitar}
              required
              className={campo === 'matricula' ? 'no-spinner' : ''}
            />
          </div>
        ))}

        <div className="campo senha-campo">
          <label htmlFor="senha">Senha:</label>
          <div className="senha-wrapper">
            <input
              id="senha"
              name="senha"
              type={verSenha ? 'text' : 'password'}
              value={dados.senha}
              onChange={aoDigitar}
              required
            />
            <button
              type="button"
              onClick={() => setVerSenha(prev => !prev)}
              className="btn-olho"
              aria-label="Mostrar ou ocultar senha"
            >
              {verSenha ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
            </button>
          </div>
        </div>

        {erro && <p className="erro">{erro}</p>}

        <button className="botao" type="submit">Entrar</button>
      </form>
    </div>
  );
}
