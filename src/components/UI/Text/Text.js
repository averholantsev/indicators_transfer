import { useContext } from "react";
import { LanguageContext } from "../../Languages/Language";

const Text = (props) => {
  const languageContext = useContext(LanguageContext);

  return languageContext.dictionary[props.tid];
};

export default Text;
