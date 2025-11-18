import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginPage from "../pages/LoginPage";
import PostsPage from "../pages/PostsPage";
import CommentsPage from "../pages/CommentsPage";
import UsersPage from "../pages/UsersPage";
import ProfilePage from "../pages/ProfilePage";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Posts">
                <Stack.Screen name="Login" component={LoginPage} />
                <Stack.Screen name="Posts" component={PostsPage} />
                <Stack.Screen name="Comments" component={CommentsPage} />
                <Stack.Screen name="Users" component={UsersPage} />
                <Stack.Screen name="Profile" component={ProfilePage} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
