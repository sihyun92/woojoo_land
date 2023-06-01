interface IAuthProps {
  email: string;
  password: string;
  displayName?: string;
  profileImgBase64?: string;
  accessToken?: string;
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

export async function logout() {
  const response = await fetch(
    "https://asia-northeast3-heropy-api.cloudfunctions.net/api/auth/signup",
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        apikey: "KDT5_nREmPe9B",
        username: "KDT5_TeamAirPod8",
      },
    },
  );
  const result = await response.json();
  console.log(result);
  return result;
}
