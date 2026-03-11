import { GameProvider } from "@/context/GameContext";
import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
  return (
    <GameProvider>
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            title: "Game",
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="shop"
          options={{
            title: "Shop",
            headerShown: false,
          }}
        />
      </Stack>
    </GameProvider>
  );
}

