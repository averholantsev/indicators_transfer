import { useContext } from "react";
import { LanguageContext } from "../../Languages/Language";

export function TextReturn(tid) {
  const languageContext = useContext(LanguageContext);

  return languageContext.dictionary[tid];
};

const Text = (props) => {
  const languageContext = useContext(LanguageContext);

  return languageContext.dictionary[props.tid];
};

export default Text;
