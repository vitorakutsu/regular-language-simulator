import { PanelContainer, Button, Input } from '../automaton/automaton.styles';

interface ControlPanelProps {
  addState: () => void;
  fromState: string | null;
  symbol: string;
  setSymbol: (value: string) => void;
  cancelTransition: () => void;
  simulateInput: () => void;
  word: string;
  setWord: (value: string) => void;
}

const ControlPanel = ({
  addState,
  fromState,
  symbol,
  setSymbol,
  cancelTransition,
  simulateInput,
  word,
  setWord,
}: ControlPanelProps) => {
  return (
    <PanelContainer>
      <Button onClick={addState}>Adicionar Estado</Button>

      {fromState && (
        <>
          <Input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Símbolo da transição"
          />
          <Button onClick={cancelTransition}>Cancelar</Button>
        </>
      )}

      <Input
        type="text"
        value={word}
        onChange={(e) => setWord(e.target.value)}
        placeholder="Digite a palavra"
      />
      <Button onClick={simulateInput}>Simular Palavra</Button>
    </PanelContainer>
  );
};

export default ControlPanel;
