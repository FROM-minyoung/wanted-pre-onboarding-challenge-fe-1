type TokenType = {
  token: string | null;
};

export default function checkToken(token: string | null) {
  if (!token) {
    alert("로그인이 필요한 서비스입니다. \n로그인을 해주세요.");
    window.location.href = "/";
  }
}
