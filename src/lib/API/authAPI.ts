interface IAuthProps {
  email: string;
  password: string;
  oldPassword?: string;
  newPassword?: string;
  displayName?: string;
  profileImgBase64?: string;
  accessToken?: string;
  masterKey?: boolean;
}

export async function login({ email, password }: IAuthProps) {
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
        email: email,
        password: password,
      }),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}

export async function register({
  email,
  password,
  displayName,
  profileImgBase64,
}: IAuthProps) {
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
        email: email,
        password: password,
        displayName: displayName,
        profileImgBase64: profileImgBase64,
      }),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}

export async function check({ accessToken }: IAuthProps) {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/me",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamAirPod8",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}

export async function logout({ accessToken }: IAuthProps) {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/logout",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamAirPod8",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}

export async function userUpdate({
  displayName,
  profileImgBase64,
  oldPassword,
  newPassword,
  accessToken,
}: IAuthProps) {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user",
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamAirPod8",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        displayName: displayName,
        profileImgBase64: profileImgBase64,
        oldPassword: oldPassword,
        newPassword: newPassword,
      }),
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}

export async function userCheck({ masterKey }: IAuthProps) {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/user",
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamAirPod8",
        masterKey: `${masterKey}`,
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}
