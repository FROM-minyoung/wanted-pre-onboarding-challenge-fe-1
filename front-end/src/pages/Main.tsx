import { Link } from "react-router-dom";

export default function Main() {
  return (
    <div>
      <div>main</div>
      <Link to="/signup">회원가입</Link>
      <input type="text" placeholder="아이디를 입력하세요" />
      <input type="text" placeholder="비밀번호를 입력하세요" />
      <button>로그인</button>
    </div>
  );
}
