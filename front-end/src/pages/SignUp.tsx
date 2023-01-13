import api from "./../api/customAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  mainInputStyle,
  correctInputStyle,
  incorrectInputStyle,
} from "../styles/style";

export default function SignUp() {
  const emailReg = /^[a-zA-Z0-9+-_.]+@[a-z]+\.+[a-z]+$/g;

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [isEmailCheck, setIsEmailCheck] = useState(false);
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isPasswordBoolean, setIsPasswordBoolean] = useState(false);

  const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
    if (emailReg.test(e.currentTarget.value)) {
      setIsEmailCheck(true);
    } else {
      setIsEmailCheck(false);
    }
  };

  const changePw = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
    if (e.currentTarget.value.length < 8) {
      setIsPasswordBoolean(false);
    }
  };

  const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
    if (
      e.currentTarget.value.length >= 8 &&
      password === e.currentTarget.value
    ) {
      setIsPasswordBoolean(true);
    } else {
      setIsPasswordBoolean(false);
    }
  };

  const SubmitUserInformation = () => {
    api
      .post("/users/create", { email, password })
      .then(({ data }) => {
        alert(data.message);
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
        <div className="flex-col text-left">
          <div className="flex items-center">
            <span className="w-24 text-sm">이메일</span>
            <input
              type="text"
              value={email}
              onChange={changeEmail}
              placeholder="example@example.com"
              className={
                email === ""
                  ? mainInputStyle
                  : isEmailCheck
                  ? correctInputStyle
                  : incorrectInputStyle
              }
            />
          </div>

          <div className="flex items-center">
            <span className="w-24 text-sm">비밀번호</span>
            <input
              type="password"
              value={password}
              onChange={changePw}
              placeholder="8자 이상 입력해주세요"
              className={
                password === ""
                  ? mainInputStyle
                  : isPasswordBoolean
                  ? correctInputStyle
                  : incorrectInputStyle
              }
            />
          </div>
          <div className="flex items-center">
            <span className="w-24 text-sm">비밀번호 확인</span>
            <input
              type="password"
              value={confirmPassword}
              onChange={checkPassword}
              placeholder="비밀번호를 한번 더 입력해주세요."
              className={
                password === ""
                  ? mainInputStyle
                  : isPasswordBoolean
                  ? correctInputStyle
                  : incorrectInputStyle
              }
            />
          </div>
        </div>
        <button
          onClick={SubmitUserInformation}
          className="text-sm mt-3 px-2 py-1.5 rounded-lg transition duration-200 hover:underline disabled:text-gray-400 disabled:cursor-not-allowed disabled:hover:no-underline"
          disabled={!isEmailCheck || !isPasswordBoolean}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
