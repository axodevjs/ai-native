import { Ionicons } from "@expo/vector-icons"; // Send icon
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Layout } from "../../widgets/ui/layout";

const ChatScreen: React.FC = () => {
  const [text, setText] = useState<string>("");
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const flatListRef = useRef<FlatList>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0); // Track keyboard height

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      (event) => setKeyboardHeight(event.endCoordinates.height)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => setKeyboardHeight(0)
    );
    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const sendMessage = async () => {
    if (!text) return;

    const userMessage = { role: "user", content: text };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4o-mini",
          messages: [
            ...messages,
            userMessage,
            {
              role: "system",
              content: `Представь, что ты лучший в мире тренер и диетолог, ты способен сопоставлять личные тренировки и давать советы: ${text}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer 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`,
            "Content-Type": "application/json",
          },
        }
      );

      const botMessage = {
        role: "assistant",
        content: response.data.choices[0].message.content,
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
      flatListRef.current?.scrollToEnd({ animated: true });
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
      className={`p-3 my-1 rounded-xl max-w-[80%] ${
        item.role === "user" ? "bg-main self-end" : "bg-gray-300 self-start"
      }`}
    >
      <Text className={item.role === "user" ? "text-white" : "text-black"}>
        {item.content}
      </Text>
    </View>
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Layout isBack>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          className="flex-1"
        >
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => renderMessage(item)}
            className="p-4"
            contentContainerStyle={{ paddingBottom: 20 }}
            onContentSizeChange={() =>
              flatListRef.current?.scrollToEnd({ animated: true })
            }
          />

          {loading && (
            <View className="items-center justify-center py-2">
              <ActivityIndicator size="large" color="#3B82F6" />
              <Text className="text-gray-500 mt-2">Получение ответа...</Text>
            </View>
          )}

          <View
            className={`flex-row items-center p-4 border-t border-gray-200 bg-white mb-20`}
          >
            <TextInput
              value={text}
              onChangeText={setText}
              placeholder="Введите сообщение..."
              className="flex-1 bg-gray-100 p-4 rounded-full text-base mr-2"
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity
              className={`bg-main p-3 rounded-full`}
              onPress={() => {
                sendMessage();
                Keyboard.dismiss();
              }}
              disabled={loading}
            >
              <Ionicons name="send" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Layout>
    </TouchableWithoutFeedback>
  );
};

export default ChatScreen;
