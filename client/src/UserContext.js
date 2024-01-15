import { createContext, useState } from "react";

export const UserLoginContext = createContext(null);

function UserProvider({ children }) {
  const [userLogin, setUserLogin] = useState("");

  return (
    <UserLoginContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </UserLoginContext.Provider>
  );
}

export default UserProvider;
