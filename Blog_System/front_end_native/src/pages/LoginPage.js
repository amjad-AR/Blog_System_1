import React, { useState, useContext } from "react";
import { View, TextInput, Button, Text, StyleSheet } from "react-native";
import { loginUser, createUser } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";

export default function LoginPage({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const { setUser } = useContext(AuthContext);

    async function handleSubmit() {
        setError(null);
        try {
            const res = await loginUser({ email, password });
            const user = res.data;
            setUser(user);
            navigation.navigate("Posts");
        } catch (err) {
            const status = err?.response?.status;
            const msg = err?.response?.data?.message || err.message;
            if (status === 404 || /not found|no user/i.test(msg)) {
                try {
                    const nameFromEmail = email.split("@")[0] || email;
                    const newUserPayload = {
                        name: nameFromEmail,
                        email,
                        password,
                        role: "User",
                    };
                    const createRes = await createUser(newUserPayload);
                    const created = createRes.data?.user || createRes.data || newUserPayload;
                    setUser(created);
                    navigation.navigate("Posts");
                    return;
                } catch (createErr) {
                    const createMsg = createErr?.response?.data?.message || createErr.message;
                    setError(createMsg);
                    return;
                }
            }

            setError(msg);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            {error && <Text style={styles.error}>{error}</Text>}
            <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
            <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
            <Button title="Login / Signup" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, justifyContent: "center" },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 12, borderRadius: 6 },
    title: { fontSize: 22, fontWeight: "700", color: "#166534", marginBottom: 12 },
    error: { color: "#b91c1c", marginBottom: 8 },
});
