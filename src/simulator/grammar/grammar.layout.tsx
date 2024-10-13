import { Input, Button, Textarea } from '@chakra-ui/react';
import {
  Container,
  Title,
  FormGroup,
  Label,
  ResultContainer,
  ResultTitle,
  ResultList,
  ResultItem,
} from './grammar.styles';

interface IData {
  terminals: string;
  nonTerminals: string;
  productions: string;
  testEntries: string;
}

interface IGrammarLayout {
  data: IData;
  handleData: (key: keyof IData, value: string) => void;
  results: { entry: string; valid: boolean }[];
  handleVerifyEntries: () => void;
}

export const GrammarLayout = ({
  handleVerifyEntries,
  data,
  handleData,
  results,
}: IGrammarLayout) => {
  return (
    <Container>
      <Title>Simulador de Gramáticas Regulares</Title>

      <FormGroup>
        <Label>Terminais:</Label>
        <Input
          value={data.terminals}
          onChange={(e) => handleData('terminals', e.target.value)}
          placeholder='Ex: a,b'
        />
      </FormGroup>

      <FormGroup>
        <Label>Não-Terminais:</Label>
        <Input
          value={data.nonTerminals}
          onChange={(e) => handleData('nonTerminals', e.target.value)}
          placeholder='Ex: S,A'
        />
      </FormGroup>

      <FormGroup>
        <Label>Produções:</Label>
        <Textarea
          value={data.productions}
          onChange={(e) => handleData('productions', e.target.value)}
          placeholder='Ex: S->aA|bS'
        />
      </FormGroup>

      <FormGroup>
        <Label>Entradas de Teste:</Label>
        <Input
          value={data.testEntries}
          onChange={(e) => handleData('testEntries', e.target.value)}
          placeholder='Ex: aa,ab'
        />
      </FormGroup>

      <Button onClick={handleVerifyEntries}>Verificar Entradas</Button>

      <ResultContainer>
        <ResultTitle>Resultados:</ResultTitle>
        <ResultList>
          {results.map((result, index) => (
            <ResultItem key={index} valid={result.valid}>
              {result.entry}: {result.valid ? 'Válida' : 'Inválida'}
            </ResultItem>
          ))}
        </ResultList>
      </ResultContainer>
    </Container>
  );
};
