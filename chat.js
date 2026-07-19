// Kyvex – KI-Professor: Live-Chat mit Claude zum österreichischen Recht.
// Der API-Key wird ausschließlich im Browser (localStorage) gespeichert und
// direkt an die Anthropic API gesendet – es gibt keinen eigenen Server.

const CLAUDE_MODEL = "claude-opus-4-8";
const API_KEY_STORAGE_KEY = "kyvexAnthropicApiKey";

const SYSTEM_PROMPT = `Du bist Prof. Kyvex, ein erfahrener Universitätsprofessor für österreichisches Recht.
Deine Gesprächspartnerin ist eine Jura-Studentin, die bereits weit fortgeschritten im Studium ist. Erkläre daher KEINE Grundbegriffe von Grund auf und hole nicht bei den Basics aus, sondern setze das Grundverständnis voraus und gehe direkt in die Tiefe: relevante Streitstände in Lehre und Rechtsprechung, Judikatur von OGH/VfGH/VwGH mit Fundstellen, Abgrenzungsfragen, Prüfungsschemata auf Fortgeschrittenen-Niveau, examensrelevante Feinheiten.
Du beantwortest ausschließlich Fragen zum Recht der Republik Österreich (Verfassungsrecht, Zivilrecht/ABGB, Strafrecht/StGB, Verwaltungsrecht, Arbeitsrecht, Unternehmensrecht etc.).
Nenne einschlägige Paragraphen (z.B. § 1295 ABGB) und wichtige Entscheidungen, verwende bei Prüfungsfragen den klassischen Gutachtenstil.
Wenn eine Frage nichts mit österreichischem Recht zu tun hat, weise freundlich darauf hin, dass du auf österreichisches Recht spezialisiert bist.
Weise bei komplexen oder folgenreichen Fragen darauf hin, dass dies keine verbindliche Rechtsberatung ersetzt und im Zweifel eine Anwältin/ein Anwalt konsultiert werden sollte.
Antworte auf Deutsch.`;

const tabTopicsBtn = document.getElementById("tabTopics");
const tabChatBtn = document.getElementById("tabChat");
const chatViewEl = document.getElementById("chatView");

const apiKeyInput = document.getElementById("apiKeyInput");
const saveKeyBtn = document.getElementById("saveKeyBtn");
const clearKeyBtn = document.getElementById("clearKeyBtn");
const keyStatusEl = document.getElementById("keyStatus");

const chatMessagesEl = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const chatInput = document.getElementById("chatInput");
const chatSendBtn = document.getElementById("chatSendBtn");

let chatHistory = []; // [{role: "user"|"assistant", content: "..."}]

function showChatTab() {
  document.getElementById("topicList").classList.add("hidden");
  document.getElementById("topicView").classList.add("hidden");
  chatViewEl.classList.remove("hidden");
  tabChatBtn.classList.add("active");
  tabTopicsBtn.classList.remove("active");
}

function showTopicsTab() {
  chatViewEl.classList.add("hidden");
  document.getElementById("topicList").classList.remove("hidden");
  tabTopicsBtn.classList.add("active");
  tabChatBtn.classList.remove("active");
}

tabChatBtn.addEventListener("click", showChatTab);
tabTopicsBtn.addEventListener("click", showTopicsTab);

function getStoredApiKey() {
  return localStorage.getItem(API_KEY_STORAGE_KEY) || "";
}

function updateKeyStatus() {
  const key = getStoredApiKey();
  if (key) {
    keyStatusEl.textContent = "API-Key gespeichert (lokal in diesem Browser).";
    keyStatusEl.classList.remove("error");
    apiKeyInput.value = "";
    apiKeyInput.placeholder = "Key gespeichert – zum Ändern neu eingeben";
  } else {
    keyStatusEl.textContent = "Kein API-Key hinterlegt.";
    keyStatusEl.classList.remove("error");
    apiKeyInput.placeholder = "sk-ant-...";
  }
}

saveKeyBtn.addEventListener("click", () => {
  const value = apiKeyInput.value.trim();
  if (!value) {
    keyStatusEl.textContent = "Bitte einen API-Key eingeben.";
    keyStatusEl.classList.add("error");
    return;
  }
  localStorage.setItem(API_KEY_STORAGE_KEY, value);
  updateKeyStatus();
});

clearKeyBtn.addEventListener("click", () => {
  localStorage.removeItem(API_KEY_STORAGE_KEY);
  updateKeyStatus();
});

function appendMessage(role, text) {
  const wrap = document.createElement("div");
  wrap.className = `chat-msg ${role}`;
  wrap.textContent = text;
  chatMessagesEl.appendChild(wrap);
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  return wrap;
}

function appendSystemNote(text) {
  const wrap = document.createElement("div");
  wrap.className = "chat-msg system-note";
  wrap.textContent = text;
  chatMessagesEl.appendChild(wrap);
  chatMessagesEl.scrollTop = chatMessagesEl.scrollHeight;
  return wrap;
}

async function sendToClaude(userText) {
  const apiKey = getStoredApiKey();
  if (!apiKey) {
    appendSystemNote("Bitte zuerst einen API-Key oben speichern, um mit Prof. Kyvex zu chatten.");
    return;
  }

  chatHistory.push({ role: "user", content: userText });
  chatSendBtn.disabled = true;
  const thinkingMsg = appendSystemNote("Prof. Kyvex überlegt …");

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "anthropic-dangerous-direct-browser-access": "true",
      },
      body: JSON.stringify({
        model: CLAUDE_MODEL,
        max_tokens: 2048,
        system: SYSTEM_PROMPT,
        messages: chatHistory,
      }),
    });

    thinkingMsg.remove();

    if (!response.ok) {
      const errBody = await response.json().catch(() => null);
      const message = errBody?.error?.message || `HTTP ${response.status}`;
      appendSystemNote(`Fehler: ${message}`);
      chatHistory.pop();
      return;
    }

    const data = await response.json();
    const textBlock = (data.content || []).find((b) => b.type === "text");
    const answer = textBlock ? textBlock.text : "(Keine Textantwort erhalten.)";
    chatHistory.push({ role: "assistant", content: answer });
    appendMessage("assistant", answer);
  } catch (err) {
    thinkingMsg.remove();
    appendSystemNote(`Verbindungsfehler: ${err.message}`);
    chatHistory.pop();
  } finally {
    chatSendBtn.disabled = false;
  }
}

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = chatInput.value.trim();
  if (!text) return;
  appendMessage("user", text);
  chatInput.value = "";
  sendToClaude(text);
});

chatInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    chatForm.requestSubmit();
  }
});

updateKeyStatus();
appendSystemNote("Willkommen! Trag oben deinen Anthropic API-Key ein und stell Prof. Kyvex jede Frage zum österreichischen Recht.");
