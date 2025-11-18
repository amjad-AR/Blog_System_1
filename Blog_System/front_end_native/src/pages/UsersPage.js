import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, TextInput, StyleSheet } from "react-native";
import { getUsers, createUser } from "../api/userApi";

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    async function fetchUsers() {
        try {
            const res = await getUsers();
            setUsers(res.data || []);
        } catch (err) {
            console.error(err);
        }
    }

    async function addUser() {
        try {
            const payload = { name, email, password: "123456", role: "User" };
            const res = await createUser(payload);
            const created = res.data?.user || res.data || payload;
            setUsers((p) => [...p, created]);
            setName("");
            setEmail("");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Users</Text>
            <View style={styles.form}>
                <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
                <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
                <Button title="Add User" onPress={addUser} />
            </View>

            <FlatList data={users} keyExtractor={(i) => i._id || i.email} renderItem={({ item }) => (
                <View style={styles.card}><Text style={{ fontWeight: '700' }}>{item.name}</Text><Text>{item.email}</Text></View>
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12 },
    title: { fontSize: 20, fontWeight: "700", color: "#166534", marginBottom: 8 },
    form: { marginBottom: 12 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 8, borderRadius: 6 },
    card: { padding: 10, borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 6, marginBottom: 8 },
});
