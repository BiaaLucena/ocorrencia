import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Ocorrencia.css';

interface Aluno {
  nome: string;
  sobrenome: string;
  matricula: number;
}

interface Turma {
  ano: number;
  curso: string;
}

interface OcorrenciaData {
  aluno: Aluno;
  turma: Turma;
  professor: string;
  disciplina: string;
  data: string;
  motivo: string;
}

export default function Ocorrencia() {
  const [alunoNome, setAlunoNome] = useState('');
  const [alunoSobrenome, setAlunoSobrenome] = useState('');
  const [alunoMatricula, setAlunoMatricula] = useState('');
  const [curso, setCurso] = useState('');
  const [ano, setAno] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [data, setData] = useState('');
  const [motivo, setMotivo] = useState('');
  const [erro, setErro] = useState('');
  const [ocorrencias, setOcorrencias] = useState<OcorrenciaData[]>([]);

  const navigate = useNavigate();
  const professorNome = localStorage.getItem('professorNome') || 'Desconhecido';


  useEffect(() => {
    const dadosSalvos = localStorage.getItem('ocorrencias');
    if (dadosSalvos) {
      setOcorrencias(JSON.parse(dadosSalvos));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem('ocorrencias', JSON.stringify(ocorrencias));
  }, [ocorrencias]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const campos = [alunoNome, alunoSobrenome, alunoMatricula, curso, ano, disciplina, data, motivo];
    if (campos.some(campo => !campo.trim())) {
      setErro('Preencha todos os campos.');
      return;
    }

    const novaOcorrencia: OcorrenciaData = {
      aluno: {
        nome: alunoNome,
        sobrenome: alunoSobrenome,
        matricula: Number(alunoMatricula)
      },
      turma: {
        curso,
        ano: Number(ano)
      },
      professor: professorNome,
      disciplina,
      data,
      motivo
    };

    setOcorrencias(prev => [...prev, novaOcorrencia]);
    alert('Ocorrência registrada com sucesso!');

    setAlunoNome('');
    setAlunoSobrenome('');
    setAlunoMatricula('');
    setCurso('');
    setAno('');
    setDisciplina('');
    setData('');
    setMotivo('');
    setErro('');
  };

  const excluirOcorrencia = (index: number) => {
    const copia = [...ocorrencias];
    copia.splice(index, 1); 
    setOcorrencias(copia);
  };

  return (
    <div className="ocorrencia-page">
      <div className="ocorrencia-container">
        <h1>Registrar Ocorrência</h1>
        <p className="professor-info">Professor: {professorNome}</p>

        <form className="ocorrencia-form" onSubmit={handleSubmit}>
         

          <div className="campo">
            <label>Nome do Aluno:</label>
            <input type="text" value={alunoNome} onChange={e => setAlunoNome(e.target.value)} required />
          </div>

          <div className="campo">
            <label>Sobrenome do Aluno:</label>
            <input type="text" value={alunoSobrenome} onChange={e => setAlunoSobrenome(e.target.value)} required />
          </div>

          <div className="campo">
            <label>Matrícula do Aluno:</label>
            <input type="number" value={alunoMatricula} onChange={e => setAlunoMatricula(e.target.value)} required className="no-spinner" />
          </div>

          <div className="campo">
            <label>Ano:</label>
            <input type="number" value={ano} onChange={e => setAno(e.target.value)} required />
          </div>

          <div className="campo">
            <label>Curso:</label>
            <input type="text" value={curso} onChange={e => setCurso(e.target.value)} required />
          </div>

          <div className="campo">
            <label>Disciplina:</label>
            <input type="text" value={disciplina} onChange={e => setDisciplina(e.target.value)} required />
          </div>

          <div className="campo">
            <label>Data:</label>
            <input type="date" value={data} onChange={e => setData(e.target.value)} required />
          </div>

          <div className="campo">
            <label>Motivo:</label>
            <textarea value={motivo} onChange={e => setMotivo(e.target.value)} rows={4} required />
          </div>

          {erro && <p className="erro">{erro}</p>}

          <button className="botao">Registrar</button>
        </form>
      </div>

      <div className="ocorrencias-lista">
        <h2>Ocorrências Registradas</h2>
        {ocorrencias.length === 0 ? (
          <p>Nenhuma ocorrência registrada ainda.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Aluno</th>
                <th>Matrícula</th>
                <th>Turma</th>
                <th>Disciplina</th>
                <th>Data</th>
                <th>Motivo</th>
                <th>Professor</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {ocorrencias.map((ocorrencia, index) => (
                <tr key={index}>
                  <td>{ocorrencia.aluno.nome} {ocorrencia.aluno.sobrenome}</td>
                  <td>{ocorrencia.aluno.matricula}</td>
                  <td>{ocorrencia.turma.ano}º - {ocorrencia.turma.curso}</td>
                  <td>{ocorrencia.disciplina}</td>
                  <td>{new Date(ocorrencia.data).toLocaleDateString('pt-BR')}</td>
                  <td>{ocorrencia.motivo}</td>
                  <td>{ocorrencia.professor}</td>
                  <td>
                    <button onClick={() => excluirOcorrencia(index)} className="botao-excluir">
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
