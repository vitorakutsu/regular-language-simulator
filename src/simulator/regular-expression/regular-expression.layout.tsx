import { Input, Button } from '@chakra-ui/react';
import {
  Container,
  Title,
  FormGroup,
  Label,
  ResultContainer,
  ResultTitle,
  ResultList,
  ResultItem,
} from './regular-expression.styles';

interface IData {
  regex: string;
  entry: string;
}

interface IRegularExpressionLayout {
  data: IData;
  results: { entry: string; valid: boolean }[];
  handleData: (key: string, value: string) => void;
  handleVerify: () => void;
}

export const RegularExpressionLayout = ({
  data,
  results,
  handleData,
  handleVerify,
}: IRegularExpressionLayout) => {
  return (
    <Container>
      <Title>Simulador de Expressões Regulares</Title>

      <FormGroup>
        <Label>Expressão Regular:</Label>
        <Input
          type='text'
          value={data.regex}
          onChange={(e) => handleData('regex', e.target.value)}
          placeholder='Ex: (a|b).(a|b).(a|b)'
        />
      </FormGroup>

      <FormGroup>
        <Label>Entradas (separadas por vírgula):</Label>
        <Input
          type='text'
          value={data.entry}
          onChange={(e) => handleData('entry', e.target.value)}
          placeholder='Ex: aaa, aba, bbb'
        />
      </FormGroup>

      <Button onClick={handleVerify}>Verificar Entradas</Button>

      <ResultContainer>
        <ResultTitle>Resultados:</ResultTitle>
        <ResultList>
          {results.map((result, index) => {
            if (result.entry === '') {
              result.entry = 'ε';
            }
            return result.entry.trim() !== '' ? (
              <ResultItem key={index} valid={result.valid}>
                {result.entry}: {result.valid ? 'Válida' : 'Inválida'}
              </ResultItem>
            ) : null;
          })}
        </ResultList>
      </ResultContainer>
    </Container>
  );
};
