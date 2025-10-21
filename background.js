chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "adept-parent",
    title: "Adept AI Helper",
    contexts: ["selection"] 
  });

  chrome.contextMenus.create({
    id: "simplify",
    parentId: "adept-parent",
    title: "Simplify Text",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "summarize",
    parentId: "adept-parent",
    title: "Summarize Text",
    contexts: ["selection"]
  });

  chrome.contextMenus.create({
    id: "translate",
    parentId: "adept-parent",
    title: "Translate Text",
    contexts: ["selection"]
  });
});

const createSummarizerSession = async (
  type = 'tldr',
  format = 'plain-text',
  length = 'medium') => {
  if (!('Summarizer' in self)) {
    console.error("Chrome Built-in AI APIs are not available.");
    return null;
  }
  try {
    return self.Summarizer.create({ type, format, length });
  } catch {
    console.error("Error creating Summarizer session.");
    return null;
  }
}

chrome.contextMenus.onClicked.addListener(handleMenuClick);

async function handleMenuClick(info, tab) {
  

  const selectedText = info.selectionText;
  let resultText = "";
  let title = "Adept AI Result"; 

  try {
    switch (info.menuItemId) {
      case "simplify":
        title = "Simplified Text";
        try {
          if (!('Rewriter' in self)) {
            console.error("Chrome Built-in Rewriter AI API is not available.");
            resultText = "Error: The simplify feature is not available in your browser.";
            break;
          }
          const rewriter = await self.Rewriter.create({
            tone: 'simpler' 
          });
          if (!rewriter) {
            resultText = "Error: Unable to create the text simplifier.";
            break;
          }
          resultText = await rewriter.rewrite(selectedText);
          rewriter.destroy();
        } catch (error) {
          console.error("Error simplifying text:", error);
          resultText = "Error: Unable to simplify text.";
        }
        break;

      case "summarize":
        title = "Summary";
        try {
          const availability = await self.Summarizer.availability();
          console.log(`Summarizer availability: ${availability}`);
          if(availability === 'unavailable') {
            console.error(`Summarization is unavailable.`);
            resultText = `Error: Summarization is unavailable.`;
            break;
          }
          const summarizer = await createSummarizerSession();
          if (!summarizer) {
            resultText = "Error: Unable to create summarizer session.";
            break;
          }
          resultText = await summarizer.summarize(selectedText);
          summarizer.destroy();
        } catch (error) {
          console.error("Error summarizing text:", error);
          resultText = "Error: Unable to summarize text.";
        }
        break;

      case "translate":
        title = "Translation";
        if (!('LanguageDetector' in self)) {
          console.error("Chrome Built-in AI APIs are not available.");
          resultText = "Error: Chrome Built-in AI APIs are not available.";
          return;
        }

        try {
          const detector = await LanguageDetector.create();
          
          const { detectedLanguage, confidence } = (
            await detector.detect(selectedText)
          )[0];

          console.log(`Detected language: ${detectedLanguage} (confidence: ${confidence})`);
          const storageResult = await chrome.storage.sync.get(['targetLanguage']);

          if(!storageResult.targetLanguage) {
            console.error("No target language set.");
            resultText = "Error: No target language set.";
            return;
          }
          const targetLanguage = storageResult.targetLanguage || 'en';
          const sourceLanguage = detectedLanguage;

          const availability = await Translator.availability({ sourceLanguage, targetLanguage });
          console.log(`Translator availability: ${availability}`);
          if(availability === 'unavailable') {
            console.error(`Translation from ${sourceLanguage} to ${targetLanguage} is unavailable.`);
            resultText = `Error: Translation from ${sourceLanguage} to ${targetLanguage} is unavailable.`;
            break;
          }

          const translator = await Translator.create({ sourceLanguage, targetLanguage });
          resultText = await translator.translate(selectedText);
          break;
        } catch {
          console.error("Error detecting language.");
          resultText = "Error: Error detecting language.";
        }
    }

    chrome.tabs.sendMessage(tab.id, {
      type: "SHOW_RESULT",
      payload: {
        title: title,
        text: resultText
      }
    });

  } catch (error) {
    console.error("AI API Error:", error);
    chrome.tabs.sendMessage(tab.id, {
      type: "SHOW_ERROR",
      payload: `AI Error: ${error.message}`
    });
  }
}
