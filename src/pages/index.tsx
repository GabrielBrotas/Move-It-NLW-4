import Head from 'next/head';
import { GetServerSideProps } from 'next';

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";

import { CountdownProvider } from "../contexts/CountdownContext";

import styles from '../styles/pages/Home.module.css';
import { ChallengesProvider } from '../contexts/ChallengesContext';

interface HomeProps {
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export default function Home({level, currentExperience, challengesCompleted}: HomeProps) {

  return (
    <ChallengesProvider 
      level={level}
      currentExperience={currentExperience}
      challengesCompleted={challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        {/* Como só o countdown e o challengebox vai ter que utilizar os dados do componente countdown vamos colocar o provider dele aqui para só eles ter acesso  */}
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}

/* 
  Essa função só funciona nas paginas e o nome dela precisa ser obrigatoriamente getServerSidePros e ela precisa se assincrona,

  A aplicação  tem 3 camadas paginas
  1 - back end
  2 - Next.js (Node.js)
  3 - Front-end (React)

  Quando acessamos a aplicação batemos primeiro nno servidor do Next.js, depois é construido a interface no front buscando os dados do backend.
  O next ele roda em cima do node, então podemos fazer qualquer coisa que poderiamos fazer em um backend tradicional, porém não é ideal fazer acesso ao banco de dados, envio de email, acesso a serviços externos, etc.
  Então nessa função getServerSideProps conseguimos manipular quais dados são passados para a camada front end,

  Tudo que fizer de chamada para serviços externos, ou tudo que é assincrono que for feito dentro do componente não vai estar disponivel na tela quando um motor de busca como o google for acessar a aplicação, pois o motor não aguarda a chamada ser finalizada.
  Se a chamada for feita nesse metodo getServerSideProps, o next vai realizar a chamada antes de construir a interface,
  Então primeiro ele pega dos dados da api, passa os dados para o componente para depois sim contruir a tela, 

  Se dermos um console.log dentro dessa função o log vai ser mostrado no terminal do servidor node e não no browser.

  Se criarmos um blog e fizermos a chamada da api no componente para mostrar os dados o motor de busca do google não vai esperar carregar os dados para ler o conteudo e só então indexar a pagina. Para resolver isso fazer a chamada para busca o titulo e o conteudo dentro do metodo getServerSideProps, repassamos os dados atraves da props e acessamos ela. 
*/
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { level, currentExperience, challengesCompleted } = context.req.cookies;
  
  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesCompleted: Number(challengesCompleted),
    },
  }
}