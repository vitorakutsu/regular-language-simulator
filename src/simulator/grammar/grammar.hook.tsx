import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

interface Production {
  nonTerminal: string;
  rules: string[];
}

interface Grammar {
  terminals: string[];
  nonTerminals: string[];
  productions: Production[];
  startSymbol: string;
}

interface IData {
  terminals: string;
  nonTerminals: string;
  productions: string;
  testEntries: string;
}

interface IGrammarHook {
  data: IData;
  results: { entry: string; valid: boolean }[];
  handleData: (key: keyof IData, value: string) => void;
  handleVerifyEntries: () => void;
}

const INITIAL_DATA_STATE: IData = {
  terminals: '',
  nonTerminals: '',
  productions: '',
  testEntries: '',
};

export const useGrammarHook = (): IGrammarHook => {
  const [data, setData] = useState<IData>(INITIAL_DATA_STATE);
  const [results, setResults] = useState<{ entry: string; valid: boolean }[]>(
    []
  );
  const toast = useToast();

  const handleData = (key: keyof IData, value: string) => {
    setData({ ...data, [key]: value });
  };

  const parseProductions = (productionsString: string): Production[] => {
    const productionLines = productionsString.split('\n');
    return productionLines.map((line) => {
      const [nonTerminal, rules] = line.split('->');
      return {
        nonTerminal: nonTerminal.trim(),
        rules: rules.split('|').map((rule) => rule.trim()),
      };
    });
  };

  const testInput = (grammar: Grammar, input: string): boolean => {
    let currentState = grammar.startSymbol;

    for (let i = 0; i < input.length; i++) {
      const char = input[i];
      const production = grammar.productions.find(
        (prod) => prod.nonTerminal === currentState
      );

      if (!production) return false;

      const rule = production.rules.find((r) => r[0] === char);
      if (!rule) return false;

      currentState = rule.length > 1 ? rule[1] : '';
    }

    return currentState === '';
  };

  const handleVerifyEntries = () => {
    const grammar: Grammar = {
      terminals: data.terminals.split(',').map((t) => t.trim()),
      nonTerminals: data.nonTerminals.split(',').map((nt) => nt.trim()),
      productions: parseProductions(data.productions),
      startSymbol: data.nonTerminals.split(',')[0].trim(), // Considera o primeiro não-terminal como o símbolo inicial
    };

    const entries = data.testEntries.split(',').map((entry) => entry.trim());
    const checkResults = entries.map((entry) => ({
      entry,
      valid: testInput(grammar, entry),
    }));

    setResults(checkResults);

    toast({
      title: 'Verificação concluída',
      description: 'As entradas foram verificadas com sucesso.',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
  };

  return {
    data,
    results,
    handleData,
    handleVerifyEntries,
  };
};
