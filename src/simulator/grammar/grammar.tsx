import { useGrammar } from './grammar.hook';
import { GrammarLayout } from './grammar.layout';

export const Grammar = () => {
  const properties = useGrammar();

  return <GrammarLayout {...properties} />;
};
