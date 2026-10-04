
const FUNCTION_URL = "https://ddfc7xjdkkccikhw5hkpipowji0fuyek.lambda-url.ap-southeast-2.on.aws/ ";

const countEl = document.getElementById("count");

if (FUNCTION_URL.startsWith("https://")) {
  fetch(FUNCTION_URL)
    .then((response) => response.json())
    .then((data) => { countEl.textContent = data.count; })
    .catch(() => { countEl.textContent = "N/A"; });
} else {
  countEl.textContent = "N/A";
}
