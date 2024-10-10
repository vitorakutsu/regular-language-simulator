import React, { useState } from "react";
import {
  GridContainer,
  StateButtonContainer,
  StateNodeStyled,
  TransitionLabel,
} from "./regular-automaton.styles";
import { Box, Button, Input, Stack, Toast } from "@chakra-ui/react";

// Definir o tipo Transition corretamente
interface AutomatonTransition {
  id: string;
  source: string;
  target: string;
  label: string;
}

export const RegularAutomaton = () => {
  const [states, setStates] = useState<
    {
      id: string;
      label: string;
      position: { x: number; y: number };
      isInitial?: boolean;
      isFinal?: boolean;
    }[]
  >([]);
  const [transitions, setTransitions] = useState<AutomatonTransition[]>([]);
  const [nextStateId, setNextStateId] = useState<number>(1);
  const [fromState, setFromState] = useState<string | null>(null);
  const [symbol, setSymbol] = useState<string>("");
  const [word, setWord] = useState<string>("");
  const [valid, setValid] = useState<boolean | null>(null);
  const [draggingState, setDraggingState] = useState<{
    id: string;
    offset: { x: number; y: number };
  } | null>(null);

  const toggleInitialState = (stateId: string) => {
    setStates((prev) =>
      prev.map((state) =>
        state.id === stateId
          ? { ...state, isInitial: !state.isInitial }
          : { ...state, isInitial: false }
      )
    );
  };

  const toggleFinalState = (stateId: string) => {
    setStates((prev) =>
      prev.map((state) =>
        state.id === stateId ? { ...state, isFinal: !state.isFinal } : state
      )
    );
  };

  const addState = () => {
    const newState = {
      id: `state-${nextStateId}`,
      label: `Estado ${nextStateId}`,
      position: { x: nextStateId * 100, y: nextStateId * 100 },
      isInitial: nextStateId === 1,
    };
    setStates((prev) => [...prev, newState]);
    setNextStateId(nextStateId + 1);
  };

  const startTransition = (stateId: string) => {
    if (fromState) {
      if (fromState !== stateId) {
        setTransitions((prev) => [
          ...prev,
          {
            id: `transition-${fromState}-${stateId}`,
            source: fromState,
            target: stateId,
            label: symbol,
          },
        ]);
      }
      setFromState(null);
      setSymbol("");
    } else {
      setFromState(stateId);
    }
  };

  // Função para remover uma transição
  const removeTransition = (transitionId: string) => {
    setTransitions((prev) =>
      prev.filter((transition) => transition.id !== transitionId)
    );
  };

  const simulateInput = () => {
    let currentState = states.find((state) => state.isInitial);
    if (!currentState) {
      Toast({
        title: "Erro",
        description: "Nenhum estado inicial definido",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    let currentWordIndex = 0;
    let isValid = true;

    // Processar cada símbolo da palavra
    while (currentWordIndex < word.length && isValid) {
      const currentSymbol = word[currentWordIndex];
      const transition = transitions.find(
        (t) =>
          t.source === currentState?.id &&
          t.label.split(",").includes(currentSymbol)
      );

      if (transition) {
        currentState = states.find((state) => state.id === transition.target);
        currentWordIndex++;
      } else {
        isValid = false; // Não há transição para o símbolo atual
      }
    }

    // Verifica se o estado final é um estado de aceitação
    if (currentState && currentState.isFinal && isValid) {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  const handleMouseDown = (id: string, e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const state = states.find((s) => s.id === id);
    if (state) {
      setDraggingState({
        id,
        offset: {
          x: clientX - state.position.x,
          y: clientY - state.position.y,
        },
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggingState) {
      const { clientX, clientY } = e;
      const newPosition = {
        x: clientX - draggingState.offset.x,
        y: clientY - draggingState.offset.y,
      };
      setStates((prev) =>
        prev.map((state) =>
          state.id === draggingState.id
            ? { ...state, position: newPosition }
            : state
        )
      );
    }
  };

  const handleMouseUp = () => {
    setDraggingState(null);
  };

  return (
    <GridContainer
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ backgroundColor: "transparent", position: "relative" }}
    >
      {/* Controles */}
      <Box mb="20px" zIndex={10} position="relative">
        <Stack direction="row" spacing={4}>
          <Button colorScheme="teal" onClick={addState}>
            Adicionar Estado
          </Button>

          {fromState && (
            <>
              <Input
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="Símbolo da transição"
                width="150px" // Ajuste a largura para um tamanho fixo
              />
              <Button colorScheme="red" onClick={() => setFromState(null)}>
                Cancelar
              </Button>
            </>
          )}

          <Input
            value={word}
            onChange={(e) => setWord(e.target.value)}
            placeholder="Digite a palavra"
            width="150px" // Ajuste a largura para um tamanho fixo
          />
          <Button colorScheme="blue" onClick={simulateInput}>
            Simular Palavra
          </Button>
        </Stack>
      </Box>

      {/* Camada de transições */}
      <svg
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
        }}
      >
        {transitions.map((transition, index) => {
          const sourceState = states.find((s) => s.id === transition.source);
          const targetState = states.find((s) => s.id === transition.target);

          const transitionsBetweenStates = transitions.filter(
            (t) =>
              (t.source === transition.source &&
                t.target === transition.target) ||
              (t.source === transition.target && t.target === transition.source)
          );

          const numTransitions = transitionsBetweenStates.length;
          const transitionIndex = transitionsBetweenStates.indexOf(transition);

          const curvature = 60 * (transitionIndex - (numTransitions - 1) / 2);

          if (sourceState && targetState) {
            const sourceX = sourceState.position.x + 50;
            const sourceY = sourceState.position.y + 50;
            const targetX = targetState.position.x + 50;
            const targetY = targetState.position.y + 50;

            const d =
              numTransitions === 1
                ? `M${sourceX},${sourceY} L${targetX},${targetY}`
                : `M${sourceX},${sourceY} C${sourceX},${
                    sourceY + curvature
                  } ${targetX},${targetY + curvature} ${targetX},${targetY}`;

            return (
              <g key={transition.id}>
                <path d={d} stroke="black" fill="transparent" />
                <TransitionLabel
                  x={(sourceX + targetX) / 2}
                  y={(sourceY + targetY) / 2 + curvature / 2}
                >
                  {transition.label}
                </TransitionLabel>

                {/* Gerenciamento de botões "Remover" */}
                <text
                  x={(sourceX + targetX) / 2}
                  y={
                    numTransitions > 1 && transitionIndex % 2 === 0
                      ? (sourceY + targetY) / 2 - 20 + curvature / 2
                      : (sourceY + targetY) / 2 + 20 + curvature / 2
                  }
                  style={{ cursor: "pointer", fill: "red" }}
                  onClick={() => removeTransition(transition.id)}
                >
                  Remover
                </text>
              </g>
            );
          }
          return null;
        })}
      </svg>

      {/* Renderizar os estados */}
      {states.map((state) => (
        <StateButtonContainer
          key={state.id}
          onMouseDown={(e) => handleMouseDown(state.id, e)}
          style={{
            top: state.position.y,
            left: state.position.x,
            position: "absolute",
            zIndex: 5,
          }}
        >
          <StateNodeStyled>{state.label}</StateNodeStyled>
          <button onClick={() => startTransition(state.id)}>
            Adicionar Transição
          </button>
          <button onClick={() => toggleInitialState(state.id)}>
            {state.isInitial ? "Remover Inicial" : "Definir Inicial"}
          </button>
          <button onClick={() => toggleFinalState(state.id)}>
            {state.isFinal ? "Remover Final" : "Definir Final"}
          </button>
        </StateButtonContainer>
      ))}

      {valid !== null && (
        <div style={{ marginTop: "20px", zIndex: 10 }}>
          {valid ? <p>A palavra é aceita.</p> : <p>A palavra não é aceita.</p>}
        </div>
      )}
    </GridContainer>
  );
};
