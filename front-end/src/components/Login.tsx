import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "./../api/customAxios";
import { mainButtonStyle, mainInputStyle } from "../styles/style";
import { useMutation } from "@tanstack/react-query";
import { loginStore } from "../store/todo.store";

export default function Login() {
  const navigate = useNavigate();
  const { setLogin } = loginStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const changePW = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const loginMutation = useMutation(
    () =>
      api.post("/users/login", {
        email,
        password,
      }),
    {
      onSuccess: ({ data }) => {
        localStorage.setItem("key", data.token);
        setLogin(true);
        alert(data.message);
        navigate("/");
      },
      onError: ({ response }) => {
        alert(response.data.details);
      },
    }
  );

  const login = () => {
    loginMutation.mutate();
  };

  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={changeEmail}
        placeholder="이메일을 입력하세요"
        className={mainInputStyle}
      />
      <input
        type="password"
        value={password}
        onChange={changePW}
        placeholder="비밀번호를 입력하세요"
        className={mainInputStyle}
      />
      <div className="flex justify-around">
        <button onClick={login} disabled={false} className={mainButtonStyle}>
          로그인
        </button>
        <Link to="/signup" className={mainButtonStyle}>
          회원가입
        </Link>
      </div>
    </div>
  );
}
