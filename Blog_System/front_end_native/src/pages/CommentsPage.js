import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, Button, StyleSheet } from "react-native";
import { getComments, createComment } from "../api/commentApi";

export default function CommentsPage() {
    const [comments, setComments] = useState([]);
    const [content, setContent] = useState("");

    useEffect(() => {
        fetchComments();
    }, []);

    async function fetchComments() {
        try {
            const res = await getComments();
            setComments(res.data || []);
        } catch (err) {
            console.error(err);
        }
    }

    async function addComment() {
        try {
            const payload = { content };
            const res = await createComment(payload);
            const created = res.data || payload;
            setComments((p) => [...p, created]);
            setContent("");
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Comments</Text>

            <View style={styles.form}>
                <TextInput placeholder="Write a comment" value={content} onChangeText={setContent} style={styles.input} />
                <Button title="Add Comment" onPress={addComment} />
            </View>

            <FlatList data={comments} keyExtractor={(i, idx) => i._id || String(idx)} renderItem={({ item }) => (
                <View style={styles.card}><Text>{item.content}</Text></View>
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 12 },
    title: { fontSize: 20, fontWeight: "700", color: "#166534", marginBottom: 8 },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 8, marginBottom: 8, borderRadius: 6 },
    form: { marginBottom: 12 },
    card: { padding: 10, borderWidth: 1, borderColor: "#e5e7eb", borderRadius: 6, marginBottom: 8 },
});
