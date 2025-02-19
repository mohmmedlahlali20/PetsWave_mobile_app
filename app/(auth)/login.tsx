import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function login() {
    return (
        <ScrollView className="flex-1 bg-gray-50">
            <View>
                <Stack.Screen
                    options={{
                        title: "Login",
                        headerStyle: { backgroundColor: "#10B981" },
                        headerTintColor: "#fff",
                        headerTitleStyle: { fontWeight: "bold" },
                    }}
                />
                <Text>login</Text>
            </View>
        </ScrollView>

    )
}