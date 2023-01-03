import { Link } from "react-router-dom";
import { useRef } from "react";
import api from "./../api/customAxios";
import { mainButtonStyle, mainInputStyle } from "../styles/input.style";
import { useMutation } from "@tanstack/react-query";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const pwRef = useRef<HTMLInputElement>(null);

  const loginMutation = useMutation(
    () =>
      api.post("/users/login", {
        email: emailRef.current?.value,
        password: pwRef.current?.value,
      }),
    {
      onSuccess: ({ data }) => {
        localStorage.setItem("key", data.token);
        alert(data.message);
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
        ref={emailRef}
        placeholder="이메일을 입력하세요"
        className={mainInputStyle}
      />
      <input
        type="password"
        ref={pwRef}
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
