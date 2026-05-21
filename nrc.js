const townshipsData = {
  "1": [["မြစ်ကြီးနား", "မကန"], ["ဝိုင်းမော်", "ဝမန"], ["ဗန်းမော်", "ဗမန"], ["မိုးညှင်း", "မညန"], ["ဖားကန့်", "ဖကန"]],
  "2": [["လွိုင်ကော်", "လကန"], ["ဒီးမော့ဆို", "ဒမဆ"], ["ဖရူဆို", "ဖရဆ"], ["ဘော်လခဲ", "ဘလခ"]],
  "3": [["ဘားအံ", "ဘအန"], ["လှိုင်းဘွဲ့", "လဘန"], ["ကော့ကရိတ်", "ကကရ"], ["မြဝတီ", "မဝတ"]],
  "4": [["ဟားခါး", "ဟခန"], ["ထန်တလန်", "ထတလ"], ["မင်းတပ်", "မတန"], ["ဖလမ်း", "ဖလန"]],
  "5": [["မုံရွာ", "မရန"], ["စစ်ကိုင်း", "စကန"], ["ကလေး", "ကလထ"], ["ကသာ", "ကသန"], ["ရွှေဘို", "ရဘန"]],
  "6": [["ထားဝယ်", "ထဝန"], ["လောင်းလုံး", "လလန"], ["မြိတ်", "မမန"], ["ကော့သောင်း", "ကသန"]],
  "7": [["ပဲခူး", "ပခန"], ["ဒိုက်ဦး", "ဒဥန"], ["ညောင်လေးပင်", "ညလပ"], ["ပြည်", "ပမန"], ["တောင်ငူ", "တငန"]],
  "8": [["မကွေး", "မကန"], ["ရေနံချောင်း", "ရနခ"], ["ချောက်", "ခမန"], ["မင်းဘူး", "မဘန"], ["ပခုက္ကူ", "ပခက"]],
  "9": [["အောင်မြေသာဇံ", "အမဇ"], ["ချမ်းမြသာစည်", "ခမစ"], ["မိတ္ထီလာ", "မထလ"], ["ပြင်ဦးလွင်", "ပဥလ"], ["ပျဉ်းမနား", "ပမန"]],
  "10": [["မော်လမြိုင်", "မလမ"], ["ရေး", "ရမန"], ["ကျိုက်မရော", "ကမရ"], ["သထုံ", "သထန"]],
  "11": [["စစ်တွေ", "စတန"], ["ကျောက်ဖြူ", "ကဖန"], ["ရမ်းဗြဲ", "ရဗန"], ["မာန်အောင်", "မအန"], ["မောင်တော", "မတန"]],
  "12": [["တာမွေ", "တမန"], ["တောင်ဥက္ကလာပ", "ဥကတ"], ["မြောက်ဥက္ကလာပ", "ဥကမ"], ["ကမာရွတ်", "ကမရ"], ["လှိုင်", "လမန"], ["အလုံ", "အလန"]],
  "13": [["တောင်ကြီး", "တကန"], ["ကလော", "ကလန"], ["တာချီလိတ်", "တခလ"], ["မူဆယ်", "မဆတ"], ["လားရှိုး", "လရန"]],
  "14": [["ပုသိမ်", "ပသန"], ["မအူပင်", "မအပ"], ["ဓနုဖြူ", "ဓနဖ"], ["ဟင်္သာတ", "ဟသတ"], ["ဖျာပုံ", "ဖပန"]]
};

const MY_DIGITS = ["၀", "၁", "၂", "၃", "၄", "၅", "၆", "၇", "၈", "၉"];
const EN_DIGITS = { "၀": "0", "၁": "1", "၂": "2", "၃": "3", "၄": "4", "၅": "5", "၆": "6", "၇": "7", "၈": "8", "၉": "9" };

function toMyanmarNumber(value) {
  return String(value).replace(/[0-9]/g, digit => MY_DIGITS[Number(digit)]);
}

function toEnglishNumber(value) {
  return String(value).replace(/[၀-၉]/g, digit => EN_DIGITS[digit]);
}

function createNrcBox(box, label) {
  box.innerHTML = `
    <select class="nrc-state" aria-label="${label} NRC State"></select>
    <select class="nrc-type" aria-label="${label} NRC Type">
      <option value="နိုင်">နိုင်</option>
      <option value="ဧည့်">ဧည့်</option>
      <option value="ပြု">ပြု</option>
    </select>
    <select class="nrc-township" aria-label="${label} NRC Township"></select>
    <input class="nrc-number" type="text" maxlength="6" placeholder="၁၂၃၄၅၆" inputmode="numeric" />
    <div class="nrc-preview"></div>
    <div class="nrc-error">NRC နံပါတ်သည် ဂဏန်း ၆ လုံးဖြစ်ရမည်။</div>
  `;

  const state = box.querySelector(".nrc-state");
  const type = box.querySelector(".nrc-type");
  const township = box.querySelector(".nrc-township");
  const number = box.querySelector(".nrc-number");
  const preview = box.querySelector(".nrc-preview");
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
      option.textContent = `${name} - ${code}`;
      township.appendChild(option);
    });
    update();
  }

  function update() {
    let cleanNumber = toEnglishNumber(number.value).replace(/[^0-9]/g, "").slice(0, 6);
    number.value = toMyanmarNumber(cleanNumber);

    const fullNrc = `${toMyanmarNumber(state.value)}/${township.value}(${type.value})${toMyanmarNumber(cleanNumber)}`;
    preview.textContent = fullNrc;

    const valid = cleanNumber.length === 0 || cleanNumber.length === 6;
    error.classList.toggle("show", !valid);
    box.dataset.fullNrc = cleanNumber.length === 6 ? fullNrc : "";

    if (typeof updateAllNrcResult === "function") updateAllNrcResult();
  }

  state.addEventListener("change", loadTownships);
  township.addEventListener("change", update);
  type.addEventListener("change", update);
  number.addEventListener("input", update);

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
    box.querySelector(".nrc-number").value = "";
    box.querySelector(".nrc-state").value = "1";
    box.querySelector(".nrc-state").dispatchEvent(new Event("change"));
  });
}
