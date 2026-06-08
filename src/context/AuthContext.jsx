import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { readStorage, storageKeys, writeStorage } from '../services/localStorage';
import { api } from '../services/api';

const AuthContext = createContext(null);
const legacyStudentEmail = 'student@library.com';

function normalizeUser(user) {
  if (!user) {
    return user;
  }

  if (user.email?.toLowerCase() === legacyStudentEmail) {
    return {
      ...user,
      name: 'John',
    };
  }

  return user;
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(() => readStorage(storageKeys.users, []).map(normalizeUser));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.localStorage.removeItem(storageKeys.currentUser);
  }, []);

  useEffect(() => {
    writeStorage(storageKeys.users, users);
  }, [users]);

  useEffect(() => {
    const normalizedUsers = users.map(normalizeUser);
    const hasUserChanges = normalizedUsers.some((user, index) => user !== users[index]);

    if (hasUserChanges) {
      setUsers(normalizedUsers);
    }

    const normalizedCurrentUser = normalizeUser(currentUser);
    if (normalizedCurrentUser !== currentUser) {
      setCurrentUser(normalizedCurrentUser);
    }
  }, [currentUser, users]);

  const refreshUsers = useCallback(async () => {
    const data = await api.getUsers();
    setUsers(data.map(normalizeUser));
    return data;
  }, []);

  useEffect(() => {
    setLoading(true);
    refreshUsers()
      .catch((error) => {
        console.error('Failed to load users', error);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async ({ email, password, role }) => {
    try {
      const user = normalizeUser(await api.login({ email, password, role }));
      setCurrentUser(user);
      await refreshUsers();
      return { success: true, user };
    } catch (error) {
      return { success: false, message: error.message || 'Invalid credentials. Try the demo accounts shown on the page.' };
    }
  };

  const register = async (payload) => {
    const newUser = normalizeUser(await api.register(payload));
    setUsers((prev) => [newUser, ...prev]);
    setCurrentUser(newUser);
    return { success: true, user: newUser };
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(storageKeys.currentUser);
    }

    setCurrentUser(null);
  };

  const value = useMemo(
    () => ({
      currentUser,
      users,
      loading,
      refreshUsers,
      login,
      register,
      logout,
      isAuthenticated: Boolean(currentUser),
    }),
    [currentUser, users, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
