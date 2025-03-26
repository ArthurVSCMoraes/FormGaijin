import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';

// Defina a animação de movimento das nuvens
const moveClouds = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-1000px); /* Ajuste este valor para controlar a distância do movimento */
  }
`;

// Definição dos Styled Components para estilização
const CloudDiv = styled.div`
  position: absolute;
  bottom: 20%;
  width: 99vw;
  height: auto;
  overflow: hidden;
  z-index: 1;
`;

const CloudImg = styled.img`
  width: auto;
  height: auto;
  /* Aplica a animação */
  animation: ${moveClouds} 50s linear infinite; /* Ajuste a duração e o tipo de animação */
`;

const HeaderDiv = styled.div`
  width: 100%;
  height: 1019px;
  background-image: url('https://i.postimg.cc/SsvD6VB0/banner-Gaijin.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  @media (max-width: 768px) {
    height: 600px;
  }
  @media (max-width: 480px) {
    height: 400px;
  }
`;

const TextHeaderH1 = styled.h1`
  color: white;
  font-size: 60px;
  top: 75%;
  text-align: center;
  margin: 0px;
  width: 70%;
  padding-left: 15%;
  font-family: 'Jim Nightshade', cursive;
  font-style: normal;
  position: absolute;
  @media (max-width: 768px) {
    font-size: 50px;
    top: 60%;
    padding-left: 10%;
  }
  @media (max-width: 480px) {
    font-size: 40px;
    top: 50%;
    padding-left: 5%;
    width: 90%;
  }
`;

const FormAreaDiv = styled.div`
  position: relative;
  padding-left: 10%;
  padding-right: 10%;
  @media (max-width: 768px) {
    padding-left: 5%;
    padding-right: 5%;
  }
`;

const ReqH3 = styled.h3`
  font-family: 'Jim Nightshade', cursive;
  font-style: normal;
  font-size: 65px;
  color: rgb(120, 3, 216);
  @media (max-width: 768px) {
    font-size: 55px;
  }
  @media (max-width: 480px) {
    font-size: 45px;
  }
`;

const ReqListOl = styled.ol`
  font-family: 'Jim Nightshade', cursive;
  font-style: oblique;
  font-size: 40px;
  color: rgb(120, 3, 216);
  @media (max-width: 768px) {
    font-size: 35px;
  }
  @media (max-width: 480px) {
    font-size: 30px;
  }
  list-style: none;
  padding-left: 0;
`;

const NameAndIdDiv = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  gap: 20px;
`;

const AgeAndNumberDiv = styled.div`
  display: flex;
  justify-content: space-around;
  @media (max-width: 768px) {
    flex-direction: column;
  }
  gap: 20px;
`;

const JapaDiv = styled.div`
  position: absolute;
  right: 20px;
  top: 30%;
  transform: translateY(-50%);
  font-size: 60px;
  font-weight: bold;
  text-align: center;
  line-height: 1.5;
  @media (max-width: 768px) {
    font-size: 50px;
    right: 10px;
    top: 20%;
  }
  @media (max-width: 480px) {
    font-size: 40px;
    right: 5px;
    top: 10%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  font-family: 'Jim Nightshade', cursive;
`;

const Input = styled.input`
  padding: 15px;
  border: none;
  border-bottom: 2px solid #ad59b6;
  border-radius: 0;
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  font-family: sans-serif;
  &::placeholder {
    color: #ccc;
  }
  &:focus {
    outline: none;
    border-bottom: 2px solid #ad59b6;
  }
`;

const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  font-weight: normal;
  font-size: 32px;
  color: #ad59b6;
  font-family: 'Jim Nightshade', cursive;
`;

const Select = styled.select`
  padding: 15px;
  border: none;
  border-bottom: 2px solid #ad59b6;
  border-radius: 0;
  box-sizing: border-box;
  width: 100%;
  font-size: 20px;
  font-family: sans-serif;
  &:focus {
    outline: none;
    border-bottom: 2px solid #ad59b6;
  }
  background-color: #f5f5f5;
`;

const Button = styled.button`
  background-color: #ad59b6;
  color: white;
  padding: 15px 30px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 22px;
  transition: background-color 0.3s ease;
  margin-top: 10px;
  font-family: 'Jim Nightshade', cursive;
  &:hover {
    background-color: #91459e;
  }
`;

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 15px;
  font-size: 20px;
  color: #ad59b6;
  font-family: 'Jim Nightshade', cursive;
`;

const RadioInput = styled.input`
  margin-right: 5px;
`;

const GaijinForm = () => {
  const [formData, setFormData] = useState({
    nomeInGame: '',
    idInGame: '',
    idadeOffRp: '',
    numeroInGame: '',
    hierarquia: '',
    faccao: '',
    alien: '',
    status: 'pendente',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = 'http://localhost:3000/salvarFormulario';
      console.log('Enviando dados para:', url);
      console.log('Dados:', formData);

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      console.log('Resposta do servidor:', response);
      if (response.ok) {
        alert('Dados enviados com sucesso!');
        setFormData({
          nomeInGame: '',
          idInGame: '',
          idadeOffRp: '',
          numeroInGame: '',
          hierarquia: '',
          faccao: '',
          alien: '',
          status: 'pendente',
        });
      } else {
        const errorText = await response.text();
        console.error('Erro ao enviar os dados:', response.status, errorText);
        alert(`Erro ao enviar os dados: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao enviar os dados: ' + error);
    }
  };

  return (
    <>
      <CloudDiv>
        <CloudImg
          src="https://demos.creative-tim.com/paper-kit-react/static/media/clouds.3c700c13.png"
          alt=""
        />
      </CloudDiv>
      <HeaderDiv>
        <TextHeaderH1>
          Seja bem-vindo(a) ao processo de recrutamento da Gaijin. Nosso foco é
          proteger nossa família e ser a maior organização da cidade.
        </TextHeaderH1>
      </HeaderDiv>

      <FormAreaDiv>
        <div>
          <ReqH3>Requisitos:</ReqH3>
          <ReqListOl>
            <li>
              <bold>Conhecer as regras da cidade.</bold>
            </li>
            <li>Conhecimeto básico em RP e RP Ilegal.</li>
            <li>Cumprir o farm semanal.</li>
            <li>Estar sempre conectado em nossa rádio.</li>
            <li>Ser resenha!!!</li>
          </ReqListOl>
        </div>
        <div>
          <Form id="meuFormulario" onSubmit={handleSubmit}>
            <NameAndIdDiv>
              <Label>
                <p>Nome in-game</p>
                <Input
                  type="text"
                  name="nomeInGame"
                  id="nomeInGame"
                  value={formData.nomeInGame}
                  onChange={handleChange}
                  placeholder="Digite seu nome in-game"
                />
              </Label>
              <Label>
                <p>Id in-game</p>
                <Input
                  type="text"
                  name="idInGame"
                  id="idInGame"
                  value={formData.idInGame}
                  onChange={handleChange}
                  placeholder="Digite seu id in-game"
                />
              </Label>
            </NameAndIdDiv>
            <AgeAndNumberDiv>
              <Label>
                <p>Idade Off-rp</p>
                <Input
                  type="text"
                  name="idadeOffRp"
                  id="idadeOffRp"
                  value={formData.idadeOffRp}
                  onChange={handleChange}
                  placeholder="Digite sua idade off-rp"
                />
              </Label>
              <Label>
                <p>Número in-game</p>
                <Input
                  type="text"
                  name="numeroInGame"
                  id="numeroInGame"
                  value={formData.numeroInGame}
                  onChange={handleChange}
                  placeholder="Digite seu número in-game"
                />
              </Label>
            </AgeAndNumberDiv>
            <Label>
              <p>Como você lida com a hierarquia?</p>
              <Input
                type="text"
                name="hierarquia"
                id="hierarquia"
                value={formData.hierarquia}
                onChange={handleChange}
                placeholder="Descreva como você lida com a hierarquia"
              />
            </Label>
            <Label>
              <p>
                Você já fez parte de alguma facção na cidade? Se sim, qual facção
                e qual cargo você ocupava?
              </p>
              <Input
                type="text"
                name="faccao"
                id="faccao"
                value={formData.faccao}
                onChange={handleChange}
                placeholder="Informe sua experiência com facções"
              />
            </Label>
            <Label>
              <p>Se você visse um et no meio da cidade, como você reagiria</p>
              <Select
                id="alien"
                name="alien"
                required
                value={formData.alien}
                onChange={handleChange}
              >
                <option value="" disabled selected>
                  Escolha ou digite...
                </option>
                <option value="Correr">Correr</option>
                <option value="Chamar ADM">Chamar ADM</option>
                <option value="Me esconder e chamar a polícia">
                  Me esconder e chamar a polícia
                </option>
                <option value="Saio correndo desesperado">
                  Saio correndo desesperado
                </option>
                <option value="Ligo pra minha mãe e digo que eu a amo">
                  Ligo pra minha mãe e digo que eu a amo
                </option>
              </Select>
            </Label>
            <Button type="submit">Enviar</Button>
          </Form>
        </div>
        <JapaDiv>
          {' '}
          家 <br />
          族<br />
          を<br />
          敬<br />
          う
        </JapaDiv>
      </FormAreaDiv>
    </>
  );
};

export default GaijinForm;

