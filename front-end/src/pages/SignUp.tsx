import api from "./../api/customAxios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <div>
      <div>회원가입창</div>
      <div className="flex-col">
        <div>
          <span>이메일 입력칸</span>
          <input
            type="text"
            value={email}
            onChange={changeEmail}
            placeholder="example@example.com"
          />
        </div>
        <div>
          <span>비밀번호 입력칸</span>
          <input type="password" value={password} onChange={changePw} />
        </div>
      </div>
      <button onClick={SubmitUserInformation}>가입하기</button>
    </div>
  );
}
