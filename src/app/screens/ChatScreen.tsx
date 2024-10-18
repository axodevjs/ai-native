// src/screens/ChatScreen.tsx
import axios from "axios";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Button,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  View,
} from "react-native";
import { Layout } from "../../widgets/ui/layout";

const ChatScreen: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );

  const [loading, setLoading] = useState<boolean>(false);
  const sendMessage = async () => {
    if (!text) return;

    const userMessage = { role: "user", content: text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini", // Ensure model name is correct or adjust
          messages: [
            ...messages, // Include previous messages for better context
            userMessage,
            {
              role: "system",
              content: `Представь, что ты лучший в мире тренер и диетолог и тренер, ты способен сопоставлять личные тренировки, задавай соответствующие вопросы, хотите ли вы похудеть и так далее.: ${text}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer sk-V17oMMxoMjtS_FTiabQLT9Dyd2fld50YSClW-47FzET3BlbkFJ6aKiPeoVuQDBdym6Oi4lJdTt6pqu6BGwj8jjbEyS8A`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error with OpenAI API:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "system", content: "Произошла ошибка. Попробуйте позже." },
      ]);
    } finally {
      setText("");
      setLoading(false);
    }
  };

  const renderMessage = (item: { role: string; content: string }) => (
    <View
      className={`p-3 my-1 rounded-lg ${
        item.role === "user" ? "bg-main self-end" : "bg-gray-300 self-start"
      }`}
    >
      <Text className={item.role === "user" ? "text-white" : "text-black"}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <Layout isBack>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="flex-1"
      >
        <FlatList
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => renderMessage(item)}
          className="p-4"
        />
        {loading && (
          <View className="items-center justify-center py-2">
            <ActivityIndicator size="large" color="#3B82F6" />
            <Text className="text-gray-500 mt-2">Получение ответа...</Text>
          </View>
        )}
        <View className="flex-row items-center p-4 mb-32">
          <TextInput
            value={text}
            onChangeText={setText}
            placeholder="Введите сообщение..."
            className="flex-1 bg-gray-100 p-3 rounded-full mr-2"
          />
          <Button
            title={loading ? "Отправка..." : "Отправить"}
            onPress={sendMessage}
            disabled={loading}
          />
        </View>
      </KeyboardAvoidingView>
    </Layout>
  );
};

export default ChatScreen;
