// Kyvex – Lernbegleiter für österreichisches Recht
// Steuert Themenübersicht, Detailansicht und Quiz-Auswertung.

const state = {
  answered: {}, // topicId -> { questionIndex: isCorrect }
};

const topicListEl = document.getElementById("topicList");
const topicViewEl = document.getElementById("topicView");
const backBtn = document.getElementById("backBtn");
const scoreBadgeEl = document.getElementById("scoreBadge");

function totalScore() {
  let correct = 0;
  let total = 0;
  for (const topicId in state.answered) {
    for (const qIndex in state.answered[topicId]) {
      total++;
      if (state.answered[topicId][qIndex]) correct++;
    }
  }
  return { correct, total };
}

function updateScoreBadge() {
  const { correct, total } = totalScore();
  scoreBadgeEl.textContent = `Punkte: ${correct} / ${total}`;
}

function topicProgressLabel(topic) {
  const answered = state.answered[topic.id] || {};
  const answeredCount = Object.keys(answered).length;
  if (answeredCount === 0) return `${topic.quiz.length} Quizfragen`;
  const correct = Object.values(answered).filter(Boolean).length;
  return `${correct}/${answeredCount} von ${topic.quiz.length} richtig`;
}

function renderTopicList() {
  topicListEl.innerHTML = "";
  KYVEX_TOPICS.forEach((topic) => {
    const card = document.createElement("button");
    card.className = "topic-card";
    card.innerHTML = `
      <h3>${topic.title}</h3>
      <p>${topic.subtitle}</p>
      <div class="progress">${topicProgressLabel(topic)}</div>
    `;
    card.addEventListener("click", () => openTopic(topic.id));
    topicListEl.appendChild(card);
  });
}

function openTopic(topicId) {
  const topic = KYVEX_TOPICS.find((t) => t.id === topicId);
  if (!topic) return;

  document.getElementById("topicTitle").textContent = topic.title;
  document.getElementById("topicSubtitle").textContent = topic.subtitle;
  document.getElementById("topicIntro").textContent = topic.intro;

  const conceptsList = document.getElementById("conceptsList");
  conceptsList.innerHTML = "";
  topic.concepts.forEach((c) => {
    const dt = document.createElement("dt");
    dt.textContent = c.term;
    const dd = document.createElement("dd");
    dd.textContent = c.definition;
    conceptsList.appendChild(dt);
    conceptsList.appendChild(dd);
  });

  const schemaList = document.getElementById("schemaList");
  schemaList.innerHTML = "";
  topic.schema.forEach((step) => {
    const li = document.createElement("li");
    li.textContent = step.replace(/^\d+\.\s*/, "");
    schemaList.appendChild(li);
  });

  renderQuiz(topic);

  topicListEl.classList.add("hidden");
  topicViewEl.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderQuiz(topic) {
  const container = document.getElementById("quizContainer");
  container.innerHTML = "";
  if (!state.answered[topic.id]) state.answered[topic.id] = {};

  topic.quiz.forEach((question, qIndex) => {
    const qWrap = document.createElement("div");
    qWrap.className = "quiz-question";

    const qText = document.createElement("p");
    qText.className = "q-text";
    qText.textContent = `${qIndex + 1}. ${question.q}`;
    qWrap.appendChild(qText);

    const optionsWrap = document.createElement("div");
    optionsWrap.className = "quiz-options";

    const alreadyAnswered = topic.id in state.answered && qIndex in state.answered[topic.id];

    question.options.forEach((optionText, oIndex) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = optionText;

      if (alreadyAnswered) {
        btn.disabled = true;
        if (oIndex === question.correct) btn.classList.add("correct");
      }

      btn.addEventListener("click", () => {
        if (state.answered[topic.id][qIndex] !== undefined) return;
        const isCorrect = oIndex === question.correct;
        state.answered[topic.id][qIndex] = isCorrect;

        const allButtons = optionsWrap.querySelectorAll(".quiz-option");
        allButtons.forEach((b, i) => {
          b.disabled = true;
          if (i === question.correct) b.classList.add("correct");
          else if (i === oIndex && !isCorrect) b.classList.add("wrong");
        });

        const explain = document.createElement("p");
        explain.className = "quiz-explain";
        explain.textContent = question.explain;
        qWrap.appendChild(explain);

        updateScoreBadge();
        renderTopicList();
      });

      optionsWrap.appendChild(btn);
    });

    qWrap.appendChild(optionsWrap);

    if (alreadyAnswered) {
      const explain = document.createElement("p");
      explain.className = "quiz-explain";
      explain.textContent = question.explain;
      qWrap.appendChild(explain);
    }

    container.appendChild(qWrap);
  });
}

backBtn.addEventListener("click", () => {
  topicViewEl.classList.add("hidden");
  topicListEl.classList.remove("hidden");
  renderTopicList();
});

renderTopicList();
updateScoreBadge();
