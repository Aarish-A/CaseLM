export const clearLocalStorage = () => {
  localStorage.clear();
};

export const getChatHistory = (caseId) => {
  const localStorageKey = `caseChatHistory_${caseId}`;
  const storedHistory = localStorage.getItem(localStorageKey);
  return storedHistory ? JSON.parse(storedHistory) : [];
};

export const saveChatHistory = (caseId, chatHistory) => {
  const localStorageKey = `caseChatHistory_${caseId}`;
  localStorage.setItem(localStorageKey, JSON.stringify(chatHistory));
};
