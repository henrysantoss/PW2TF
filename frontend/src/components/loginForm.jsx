import React, { useState } from "react";
import '../css/loginForm.css';
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navegar = useNavigate();
  const [login, setEmail] = useState("");
  const [senha, setPassword] = useState("");
  const [errorPopupOpen, setErrorPopupOpen] = useState(false); // Variável de estado para controlar a exibição do popup de erro

  const handleLogin = (e) => {
    e.preventDefault();
  
    fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ login: login, senha: senha }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.Error) {
          setErrorPopupOpen(true); // Exibe o popup de erro
        } else {
            fetch('http://localhost:3001/manterlogado', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
              })
            navegar('/criarteste');
        }
      })
      .catch(error => {
        setErrorPopupOpen(true); // Exibe o popup de erro em caso de erro na requisição
      });
  };
  
  

  return (
    <div className="container">
      <div className="container-login">
        <div className="wrap-login">
          <form className="login-form">
            <span className="login-form-title"> Faça Login para criar Quizzes </span>

            <div className="wrap-input">
              <input
                className={login !== "" ? "has-val input" : "input"}
                type="login"
                value={login}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Login"></span>
            </div>

            <div className="wrap-input">
              <input
                className={senha !== "" ? "has-val input" : "input"}
                type="password"
                value={senha}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="focus-input" data-placeholder="Senha"></span>
            </div>

            <div className="container-login-form-btn">
              <button className="login-form-btn" onClick={handleLogin}>Logar</button>
            </div>
            
            {/* Popup de erro */}
            {errorPopupOpen && (
              <div className="error-popup">
                <span className="error-popup-message">Login/Senha Inválidos</span> <br/>
                <button className="error-popup-close-btn" onClick={() => setErrorPopupOpen(false)}>Fechar</button>
              </div>
            )}

          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;