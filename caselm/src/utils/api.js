export const geminiChatHistoryToString = (chatHistory) => {
  if (!Array.isArray(chatHistory)) {
    throw new Error("chatHistory must be an array");
  }

  return chatHistory
    .map((entry) => {
      const role = entry.role === "user" ? "User" : "Model";
      const message = entry.parts.map((part) => part.text).join("\n");
      return `${role}: ${message}`;
    })
    .join("\n\n");
};

export async function* streamChunks(reader, decoder) {
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    yield decoder.decode(value);
  }
}
