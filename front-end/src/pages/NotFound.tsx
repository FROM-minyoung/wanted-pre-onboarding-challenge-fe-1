import { Link } from "react-router-dom";
import { screenStyle } from "./../styles/style";

export default function NotFound() {
  return (
    <div className={screenStyle}>
      <span className="text-8xl">?</span>
      <div className="my-10">페이지 주소를 다시 확인해주세요.</div>
      <Link to="/" className="text-sm hover:underline">
        메인페이지로 가기
      </Link>
    </div>
  );
}
