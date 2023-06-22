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

import client from "./client";

interface IUserUpdate {
  displayName?: string;
  profileImgBase64?: string;
  oldPassword?: string;
  newPassword?: string;
}

// fetch headers
const headers = {
  "content-type": "application/json",
  apikey: "KDT5_nREmPe9B",
  username: "KDT5_TeamAirPod8",
};

// 로그인
interface ILogin {
  email: string;
  password: string;
}
const login = ({ email, password }: ILogin) => {
  client.post(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/login",
    { email, password },
  );
};

// 회원가입
interface IRegister {
  email: string;
  password: string;
  displayName: string;
  profileImgBase64: string;
}
const register = ({
  email,
  displayName,
  password,
  profileImgBase64,
}: IRegister) => {
  client.post(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup",
    { email, password, displayName, profileImgBase64 },
  );
};

// 인증확인
const check = () => {
  client.get(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me",
  );
};

// 로그아웃
const logout = async () => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout",
    {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 사용자 정보 수정
const userUpdate = async (user: IUserUpdate) => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user",
    {
      method: "PUT",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify(user),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 선택 가능한 은행 목록 조회
const accountList = async () => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account/banks",
    {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 계좌 목록 및 잔액 조회
const myAccount = async () => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account",
    {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 계좌 연결
const accountConnect = async (
  bankCode: string,
  accountNumber: string,
  phoneNumber: string,
  signature: boolean,
) => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account",
    {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({
        bankCode,
        accountNumber,
        phoneNumber,
        signature,
      }),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 계좌 해지
const accountDisconnect = async (accountId: string, signature: boolean) => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/account",
    {
      method: "DELETE",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({
        accountId,
        signature,
      }),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 제품 거래(구매) 취소
const orderCancle = async (detailId: string) => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/cancel",
    {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({
        detailId,
      }),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 제품 거래(구매) 확정
const orderConfirm = async (detailId: string) => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/ok",
    {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({
        detailId,
      }),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 제품 전체 거래(구매) 내역
const orderDetailsAll = async () => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/details",
    {
      method: "GET",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

// 단일 제품 상세 거래(구매) 내역
const orderDetail = async (detailId: string) => {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/products/transactions/detail",
    {
      method: "POST",
      headers: {
        ...headers,
        Authorization: `Bearer ${localStorage.getItem("Token")}`,
      },
      body: JSON.stringify({
        detailId,
      }),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
};

export {
  login,
  register,
  check,
  logout,
  userUpdate,
  accountList,
  myAccount,
  accountConnect,
  accountDisconnect,
  orderCancle,
  orderConfirm,
  orderDetailsAll,
  orderDetail,
};
