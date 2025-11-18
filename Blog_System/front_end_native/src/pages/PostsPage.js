import React, { useEffect, useState, useContext } from "react";
import { View, Text, FlatList, Button, TextInput, StyleSheet } from "react-native";
import { getPosts, createPost } from "../api/postApi";
import { getComments, createComment } from "../api/commentApi";
import { AuthContext } from "../context/AuthContext";

function PostItem({ item }) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{item.title}</Text>
            <Text>{item.content}</Text>
        </View>
    );
}

export default function PostsPage({ navigation }) {
    const [posts, setPosts] = useState([]);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        try {
            const res = await getPosts();
            setPosts(res.data || []);
        } catch (err) {
            console.error(err);
        }
    }

    async function addPost() {
        const payload = { userId: user?._id, title, content };
        try {
            const res = await createPost(payload);
            const created = res.data || payload;
            setPosts((p) => [...p, created]);
            setTitle("");
            setContent("");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <Button title="Comments" onPress={() => navigation.navigate("Comments")} />
                <Button title="Users" onPress={() => navigation.navigate("Users")} />
                <Button title="Profile" onPress={() => navigation.navigate("Profile")} />
            </View>

            <View style={styles.form}>
                <TextInput placeholder="Title" value={title} onChangeText={setTitle} style={styles.input} />
                <TextInput placeholder="Content" value={content} onChangeText={setContent} style={styles.input} multiline />
                <Button title="Add Post" onPress={addPost} />
            </View>

            <FlatList data={posts} keyExtractor={(i) => i._id || String(i.title)} renderItem={({ item }) => <PostItem item={item} />} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12 },
    card: { padding: 12, borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 6, marginBottom: 8 },
    title: { fontWeight: "700", color: "#166534" },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 6, marginBottom: 8 },
    form: { marginBottom: 12 },
    row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 12 },
});
