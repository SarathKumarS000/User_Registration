export interface User {
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword?: string;
}

export interface FormData {
  email: string;
  password: string;
  newUsername: string;
}

export interface RouteProps {
  navigation: any;
  route: any;
}
