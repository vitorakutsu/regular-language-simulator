import { useState } from 'react';
import { useToast } from '@chakra-ui/react';

interface IData {
  regex: string;
  entry: string;
}

interface IRegularExpressionHook {
  data: IData;
  results: { entry: string; valid: boolean }[];
  handleData: (key: string, value: string) => void;
  handleVerify: () => void;
}

const INITIAL_DATA_STATE = {
  regex: '',
  entry: '',
};

export const useRegularExpressionHook = (): IRegularExpressionHook => {
  const [data, setData] = useState<IData>(INITIAL_DATA_STATE);
  const [results, setResults] = useState<{ entry: string; valid: boolean }[]>(
    []
  );
  const toast = useToast(); // Hook do Chakra para exibir toasts

  const handleData = (key: string, value: string) => {
    setData({ ...data, [key]: value });
  };

  const handleVerify = () => {
    if (!data.regex) {
      toast({
        title: 'Erro',
        description: 'A expressão regular não pode estar vazia.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    if (!data.entry) {
      toast({
        title: 'Erro',
        description: 'As entradas não podem estar vazias.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    const entries = data.entry.split(',').map((entry) => entry.trim());

    try {
      const regex = new RegExp(data.regex);

      const checkResults = entries.map((entry) => ({
        entry,
        valid: regex.test(entry),
      }));

      setResults(checkResults);

      toast({
        title: 'Verificação concluída',
        description: 'As entradas foram verificadas com sucesso.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'A expressão regular é inválida.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return {
    data,
    results,
    handleData,
    handleVerify,
  };
};
