import api from "./../api/customAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mainInputStyle } from "../styles/input.style";

export default function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>("");

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const changePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  const SubmitUserInformation = () => {
    console.log(email, password);
    api
      .post("/users/create", { email, password })
      .then(({ data }) => {
        alert(data.message);
        localStorage.setItem("key", data.token);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.details);
        return;
      });
  };

  return (
    <div className="max-w-screen-lg mt-52 m-auto">
      <div className="flex flex-col items-center">
        <div className="mb-5 text-[50px]">회원가입</div>
        <div className="flex-col text-center">
          <div className="flex items-center">
            <span className="w-16 text-sm">이메일</span>
            <input
              type="text"
              value={email}
              onChange={changeEmail}
              placeholder="example@example.com"
              className={mainInputStyle}
            />
          </div>
          <div className="flex items-center">
            <span className="w-16 text-sm">비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={changePw}
              placeholder="8자 이상 입력해주세요"
              className={mainInputStyle}
            />
          </div>
        </div>
        <button
          onClick={SubmitUserInformation}
          className="text-sm mt-3 px-2 py-1.5 rounded-lg hover:bg-gray-200 transition duration-200"
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
