import { Link } from "react-router-dom";
import { useRef } from "react";
import api from "./../api/customAxios";

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
      });
  };

  return (
    <div>
      <Link to="/signup">회원가입</Link>
      <input type="text" ref={emailRef} placeholder="아이디를 입력하세요" />
      <input type="text" ref={pwRef} placeholder="비밀번호를 입력하세요" />
      <button onClick={login}>로그인</button>
    </div>
  );
}
