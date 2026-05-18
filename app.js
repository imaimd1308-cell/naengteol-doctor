const ingredientForm = document.querySelector("#ingredientForm");
const ingredientInput = document.querySelector("#ingredientInput");
const ingredientChips = document.querySelector("#ingredientChips");
const ingredientCount = document.querySelector("#ingredientCount");
const clearButton = document.querySelector("#clearButton");
const recommendButton = document.querySelector("#recommendButton");
const results = document.querySelector("#results");
const stylePicker = document.querySelector("#stylePicker");
const recipeTemplate = document.querySelector("#recipeTemplate");

const MAX_INGREDIENTS = 5;
let ingredients = [];
let selectedStyle = "간단식";

const recipes = [
  {
    name: "김치두부볶음",
    tags: ["김치", "두부", "양파", "대파"],
    styles: ["간단식", "술안주"],
    time: "15분",
    level: "쉬움",
    reason: "김치의 산미와 두부의 담백함이 잘 맞아서 반찬이나 안주로 빠르게 만들 수 있어요.",
    required: ["김치", "두부"],
    optional: ["양파", "대파", "참기름", "고춧가루"],
    steps: [
      "두부는 키친타월로 물기를 닦고 한입 크기로 썰어요.",
      "팬에 기름을 두르고 김치와 양파를 먼저 볶아요.",
      "김치가 부드러워지면 두부를 넣고 부서지지 않게 섞어요.",
      "간이 약하면 간장 반 숟가락을 더하고, 마지막에 참기름을 둘러요."
    ],
    tip: "두부를 먼저 살짝 구워두면 물이 덜 생기고 모양도 깔끔해요."
  },
  {
    name: "양파계란덮밥",
    tags: ["계란", "양파", "밥", "대파"],
    styles: ["간단식", "아이반찬"],
    time: "12분",
    level: "쉬움",
    reason: "계란과 양파만 있어도 밥 위에 얹기 좋은 부드러운 한 그릇을 만들 수 있어요.",
    required: ["계란", "양파", "밥"],
    optional: ["간장", "설탕", "대파", "김가루"],
    steps: [
      "양파를 얇게 썰고 계란은 가볍게 풀어요.",
      "팬에 양파를 볶다가 간장과 물을 조금 넣어 달큰하게 익혀요.",
      "계란물을 붓고 가장자리가 익기 시작하면 살짝만 저어요.",
      "밥 위에 올리고 대파나 김가루를 더해요."
    ],
    tip: "계란을 완전히 익히기보다 촉촉할 때 불을 끄면 덮밥 느낌이 좋아요."
  },
  {
    name: "김치계란전",
    tags: ["김치", "계란", "대파", "양파"],
    styles: ["간단식", "술안주"],
    time: "13분",
    level: "쉬움",
    reason: "잘게 썬 김치와 계란을 섞어 부치면 밀가루가 없어도 간단한 전처럼 먹을 수 있어요.",
    required: ["김치", "계란"],
    optional: ["대파", "양파", "부침가루"],
    steps: [
      "김치와 양파를 잘게 썰어요.",
      "계란을 풀고 김치, 양파, 대파를 섞어요.",
      "팬을 중약불로 달군 뒤 기름을 두르고 얇게 펼쳐요.",
      "가장자리가 익으면 뒤집어 노릇하게 마무리해요."
    ],
    tip: "김치 국물을 많이 넣으면 질척해지니 한 숟가락 정도만 넣는 게 좋아요."
  },
  {
    name: "참치김치볶음밥",
    tags: ["참치", "김치", "밥", "계란", "대파"],
    styles: ["간단식", "술안주"],
    time: "15분",
    level: "쉬움",
    reason: "참치의 기름과 김치가 밥에 잘 배어 별도 반찬 없이도 든든해요.",
    required: ["참치", "김치", "밥"],
    optional: ["계란", "대파", "참기름", "김가루"],
    steps: [
      "김치는 잘게 썰고 참치는 기름을 조금 남겨둬요.",
      "팬에 대파와 김치를 볶다가 참치를 넣어요.",
      "밥을 넣고 고루 볶은 뒤 간을 봐요.",
      "계란 프라이를 올리거나 김가루를 뿌려요."
    ],
    tip: "밥은 차가운 밥을 쓰면 덜 뭉치고 볶음밥 식감이 좋아요."
  },
  {
    name: "감자양파조림",
    tags: ["감자", "양파", "대파"],
    styles: ["건강식", "아이반찬"],
    time: "22분",
    level: "보통",
    reason: "감자와 양파는 단맛이 잘 올라와 자극적이지 않은 반찬으로 만들기 좋아요.",
    required: ["감자", "양파"],
    optional: ["간장", "올리고당", "깨", "대파"],
    steps: [
      "감자는 도톰하게 썰고 양파는 큼직하게 썰어요.",
      "팬에 감자와 물을 넣고 반쯤 익혀요.",
      "간장과 올리고당을 넣고 졸이다가 양파를 더해요.",
      "국물이 자작해지면 대파와 깨를 넣어요."
    ],
    tip: "아이 반찬이면 고춧가루 없이 간장을 적게 잡아 담백하게 만들면 좋아요."
  },
  {
    name: "두부계란찜",
    tags: ["두부", "계란", "대파"],
    styles: ["건강식", "아이반찬"],
    time: "14분",
    level: "쉬움",
    reason: "두부와 계란만으로 단백질이 충분하고 부드러워 아침이나 아이 반찬에 맞아요.",
    required: ["두부", "계란"],
    optional: ["대파", "당근", "소금", "참기름"],
    steps: [
      "두부는 으깨고 계란은 물을 조금 넣어 풀어요.",
      "두부와 계란물을 섞고 소금으로 약하게 간해요.",
      "전자레인지 용기에 담아 2분씩 나눠 익혀요.",
      "중간에 한 번 저어주고 대파를 올려 마무리해요."
    ],
    tip: "물을 너무 많이 넣으면 분리되니 계란 2개 기준 4큰술 정도가 적당해요."
  },
  {
    name: "대파계란국",
    tags: ["계란", "대파", "양파"],
    styles: ["건강식", "아이반찬", "간단식"],
    time: "10분",
    level: "쉬움",
    reason: "계란과 대파만 있어도 속 편한 국을 빠르게 끓일 수 있어요.",
    required: ["계란", "대파"],
    optional: ["양파", "멸치육수", "국간장"],
    steps: [
      "냄비에 물이나 육수를 끓이고 양파를 넣어요.",
      "계란을 풀어 끓는 국물에 천천히 둘러 넣어요.",
      "대파를 넣고 국간장이나 소금으로 간해요.",
      "한소끔만 더 끓이고 바로 불을 꺼요."
    ],
    tip: "계란을 넣은 뒤 세게 젓지 않으면 국물이 탁해지지 않아요."
  },
  {
    name: "참치두부스테이크",
    tags: ["참치", "두부", "계란", "양파"],
    styles: ["건강식", "아이반찬"],
    time: "24분",
    level: "보통",
    reason: "참치와 두부를 뭉쳐 구우면 밥반찬으로 먹기 좋은 단백질 메뉴가 돼요.",
    required: ["참치", "두부"],
    optional: ["계란", "양파", "부침가루", "케첩"],
    steps: [
      "두부는 물기를 꼭 짜고 참치는 기름을 빼요.",
      "양파를 잘게 다져 두부, 참치와 섞어요.",
      "계란을 조금 넣어 반죽을 잡고 납작하게 빚어요.",
      "팬에 앞뒤로 노릇하게 구워요."
    ],
    tip: "반죽이 묽으면 부침가루나 전분을 한 숟가락 넣으면 잘 뭉쳐요."
  }
];

function normalize(value) {
  return value.trim().replace(/\s+/g, "");
}

function addIngredient(value) {
  const item = normalize(value);
  if (!item || ingredients.includes(item) || ingredients.length >= MAX_INGREDIENTS) return;
  ingredients = [...ingredients, item];
  renderIngredients();
}

function addIngredients(value) {
  value
    .split(/[,\s/]+/)
    .map(normalize)
    .filter(Boolean)
    .forEach(addIngredient);
}

function removeIngredient(item) {
  ingredients = ingredients.filter((ingredient) => ingredient !== item);
  renderIngredients();
}

function renderIngredients() {
  ingredientChips.innerHTML = "";
  ingredientCount.textContent = ingredients.length;
  recommendButton.disabled = ingredients.length < 3;

  ingredients.forEach((item) => {
    const chip = document.createElement("span");
    chip.className = "chip";
    chip.textContent = item;

    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `${item} 삭제`);
    button.textContent = "×";
    button.addEventListener("click", () => removeIngredient(item));

    chip.append(button);
    ingredientChips.append(chip);
  });
}

function scoreRecipe(recipe) {
  const matched = recipe.tags.filter((tag) => ingredients.includes(tag)).length;
  const styleBonus = recipe.styles.includes(selectedStyle) ? 1.5 : 0;
  const enoughRequired = recipe.required.every((tag) => ingredients.includes(tag));
  return matched * 2 + styleBonus + (enoughRequired ? 2 : 0);
}

function recommendRecipes() {
  return recipes
    .map((recipe) => ({ ...recipe, score: scoreRecipe(recipe) }))
    .filter((recipe) => recipe.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

function renderRecommendations() {
  if (ingredients.length < 3) {
    results.innerHTML = `<div class="empty-state">재료를 3개 이상 넣으면 냉털박사가 만들기 쉬운 메뉴 3가지를 골라줘요.</div>`;
    return;
  }

  const recommendations = recommendRecipes();
  results.innerHTML = "";

  if (!recommendations.length) {
    results.innerHTML = `<div class="empty-state">지금 재료 조합은 아직 데이터가 적어요. 계란, 김치, 두부, 양파, 밥 중 하나를 더 넣어보세요.</div>`;
    return;
  }

  recommendations.forEach((recipe) => {
    const card = recipeTemplate.content.firstElementChild.cloneNode(true);
    card.querySelector(".badge").textContent = recipe.styles[0];
    card.querySelector(".time").textContent = recipe.time;
    card.querySelector("h3").textContent = recipe.name;
    card.querySelector(".recipe-reason").textContent = recipe.reason;
    card.querySelector(".recipe-button").addEventListener("click", () => renderRecipeDetail(recipe));
    results.append(card);
  });
}

function renderRecipeDetail(recipe) {
  results.innerHTML = `
    <article class="recipe-detail">
      <div class="detail-meta">
        <span>${recipe.time}</span>
        <span>${recipe.level}</span>
        <span>${selectedStyle}</span>
      </div>
      <h3>${recipe.name}</h3>
      <p class="recipe-reason">${recipe.reason}</p>

      <h4>필요한 재료</h4>
      <ul>${recipe.required.map((item) => `<li>${item}</li>`).join("")}</ul>

      <h4>있으면 좋은 재료</h4>
      <ul>${recipe.optional.map((item) => `<li>${item}</li>`).join("")}</ul>

      <h4>만드는 법</h4>
      <ol>${recipe.steps.map((step) => `<li>${step}</li>`).join("")}</ol>

      <p class="notice">${recipe.tip}</p>
      <button class="secondary-button" type="button" id="backToResults">다른 추천 보기</button>
      <button class="reset-button" type="button" id="resetAll">처음부터 다시</button>
    </article>
  `;

  document.querySelector("#backToResults").addEventListener("click", renderRecommendations);
  document.querySelector("#resetAll").addEventListener("click", resetAll);
  results.scrollIntoView({ behavior: "smooth", block: "start" });
}

function resetAll() {
  ingredients = [];
  results.innerHTML = "";
  renderIngredients();
  ingredientInput.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

ingredientForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addIngredients(ingredientInput.value);
  ingredientInput.value = "";
  ingredientInput.focus();
});

document.querySelectorAll("[data-ingredient]").forEach((button) => {
  button.addEventListener("click", () => addIngredient(button.dataset.ingredient));
});

stylePicker.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-style]");
  if (!button) return;

  selectedStyle = button.dataset.style;
  stylePicker.querySelectorAll("button").forEach((item) => {
    const isActive = item === button;
    item.classList.toggle("active", isActive);
    item.setAttribute("aria-checked", String(isActive));
  });
});

clearButton.addEventListener("click", () => {
  resetAll();
});

recommendButton.addEventListener("click", renderRecommendations);

renderIngredients();
