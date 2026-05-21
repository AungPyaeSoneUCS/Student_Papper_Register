// file: nrc.js

const townshipsData = {
  "1": [
    ["မြစ်ကြီးနားမြို့နယ်", "မကန(နိုင်)"], ["ဝိုင်းမော်မြို့နယ်", "ဝမန(နိုင်)"], ["ချီဖွေမြို့နယ်", "ခဖန(နိုင်)"],
    ["ဆော့လော်မြို့နယ်", "ဆလန(နိုင်)"], ["တနိုင်းမြို့နယ်", "တနန(နိုင်)"], ["ဗန်းမော်မြို့နယ်", "ဗမန(နိုင်)"],
    ["ရွှေကူမြို့နယ်", "ရကန(နိုင်)"], ["မိုးညှင်းမြို့နယ်", "မညန(နိုင်)"], ["မိုးကောင်းမြို့နယ်", "မကတ(နိုင်)"],
    ["ဖားကန့်မြို့နယ်", "ဖကန(နိုင်)"], ["ပူတာအိုမြို့နယ်", "ပတအ(နိုင်)"], ["မံစီမြို့နယ်", "မစန(နိုင်)"]
  ],
  "14": [
    ["ပုသိမ်မြို့နယ်", "ပသန(နိုင်)"], ["ကန်ကြီးထောင့်မြို့နယ်", "ကကထ(နိုင်)"], ["ကျုံပျော်မြို့နယ်", "ကပန(နိုင်)"],
    ["ငပုတောမြို့နယ်", "ငပတ(နိုင်)"], ["သာပေါင်းမြို့နယ်", "သပန(နိုင်)"], ["မအူပင်မြို့နယ်", "မအပ(နိုင်)"],
    ["ဓနုဖြူမြို့နယ်", "ဓနဖ(နိုင်)"], ["ပန်းတနော်မြို့နယ်", "ပတန(နိုင်)"], ["ဟင်္သာတမြို့နယ်", "ဟသတ(နိုင်)"],
    ["ဇလွန်မြို့နယ်", "ဇလန(နိုင်)"], ["ကြံခင်းမြို့နယ်", "ကခန(နိုင်)"], ["မြန်အောင်မြို့နယ်", "မအန(နိုင်)"],
    ["အင်္ဂပူမြို့နယ်", "အဂပ(နိုင်)"], ["လေးမျက်နှာမြို့နယ်", "လမန(နိုင်)"], ["မြောင်းမြမြို့နယ်", "မမန(နိုင်)"],
    ["ဝါးခယ်မမြို့နယ်", "ဝခမ(နိုင်)"], ["အိမ်မဲမြို့နယ်", "အမန(နိုင်)"], ["ဖျာပုံမြို့နယ်", "ဖပန(နိုင်)"],
    ["ဘိုကလေးမြို့နယ်", "ဘကလ(နိုင်)"], ["ဒေးဒရဲမြို့နယ်", "ဒဒရ(နိုင်)"], ["ကျိုက်လတ်မြို့နယ်", "ကလန(နိုင်)"],
    ["လပွတ္တာမြို့နယ်", "လပတ(နိုင်)"], ["မော်လမြိုင်ကျွန်းမြို့နယ်", "မမက(နိုင်)"]
  ]
};

/* အပေါ်က townshipsData ထဲမှာ သင့် 1 to 14 data အပြည့်ကို ဆက်ထားပါ */

const MY_DIGITS = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];

const EN_DIGITS = {
  "၀": "0",
  "၁": "1",
  "၂": "2",
  "၃": "3",
  "၄": "4",
  "၅": "5",
  "၆": "6",
  "၇": "7",
  "၈": "8",
  "၉": "9",
};

function toMyanmarNumber(value) {
  return String(value).replace(/[0-9]/g, digit => MY_DIGITS[Number(digit)]);
}

function toEnglishNumber(value) {
  return String(value).replace(/[၀-၉]/g, digit => EN_DIGITS[digit]);
}

function createNrcBox(box, label) {
  box.innerHTML = `
    <div class="nrc-line">
      <select class="nrc-state" aria-label="${label} NRC State"></select>
      <select class="nrc-township" aria-label="${label} NRC Township"></select>
    </div>

    <div class="nrc-number-boxes">
      <input maxlength="1" inputmode="numeric" />
      <input maxlength="1" inputmode="numeric" />
      <input maxlength="1" inputmode="numeric" />
      <input maxlength="1" inputmode="numeric" />
      <input maxlength="1" inputmode="numeric" />
      <input maxlength="1" inputmode="numeric" />
    </div>

    <div class="nrc-error">NRC နံပါတ်သည် ဂဏန်း ၆ လုံးဖြစ်ရမည်။</div>
  `;

  const state = box.querySelector(".nrc-state");
  const township = box.querySelector(".nrc-township");
  const numberInputs = box.querySelectorAll(".nrc-number-boxes input");
  const error = box.querySelector(".nrc-error");

  Object.keys(townshipsData).forEach(key => {
    const option = document.createElement("option");
    option.value = key;
    option.textContent = `${toMyanmarNumber(key)}/`;
    state.appendChild(option);
  });

  function loadTownships() {
    township.innerHTML = "";

    townshipsData[state.value].forEach(([name, code]) => {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = code; // show only ပသန(နိုင်)
      township.appendChild(option);
    });

    update();
  }

  function getNumber() {
    return [...numberInputs]
      .map(input => toEnglishNumber(input.value).replace(/[^0-9]/g, ""))
      .join("");
  }

  function update() {
    const cleanNumber = getNumber();

    numberInputs.forEach(input => {
      input.value = toMyanmarNumber(toEnglishNumber(input.value).replace(/[^0-9]/g, ""));
    });

    const fullNrc = `${toMyanmarNumber(state.value)}/${township.value}${toMyanmarNumber(cleanNumber)}`;

    const valid = cleanNumber.length === 0 || cleanNumber.length === 6;
    error.classList.toggle("show", !valid);

    box.dataset.fullNrc = cleanNumber.length === 6 ? fullNrc : "";
  }

  numberInputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      input.value = toMyanmarNumber(toEnglishNumber(input.value).replace(/[^0-9]/g, "").slice(0, 1));

      if (input.value && numberInputs[index + 1]) {
        numberInputs[index + 1].focus();
      }

      update();
    });

    input.addEventListener("keydown", event => {
      if (event.key === "Backspace" && !input.value && numberInputs[index - 1]) {
        numberInputs[index - 1].focus();
      }
    });
  });

  state.addEventListener("change", loadTownships);
  township.addEventListener("change", update);

  loadTownships();
}

function initNrcBoxes() {
  document.querySelectorAll(".nrc-box").forEach((box, index) => {
    const labels = ["Student", "Father", "Mother"];
    createNrcBox(box, labels[index] || "NRC");
  });
}

function resetNrcBoxes() {
  document.querySelectorAll(".nrc-box").forEach(box => {
    box.querySelector(".nrc-state").value = "1";
    box.querySelectorAll(".nrc-number-boxes input").forEach(input => {
      input.value = "";
    });
    box.querySelector(".nrc-state").dispatchEvent(new Event("change"));
  });
}