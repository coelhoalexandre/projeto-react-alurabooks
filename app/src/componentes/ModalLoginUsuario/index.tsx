import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks";
import { useState } from "react";

import imagemPrincipal from "../../assets/login.png";

import "./ModalLoginUsuario.css";
import { usePersistirToken } from "../../hooks/tokenHooks";
import http from "../../http";

interface PropsModalLoginUsuario {
  aberta: boolean;
  aoFechar: () => void;
  aoEfetuarLogin: () => void;
}

const ModalLoginUsuario = ({
  aberta,
  aoFechar,
  aoEfetuarLogin,
}: PropsModalLoginUsuario) => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const persistirToken = usePersistirToken();

  const aoSubmeterFormular = (evento: React.FormEvent<HTMLFormElement>) => {
    evento.preventDefault();
    const usuario = {
      email,
      senha,
    };
    http
      .post("public/login", usuario)
      .then((resposta) => {
        persistirToken(resposta.data.access_token);
        setEmail("");
        setSenha("");
        aoEfetuarLogin();
      })
      .catch((erro) => {
        if (erro?.response?.data?.message) {
          alert(erro.response.data.message);
        } else {
          alert("Aconteceu um erro inesperado ao efetuar o seu login!");
        }
      });
  };

  return (
    <AbModal titulo="Login" aberta={aberta} aoFechar={aoFechar}>
      <section className="corpoModalCadastro">
        <figure>
          <img
            src={imagemPrincipal}
            alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura"
          />
        </figure>
        <form onSubmit={aoSubmeterFormular}>
          <AbCampoTexto
            label="E-mail"
            value={email}
            onChange={setEmail}
            type="email"
          />
          <AbCampoTexto
            label="Senha"
            value={senha}
            onChange={setSenha}
            type="password"
          />
          <div className="acoes">
            <AbBotao texto="Fazer login" />
          </div>
        </form>
      </section>
    </AbModal>
  );
};

export default ModalLoginUsuario;
