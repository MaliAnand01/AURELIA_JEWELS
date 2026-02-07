import { createContext, useEffect, useState, useContext } from "react";
import { StorageService } from "../services/storage";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = StorageService.getCurrentUser();
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    try {
        const userData = StorageService.loginUser(email, password);
        setUser(userData);
        return { success: true, user: userData };
    } catch (error) {
        return { success: false, message: error.message };
    }
  };

  const signup = (name, email, password, phone) => {
      try {
          const newUser = { name, email, password, phone };
          const createdUser = StorageService.addUser(newUser);
          // Auto login after signup
          StorageService.setCurrentUser(createdUser);
          setUser(createdUser);
          return { success: true };
      } catch (error) {
          return { success: false, message: error.message };
      }
  }

  const logout = () => {
    StorageService.logout();
    setUser(null);
  };

  const updateProfile = (updatedData) => {
      try {
          if (!user) throw new Error("Not authenticated");
          const updatedUser = StorageService.updateUser(user.id, updatedData);
          setUser(updatedUser);
          return { success: true };
      } catch (error) {
          return { success: false, message: error.message };
      }
  };

  const deleteAccount = () => {
    try {
        if (!user) throw new Error("Not authenticated");
        StorageService.deleteUser(user.id);
        setUser(null);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateProfile, deleteAccount, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
