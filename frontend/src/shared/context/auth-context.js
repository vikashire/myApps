import { createContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  employeeId: null,
  token: null,
  login: () => {},
  logout: () => {}
});
