import languageCodes from "./tribalLanguages.json"; // Make sure path is correct

export async function translateText(
  text: string,
  from: string,
  to: string
): Promise<string> {
  const sourceLangObj = languageCodes.find((lang) => lang.name === from);
  const targetLangObj = languageCodes.find((lang) => lang.name === to);

  if (!sourceLangObj || !targetLangObj) {
    console.warn(`Language code not found for: ${from} or ${to}`);
    return text;
  }

  try {
    const res = await fetch("https://libretranslate.com/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        q: text,
        source: sourceLangObj.code,
        target: targetLangObj.code,
      }),
    });

    const data = await res.json();
    return data.translatedText || text;
  } catch (error) {
    console.error("Translation failed:", error);
    return text;
  }
}
