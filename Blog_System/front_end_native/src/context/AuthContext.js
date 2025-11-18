import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext({ user: null, setUser: () => { } });

export function AuthProvider({ children }) {
    const [user, setUserState] = useState(null);

    useEffect(() => {
        AsyncStorage.getItem("user").then((raw) => {
            if (raw) {
                try {
                    setUserState(JSON.parse(raw));
                } catch (e) { }
            }
        });
    }, []);

    const setUser = async (u) => {
        setUserState(u);
        if (u) {
            await AsyncStorage.setItem("user", JSON.stringify(u));
        } else {
            await AsyncStorage.removeItem("user");
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>
    );
}
