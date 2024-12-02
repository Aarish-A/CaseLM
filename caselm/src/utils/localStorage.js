export const clearLocalStorage = () => {
  localStorage.clear();
};

export const getName = () => {
  const name = localStorage.getItem("name");
  return name ? name : undefined;
};

export const saveName = (name) => {
  localStorage.setItem("name", name);
};

export const getChatHistory = (caseId) => {
  const storedHistory = localStorage.getItem(`caseChatHistory_${caseId}`);
  return storedHistory ? JSON.parse(storedHistory) : [];
};

export const saveChatHistory = (caseId, chatHistory) => {
  localStorage.setItem(
    `caseChatHistory_${caseId}`,
    JSON.stringify(chatHistory)
  );
};

export const clearChatHistory = (caseId) => {
  localStorage.removeItem(`caseChatHistory_${caseId}`);
};

export const getCaseFeedback = (caseId) => {
  const storedHistory = localStorage.getItem(`caseFeedback_${caseId}`);
  return storedHistory ? storedHistory : "";
};

export const saveCaseFeedback = (caseId, feedback) => {
  localStorage.setItem(`caseFeedback_${caseId}`, feedback);
};

export const clearCaseFeedback = (caseId) => {
  localStorage.removeItem(`caseFeedback_${caseId}`);
};

export const caseFeedbackExists = (caseId) => {
  const feedback = getCaseFeedback(caseId);
  if (feedback && feedback != "null") return true;
  return false;
};

export const saveFeedbackSummary = (feedbackSummary) => {
  localStorage.setItem(`feedbackSummary`, feedbackSummary);
};

export const getFeedbackSummary = () => {
  const feedbackSummary = localStorage.getItem(`feedbackSummary`);
  return feedbackSummary ? feedbackSummary : "";
};

export const feedbackSummaryExists = () => {
  const feedbackSummary = getFeedbackSummary();
  if (feedbackSummary && feedback != "null") return true;
  return false;
};

export const getAllCaseFeedbacks = () => {
  const feedbacks = {};

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key.startsWith("caseFeedback_")) {
      const caseId = key.replace("caseFeedback_", "");
      feedbacks[caseId] = localStorage.getItem(key);
    }
  }

  return feedbacks;
};
