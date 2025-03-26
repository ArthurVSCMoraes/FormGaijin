import React from 'react';

// Estilos para o contêiner principal
const MainContainer = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            background: 'linear-gradient(135deg, #f6d1f5,rgb(134, 8, 165))',
            fontFamily: 'Poppins, sans-serif',
            overflow: 'hidden',
        }}>
            <Title>
                🎂 Parabéns, Bella! 🎂
            </Title>
            <Message>
                Oi, meu amor! &#x1F60D;
                <br />
                Feliz aniversário! Que este dia seja tão especial quanto você é para mim.
                <br />
                Te amo muito! &#x1F495;
            </Message>
            <HeartImage
                src="https://media.tenor.com/2KIRAHdflksAAAAi/blrp-hot-topic.gif"
                alt="Coração pulsante"
                style={{
                    width: '200px',
                    height: 'auto',
                    marginBottom: '2rem',
                    filter: 'drop-shadow(4px 4px 6px rgba(212, 0, 255, 0.3))'
                }}
            />
        </div>
    );
};

// Estilos para o título de parabéns
const Title = () => {
    return (
        <h1 style={{
            fontSize: '3rem',
            color: '#e61e89',
            marginBottom: '1rem',
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
            fontWeight: '600',
        }}>
            🎂 Parabéns, Bella! 🎂
        </h1>
    )
};

// Estilos para o parágrafo de mensagem
const Message = () => {
    return (
        <p style={{
            fontSize: '1.5rem',
            color: '#ff847c',
            marginBottom: '2rem',
            textAlign: 'center',
            padding: '0 1rem',
            lineHeight: '1.6',
            fontWeight: '400',
        }}>
            Oi, meu amor! &#x1F60D;
            <br />
            Feliz aniversário! Que este dia seja tão especial quanto você é para mim.
            <br />
            Te amo muito! &#x1F495;
        </p>
    )
};

// Estilos para a imagem animada
const HeartImage = (props) => {
    return (
        <img
            src={props.src}
            alt={props.alt}
            style={{
                width: '200px',
                height: 'auto',
                marginBottom: '2rem',
                filter: 'drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.3))',
                animation: 'pulse 2s infinite alternate',
            }}
        />
    )
};

const BellaAniversario = () => {
  return (
    <MainContainer />
  )
}

export default BellaAniversario;
