export class RegisterWithCredentialsDTO {
  name: string;
  surname: string;
  email: string;
  id: string;
  country: string;
  theme: string;
}

export class UserPrincipalDTO {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  email: string;
  phone: string;
}
