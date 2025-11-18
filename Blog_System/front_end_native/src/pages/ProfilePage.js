import React, { useContext, useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { updateUser } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";

export default function ProfilePage() {
    const { user, setUser } = useContext(AuthContext);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(null);

    useEffect(() => {
        if (user) setName(user.name || "");
    }, [user]);

    async function save() {
        if (!user) return;
        setStatus(null);
        try {
            const payload = { name };
            if (password) payload.password = password;
            const res = await updateUser(user._id, payload);
            const updated = res.data || res;
            const newUser = { ...user, ...updated };
            setUser(newUser);
            setPassword("");
            setStatus({ ok: true, msg: "Profile updated." });
        } catch (err) {
            const msg = err?.response?.data?.message || err.message;
            setStatus({ ok: false, msg });
        }
    }

    if (!user) return <View style={styles.container}><Text>Please login first</Text></View>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            {status && <Text style={{ color: status.ok ? '#15803d' : '#b91c1c' }}>{status.msg}</Text>}
            <TextInput value={name} onChangeText={setName} style={styles.input} />
            <TextInput value={user.email} editable={false} style={[styles.input, { backgroundColor: '#f3f4f6' }]} />
            <TextInput value={password} onChangeText={setPassword} placeholder="New password" secureTextEntry style={styles.input} />
            <Button title="Save" onPress={save} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12 },
    title: { fontSize: 20, fontWeight: '700', color: '#166534', marginBottom: 8 },
    input: { borderWidth: 1, borderColor: '#ccc', padding: 8, marginBottom: 8, borderRadius: 6 }
});
