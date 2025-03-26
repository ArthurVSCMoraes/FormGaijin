import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
// Removendo as importações de componentes não existentes
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { cn } from '@/lib/utils';

// Mantendo styled-components para estilos mais complexos
const Container = styled.div`
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
  color: #ad59b6;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
`;

// Usando styled-components para o FilterButton, já que os estilos são personalizados
const FilterButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: ${(props) => {
    if (props.status === 'pendente') return '#60a5fa';
    if (props.status === 'recrutado') return '#86ef7d';
    if (props.status === 'naoRecrutado') return '#fca5a5';
    return '#60a5fa';
  }};
  color: #1f2937;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${(props) => {
      if (props.status === 'pendente') return '#3b82f6';
      if (props.status === 'recrutado') return '#22c55e';
      if (props.status === 'naoRecrutado') return '#ef4444';
      return '#3b82f6';
    }};
    transform: scale(1.05);
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
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
  gap: 2rem;
`;

const ResponseCard = styled(motion.div)`
  border-radius: 0.75rem ;
  border-color: #ad59b6;
  background-color: #ffffff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardContent = styled.div`
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const CardHeader = styled.div`
  margin-bottom: 1.5rem;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #4b5563;
  line-height: 1.5;
`;

const ButtonContainerCard = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

// Usando styled-components para os botões de ação
const RecruitButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  flex: 1;
  background-color: #4ade80;
  color: #15803d;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #22c55e;
    transform: scale(1.05);
  }
`;

const NotRecruitButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: background-color 0.3s ease, transform 0.2s ease;
  flex: 1;
  background-color: #f87171;
  color: #9f1239;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #ef4444;
    transform: scale(1.05);
  }
`;

// Estilos para o modal
const ModalContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContent = styled(motion.div)`
  padding: 2rem;
  border-radius: 1rem;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url('https://www.clubotaku.org/nijiwp/wp-content/uploads/2684.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 4px solid #e61e89;
`;

// Usando styled-components para Input e Button no Modal
const ModalInput = styled.input`
  padding: 0.8rem;
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  width: 100%;
  max-width: 300px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
  border-color: #e61e89;

  &:focus {
    outline: none;
    border-color: #ff847c;
    box-shadow: 0 0 5px rgba(255, 132, 124, 0.5);
  }
`;

const ModalButton = styled.button`
  padding: 0.8rem 1.5rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  background: #e61e89;
  color: white;
  border: none;

  &:hover {
    background: #ad59b6;
    transform: scale(1.05);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const ModalTitle = styled(motion.h2)`
  font-size: 2rem;
  color:rgb(90, 8, 99);
  margin-bottom: 1rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const Responses = () => {
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredResponses, setFilteredResponses] = useState([]);
  const [showModal, setShowModal] = useState(true);
  const [code, setCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch('https://form-gaijin.vercel.app/api/obterFormularios');
        if (!response.ok) {
          throw new Error(`Erro ao obter os dados: ${response.status}`);
        }
        const data = await response.json();
        setResponses(data);
        setFilteredResponses(data.filter(item => item.status === 'pendente'));
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
      const res = await fetch('https://form-gaijin.vercel.app/api/atualizarStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idInGame: response.idInGame, status: 'recrutado' }),
      });

      if (!res.ok) {
        throw new Error('Erro ao atualizar o status do candidato.');
      }

      setResponses((prevResponses) =>
        prevResponses.map((r) =>
          r.idInGame === response.idInGame ? { ...r, status: 'recrutado' } : r
        )
      );
      setFilteredResponses((prevResponses) =>
        prevResponses.filter((r) => r.idInGame !== response.idInGame)
      );
    } catch (error) {
      console.error('Erro:', error);
      alert('Não foi possível recrutar o candidato. Por favor, tente novamente.');
    }
  };

  const handleNotRecruit = async (response) => {
    try {
      const res = await fetch('https://form-gaijin.vercel.app/api/atualizarStatus', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idInGame: response.idInGame, status: 'naoRecrutado' }),
      });

      if (!res.ok) {
        throw new Error('Erro ao atualizar o status do candidato.');
      }

      setResponses((prevResponses) =>
        prevResponses.map((r) =>
          r.idInGame === response.idInGame ? { ...r, status: 'naoRecrutado' } : r
        )
      );
      setFilteredResponses((prevResponses) =>
        prevResponses.filter((r) => r.idInGame !== response.idInGame)
      );
    } catch (error) {
      console.error('Erro:', error);
      alert('Não foi possível marcar o candidato como não recrutado. Por favor, tente novamente.');
    }
  };

  const handleFilter = (status) => {
    if (status === 'pendente') {
      setFilteredResponses(responses.filter((response) => response.status === 'pendente'));
    } else if (status === 'recrutado') {
      setFilteredResponses(responses.filter((response) => response.status === 'recrutado'));
    } else if (status === 'naoRecrutado') {
      setFilteredResponses(responses.filter((response) => response.status === 'naoRecrutado'));
    }
  };

  const handleCodeVerification = () => {
    if (code.toLowerCase() === 'aizick') {
      navigate('/amor');
    } else if(code.toLowerCase() === 'cocorico') {
      setShowModal(false);
    }
  };

  if (loading) {
    return <div className="text-center text-gray-400">Carregando respostas...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Erro: {error}</div>;
  }

  return (
    <>
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
              <ModalTitle>Verificação de Acesso</ModalTitle>
              <ModalInput
                type="text"
                placeholder="Digite o código"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                maxLength={20}
                className="mb-4"
              />
              <ModalButton
                onClick={handleCodeVerification}
                disabled={!code.trim()}
                className="w-full sm:w-auto"
              >
                Verificar
              </ModalButton>
            </ModalContent>
          </ModalContainer>
        )}
      </AnimatePresence>
      {!showModal && (
        <Container>
          <Title>Respostas do Formulário</Title>
          <ButtonContainer>
            <FilterButton status="pendente" onClick={() => handleFilter('pendente')}>
              Pendentes
            </FilterButton>
            <FilterButton status="recrutado" onClick={() => handleFilter('recrutado')}>
              Recrutados
            </FilterButton>
            <FilterButton status="naoRecrutado" onClick={() => handleFilter('naoRecrutado')}>
              Não Recrutados
            </FilterButton>
          </ButtonContainer>
          <GridContainer>
            {filteredResponses.length > 0 ? (
              filteredResponses.map((response, index) => (
                <ResponseCard key={index} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
                  <CardContent>
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold text-gray-800">Nome in-game: {response.nomeInGame}</CardTitle>
                      <CardText className="text-gray-600">Id in-game: {response.idInGame}</CardText>
                    </CardHeader>
                    <div className="space-y-2">
                      <CardText className="text-gray-600">Idade Off-rp: {response.idadeOffRp}</CardText>
                      <CardText className="text-gray-600">Número in-game: {response.numeroInGame}</CardText>
                      <CardText className="text-gray-600">Hierarquia: {response.hierarquia}</CardText>
                      <CardText className="text-gray-600">Facção: {response.faccao}</CardText>
                      <CardText className="text-gray-600">Alien: {response.alien}</CardText>
                    </div>
                    <ButtonContainerCard>
                      <RecruitButton onClick={() => handleRecruit(response)} className="flex-1">Recrutar</RecruitButton>
                      <NotRecruitButton onClick={() => handleNotRecruit(response)} className="flex-1">Não Recrutar</NotRecruitButton>
                    </ButtonContainerCard>
                  </CardContent>
                </ResponseCard>
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500">Nenhuma resposta encontrada.</div>
            )}
          </GridContainer>
        </Container>
      )}
    </>
  );
};

export default Responses;
