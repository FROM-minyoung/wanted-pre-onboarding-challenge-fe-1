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
    if (e.currentTarget.value?.length >= 8) {
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
        <div className="flex-col text-center">
          <div className="flex items-center">
            <span className="w-16 text-sm">이메일</span>
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
          {!isEmailCheck ? (
            <span className="text-left text-xs ml-14">
              이메일 형식에 맞게 입력해주세요.
            </span>
          ) : null}

          <div className="flex items-center">
            <span className="w-16 text-sm">비밀번호</span>
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
          {!isPasswordBoolean ? (
            <span className="text-left text-xs ml-16">
              비밀번호는 8자 이상 입력해주세요.
            </span>
          ) : null}
        </div>
        <button
          onClick={SubmitUserInformation}
          className="text-sm mt-3 px-2 py-1.5 rounded-lg transition duration-200 disabled:text-gray-400"
          disabled={!isEmailCheck || !isPasswordBoolean}
        >
          가입하기
        </button>
      </div>
    </div>
  );
}
