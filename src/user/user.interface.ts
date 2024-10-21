interface IGoogleAuthResponse {
  user: { accessToken: string };
}

interface IResponse {
  redirect: (url: string) => void;
}
