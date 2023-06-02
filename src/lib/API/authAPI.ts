// interface IAuthProps {
//   email: string;
//   password: string;
//   oldPassword?: string;
//   newPassword?: string;
//   displayName?: string;
//   profileImgBase64?: string;
//   accessToken?: string;
//   masterKey?: boolean;
// }

// 로그인
async function login(email: string, password: string) {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamAirPod8",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    },
  );
  const result = await response.json();
  console.log(result);
  localStorage.setItem("Token", result.accessToken);
  localStorage.setItem("username", result.user.displayName);
  return result;
}

// 회원가입
async function register(
  email: string,
  password: string,
  displayName: string,
  profileImgBase64: string,
) {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamAirPod8",
      },
      body: JSON.stringify({
        email,
        password,
        displayName,
        profileImgBase64,
      }),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}

// 인증확인
async function check() {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamAirPod8",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}

// 로그아웃
async function logout() {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamAirPod8",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}

// 사용자 정보 수정
async function userUpdate(
  displayName: string,
  profileImgBase64: string,
  oldPassword: string,
  newPassword: string,
) {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user",
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamAirPod8",
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({
        displayName,
        profileImgBase64,
        oldPassword,
        newPassword,
      }),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}

// 사용자 목록 조회
async function userCheck() {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user",
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamAirPod8",
        masterKey: "true",
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}

export { login, register, check, logout, userUpdate, userCheck };
