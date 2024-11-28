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

export const clearChatHistory = (caseId) => {
  localStorage.removeItem(`caseChatHistory_${caseId}`);
};

export const getCaseFeedback = (caseId) => {
  const localStorageKey = `caseFeedback_${caseId}`;
  const storedHistory = localStorage.getItem(localStorageKey);
  return storedHistory ? storedHistory : "";
};

export const saveCaseFeedback = (caseId, feedback) => {
  const localStorageKey = `caseFeedback_${caseId}`;
  localStorage.setItem(localStorageKey, feedback);
};

export const clearCaseFeedback = (caseId) => {
  localStorage.removeItem(`caseFeedback_${caseId}`);
};

export const caseFeedbackExists = (caseId) => {
  const feedback = getCaseFeedback(caseId);
  if (feedback && feedback != "null") return true;
  return false;
};
