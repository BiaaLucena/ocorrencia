import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Professor from './components/Professor';

function App() {
  const [logado, setLogado] = useState(false);

  useEffect(() => {
    const autenticado = localStorage.getItem('logado') === 'true';
    setLogado(autenticado);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Se estiver logado, vai para /professor, senão redireciona para /professor também (sem login) */}
        <Route path="/" element={<Navigate to="/professor" />} />
        <Route
          path="/professor"
          element={<Professor />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
