import React, { createContext, useEffect, useState } from "react";
import { gql, useLazyQuery } from "@apollo/client";
import { UserFields } from "../graphql/fragments";

export enum UserRole {
  LIBRARIAN = "LIBRARIAN",
  MEMBER = "MEMBER",
}

type User = { id: number; username: string; role: UserRole } | null;

type UserContextType = {
  user: User;
  loading: boolean;
  saveUser: (user: any) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType>({
  user: null,
  loading: false,
  saveUser: () => {},
  logout: () => {},
});

const ME = gql`
  ${UserFields}
  query Me {
    me {
      ...UserFields
    }
  }
`;

export const UserProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(false);

  const [me] = useLazyQuery(ME, {
    onCompleted: (data) => {
      setUser(data.me);
      setLoading(false);
    },
    onError: () => {
      localStorage.removeItem("token");
      setLoading(false);
    },
  });

  useEffect(() => {
    if (!user) {
      setLoading(true);
      const token = localStorage.getItem("token");
      if (token) {
        me();
      } else {
        setLoading(false);
      }
    }
  }, [user, me]);

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };
  const saveUser = (u: User) => setUser(u);

  return (
    <UserContext.Provider value={{ user, loading, saveUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
