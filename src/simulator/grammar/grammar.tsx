import { useGrammarHook } from './grammar.hook';
import { GrammarLayout } from './grammar.layout';

export const Grammar = () => {
  const properties = useGrammarHook();

  return <GrammarLayout {...properties} />;
};
