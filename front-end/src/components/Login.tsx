import { Link } from "react-router-dom";
import { useRef } from "react";
import api from "./../api/customAxios";
import { inputStyle } from "../styles/input.style";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const login = () => {
    api
      .post("/users/login", {
        email: emailRef.current?.value,
        password: pwRef.current?.value,
      })
      .then(({ data }) => {
        localStorage.setItem("key", data.token);
        alert(data.message);
      })
      .catch(({ response }) => {
        alert(response.data.details);
      });
  };

  return (
    <div>
      <input
        type="email"
        ref={emailRef}
        placeholder="이메일을 입력하세요"
        className={inputStyle}
      />
      <input
        type="password"
        ref={pwRef}
        placeholder="비밀번호를 입력하세요"
        className={inputStyle}
      />
      <button onClick={login} disabled={true}>
        로그인
      </button>
      <Link to="/signup">회원가입</Link>
    </div>
  );
}
