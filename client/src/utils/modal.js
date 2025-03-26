import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Importe os componentes BellaAniversario, GaijinForm e Responses
import BellaAniversario from './BellaAniversario';
import GaijinForm from './GaijinForm';
// Removendo a importação não utilizada
// import Responses from './Responses';

const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const TitleResponses = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const ButtonContainerResponses = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 10px;
`;

const FilterButton = styled.button`
  background-color: ${(props) => {
    if (props.status === 'pendente') return '#3b82f6';
    if (props.status === 'recrutado') return '#22c55e';
    if (props.status === 'naoRecrutado') return '#ef4444';
    return '#3b82f6'; // Default
  }};
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: ${(props) => {
      if (props.status === 'pendente') return '#2563eb';
      if (props.status === 'recrutado') return '#16a34a';
      if (props.status === 'naoRecrutado') return '#dc2626';
      return '#2563eb'; // Default
    }};
  }
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  gap: 20px;
`;

const ResponseCard = styled.div`
  border: 1px solid #e5e7eb;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonContainerCard = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 15px;
`;

const RecruitButton = styled.button`
  background-color: #6366f1;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;
  &:hover {
    background-color: #4338ca;
  }
`;

const NotRecruitButton = styled.button`
  background-color: #ef4444;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  flex: 1;
  &:hover {
    background-color: #dc2626;
  }
`;

const ResponsesComponent = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredResponses, setFilteredResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch('http://localhost:3000/obterFormularios');
        if (!response.ok) {
          throw new Error(`Erro ao obter os dados: ${response.status}`);
        }
        const data = await response.json();
        setResponses(data);
        setFilteredResponses(data.filter(item => item.status === 'pendente')); // Mostrar só pendentes inicialmente
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const handleRecruit = async (response) => {
    try {
      const res = await fetch('http://localhost:3000/atualizarStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idInGame: response.idInGame, status: 'recrutado' }),
      });

      if (!res.ok) {
        throw new Error('Erro ao atualizar o status do candidato.');
      }

      setResponses(prevResponses =>
        prevResponses.map(r =>
          r.idInGame === response.idInGame ? { ...r, status: 'recrutado' } : r
        )
      );
      setFilteredResponses(prevResponses =>
        prevResponses.filter(r => r.idInGame !== response.idInGame)
      );

    } catch (error) {
      console.error('Erro:', error);
      alert('Não foi possível recrutar o candidato. Por favor, tente novamente.');
    }
  };

  const handleNotRecruit = async (response) => {
    try {
      const res = await fetch('http://localhost:3000/atualizarStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idInGame: response.idInGame, status: 'naoRecrutado' }),
      });

      if (!res.ok) {
        throw new Error('Erro ao atualizar o status do candidato.');
      }

      setResponses(prevResponses =>
        prevResponses.map(r =>
          r.idInGame === response.idInGame ? { ...r, status: 'naoRecrutado' } : r
        )
      );
      setFilteredResponses(prevResponses =>
        prevResponses.filter(r => r.idInGame !== response.idInGame)
      );
    } catch (error) {
      console.error('Erro:', error);
      alert('Não foi possível marcar o candidato como não recrutado. Por favor, tente novamente.');
    }
  };

  const handleFilter = (status) => {
    if (status === 'pendente') {
      setFilteredResponses(responses.filter(response => response.status === 'pendente'));
    } else if (status === 'recrutado') {
      setFilteredResponses(responses.filter(response => response.status === 'recrutado'));
    } else if (status === 'naoRecrutado') {
      setFilteredResponses(responses.filter(response => response.status === 'naoRecrutado'));
    }
  };

  if (loading) {
    return <div>Carregando respostas...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  return (
    <Container>
      <TitleResponses>Respostas do Formulário</TitleResponses>
      <ButtonContainerResponses>
        <FilterButton status="pendente" onClick={() => handleFilter('pendente')}>
          Pendentes
        </FilterButton>
        <FilterButton status="recrutado" onClick={() => handleFilter('recrutado')}>
          Recrutados
        </FilterButton>
        <FilterButton status="naoRecrutado" onClick={() => handleFilter('naoRecrutado')}>
          Não Recrutados
        </FilterButton>
      </ButtonContainerResponses>
      <GridContainer>
        {filteredResponses.length > 0 ? (
          filteredResponses.map((response, index) => (
            <ResponseCard key={index}>
              <div>
                <p>Nome in-game: {response.nomeInGame}</p>
                <p>Id in-game: {response.idInGame}</p>
                <p>Idade Off-rp: {response.idadeOffRp}</p>
                <p>Número in-game: {response.numeroInGame}</p>
                <p>Hierarquia: {response.hierarquia}</p>
                <p>Facção: {response.faccao}</p>
                <p>Alien: {response.alien}</p>
              </div>
              <ButtonContainerCard>
                <RecruitButton onClick={() => handleRecruit(response)}>Recrutar</RecruitButton>
                <NotRecruitButton onClick={() => handleNotRecruit(response)}>Não Recrutar</NotRecruitButton>
              </ButtonContainerCard>
            </ResponseCard>
          ))
        ) : (
          <div className="col-span-full text-center">Nenhuma resposta encontrada.</div>
        )}
      </GridContainer>
    </Container>
  );
};

const ModalAcesso = ({ onAccess }) => {
  const [showModal, setShowModal] = useState(true);
  const [code, setCode] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const formCode = 'gaijinrp';
  const bellaCode = 'parabensbella';
  const responsesCode = 'verrespostas';


  useEffect(() => {
    if (!isAuthorized) {
      setShowModal(true);
    }
  }, [isAuthorized]);

  const handleInputChange = (e) => {
    setCode(e.target.value);
  };

  const handleButtonClick = () => {
    if (code.toLowerCase() === bellaCode) {
      setIsAuthorized(true);
      setShowModal(false);
      onAccess('bella');
    } else if (code.toLowerCase() === formCode) {
      setIsAuthorized(true);
      setShowModal(false);
      onAccess('form');
    } else if (code.toLowerCase() === responsesCode) {
      setIsAuthorized(true);
      setShowModal(false);
      onAccess('responses');
    }
    else {
      alert('Código incorreto. Tente novamente!');
      setCode('');
    }
  };

  // Estilos para o modal
  const ModalContainer = styled(motion.div)`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8); /* Fundo escuro semi-transparente */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10; /* Garante que o modal esteja na frente de tudo */
  `;

  const ModalContent = styled(motion.div)`
    background: linear-gradient(135deg, #f6d1f5, #fa7d6e); /* Gradiente de rosa claro a laranja */
    padding: 2rem;
    border-radius: 1rem;
    width: 90%; /* Largura responsiva */
    max-width: 400px; /* Largura máxima */
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Sombra para destaque */
    font-family: 'Poppins', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const Input = styled.input`
    padding: 0.8rem;
    border: 2px solid #e61e89; /* Rosa vibrante */
    border-radius: 0.5rem;
    margin-bottom: 1.5rem;
    width: 100%;
    max-width: 300px; /* Largura máxima */
    font-size: 1rem;
    transition: border-color 0.3s ease;
    &:focus {
      outline: none;
      border-color: #ff847c; /* Laranja rosado */
      box-shadow: 0 0 5px rgba(255, 132, 124, 0.5);
    }
  `;

  const Button = styled(motion.button)`
    padding: 0.8rem 1.5rem;
    background: #e61e89; /* Rosa vibrante */
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
    &:hover {
      background: #ff847c; /* Laranja rosado */
      transform: scale(1.05);
    }
    &:disabled {
      background: #ccc;
      cursor: not-allowed;
      transform: none;
    }
  `;

  const Title = styled(motion.h2)` // Alterado para h2 para melhor semântica
    font-size: 2rem;
    color: #e61e89;
    margin-bottom: 1rem;
    font-weight: 600;
  `;

  return (
    <AnimatePresence>
      {showModal && (
        <ModalContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ModalContent
            initial={{ scale: 0.5, y: -20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.5, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Title>Verificação de Acesso</Title>
            <p style={{ fontSize: '1.1rem', color: '#555', marginBottom: '1.5rem' }}>
              Por favor, insira o código para acessar o conteúdo:
            </p>
            <Input
              type="text"
              placeholder="Digite o código"
              value={code}
              onChange={handleInputChange}
              maxLength={20}
            />
            <Button
              onClick={handleButtonClick}
              disabled={!code.trim()}
            >
              Verificar
            </Button>
          </ModalContent>
        </ModalContainer>
      )}
    </AnimatePresence>
  );
};

const App = () => {
  const [access, setAccess] = useState('');
  const navigate = useNavigate();

  const handleAccess = (type ) => {
    setAccess(type);
    navigate(`/${type}`); // Use navigate para atualizar a rota
  };

  useEffect(() => {
    // Se não houver acesso, mostrar o modal
    if (!access) {
      navigate('/');
    }
  }, [access, navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<ModalAcesso onAccess={handleAccess} />} />
        <Route path="/bella" element={<BellaAniversario />} />
        <Route path="/form" element={<GaijinForm />} />
        <Route path="/responses" element={<ResponsesComponent />} />
      </Routes>
    </>
  );
};

const RootApp = () => {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default RootApp;
