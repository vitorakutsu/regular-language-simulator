import { useToast } from '@chakra-ui/react';
import { useState } from 'react';

interface IResult {
  entry: string;
  valid: boolean;
}

export const useGrammarHook = () => {
  const [data, setData] = useState({
    terminals: '',
    nonTerminals: '',
    productions: '',
    testEntries: ''
  });
  const [results, setResults] = useState<IResult[]>([]);
  const toast = useToast();

  const handleData = (key: string, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value
    }));
  };

  const verifyFields = (): boolean => {
    if (!data.terminals || !data.nonTerminals || !data.productions || !data.testEntries) {
      renderMessage('Preencha todos os campos!', 'error');
      return false;
    }
    return true;
  }

  const renderMessage = (message: string, status: 'success' | 'error') => {
    toast({
      title: "Atenção!",
      description: message,
      status,
      duration: 5000,
      isClosable: true
    });
  }

  const handleVerifyEntries = () => {
    if(!verifyFields()) return;
    const terminals = data.terminals.split(',').map((t) => t.trim());
    const nonTerminals = data.nonTerminals.split(',').map((nt) => nt.trim());
    const productions = parseProductions(data.productions, terminals, nonTerminals);
    const testEntries = data.testEntries.split(',');

    const newResults = testEntries.map((entry) => {
      const isValid = verifyEntry(entry.trim(), nonTerminals[0], productions, terminals);
      return {
        entry: entry.trim(),
        valid: isValid
      };
    });

    setResults(newResults);
  };

  const parseProductions = (
    productionsStr: string,
    terminals: string[],
    nonTerminals: string[]
  ) => {
    const productions: { [key: string]: string[] } = {};
    const rules = productionsStr.split('\n').map((rule) => rule.trim());

    rules.forEach((rule) => {
      const [nonTerminal, production] = rule.split('->').map((part) => part.trim());

      if (!nonTerminals.includes(nonTerminal)) {
        renderMessage(`Defina o símbolo ${nonTerminal} como não-terminal!`, 'error');
      }

      const transitions = production.split('|').map((trans) => trans.trim());
      productions[nonTerminal] = transitions;
    });

    return productions;
  };

  const verifyEntry = (
    entry: string,
    startSymbol: string,
    productions: { [key: string]: string[] },
    terminals: string[]
  ) => {
    const recursiveCheck = (
      remaining: string,
      currentSymbol: string,
      depth: number
    ): boolean => {
      if (depth > 100) return false;

      if (remaining.length === 0) {
        return productions[currentSymbol]?.includes('ε') || false;
      }

      if (!productions[currentSymbol]) {
        return false;
      }

      return productions[currentSymbol].some((production) => {
        if (production === 'ε') {
          return recursiveCheck(remaining, currentSymbol, depth + 1);
        }

        let remainingInput = remaining;
        let valid = true;

        for (let i = 0; i < production.length; i++) {
          const symbol = production[i];

          if (terminals.includes(symbol)) {
            if (remainingInput.startsWith(symbol)) {
              remainingInput = remainingInput.slice(1);
            } else {
              valid = false;
              break;
            }
          } else if (productions[symbol]) {
            valid = recursiveCheck(remainingInput, symbol, depth + 1);
            if (!valid) break;
            return valid;
          } else {
            valid = false;
            break;
          }
        }

        return valid && remainingInput.length === 0;
      });
    };

    return recursiveCheck(entry, startSymbol, 0);
  };

  return {
    data,
    handleData,
    handleVerifyEntries,
    results,
  };
};
