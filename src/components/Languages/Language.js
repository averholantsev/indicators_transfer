import React, { createContext, useContext, useState } from "react";
import { languageOptions, dictionaryList } from "./Dictionaries";

// create the language context with default selected language
const languageIndex =
  localStorage.getItem("languageIndex") === undefined
    ? 0
    : +localStorage.getItem("languageIndex");

export const LanguageContext = createContext({
  language: languageOptions[languageIndex],
  dictionary: dictionaryList[languageOptions[languageIndex].id],
});

// it provides the language context to app
export function LanguageProvider(props) {
  const languageContext = useContext(LanguageContext);
  const [language, setLanguage] = useState(languageContext.language);
  const [dictionary, setDictionary] = useState(languageContext.dictionary);

  const provider = {
    language,
    dictionary,
    setLanguage: (selectedLanguage) => {
      setLanguage(selectedLanguage); // it will update the language in state
      setDictionary(dictionaryList[selectedLanguage.id]);
    },
  };

  return (
    <LanguageContext.Provider value={provider}>
      {props.children}
    </LanguageContext.Provider>
  );
}
