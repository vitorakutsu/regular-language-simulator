import React, { useState } from "react";
import {
  GridContainer,
  Row,
  StateButtonContainer,
  StateNodeStyled,
} from "./regular-automaton.styles";
import { TransitionLine } from "../../components/automaton/transition-line";
import { Box, Button, Input, Stack, Toast } from "@chakra-ui/react";
import { AddIcon, StarIcon, CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { DeleteIcon } from "@chakra-ui/icons";
import { StateInterface } from "../../interface/state-interface";

interface AutomatonTransition {
  id: string;
  source: string;
  target: string;
  label: string;
}

interface State {
  id: string;
  isInitial?: boolean;
  isFinal?: boolean;
}

interface Transition {
  source: string;
  target: string;
  label: string;
}

export const RegularAutomaton = () => {
  const [states, setStates] = useState<StateInterface[]>([]);
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
      position: { x: 100 + (nextStateId - 1) * 100, y: 100 + (nextStateId - 1) * 100 },
      isInitial: nextStateId === 1,
    };
    setStates((prev) => [...prev, newState]);
    setNextStateId(nextStateId + 1);
  };

  const startTransition = (stateId: string) => {
    if (fromState) {
      if (fromState !== stateId) {
        if (!symbol.trim()) {
          alert("Símbolo da transição não pode ser vazio.");
          return;
        }
  
        const symbols = symbol.split(",").map((s) => s.trim());
  
        setTransitions((prev) => [
          ...prev,
          ...symbols.map((symbol) => ({
            id: `transition-${fromState}-${stateId}-${symbol}`,
            source: fromState,
            target: stateId,
            label: symbol,
          })),
        ]);
      } else {
        if (!symbol.trim()) {
          alert("Símbolo da transição não pode ser vazio.");
          return;
        }
        const symbols = symbol.split(",").map((s) => s.trim());
        setTransitions((prev) => [
          ...prev,
          ...symbols.map((symbol) => ({
            id: `transition-${fromState}-${stateId}-${symbol}`,
            source: fromState,
            target: stateId,
            label: symbol,
          })),
        ]);
      }
      setFromState(null);
      setSymbol("");
    } else {
      setFromState(stateId);
    }
  };  

  const removeTransition = (transitionId: string) => {
    setTransitions((prev) =>
      prev.filter((transition) => transition.id !== transitionId)
    );
  };

  const simulateInput = () => {
    let currentStates: State[] = states.filter(
      (state: State) => state.isInitial
    );
    if (currentStates.length === 0) {
      Toast({
        title: "Erro",
        description: "Nenhum estado inicial definido",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    let isValid = false;
    let currentWordIndex = 0;

    const processEpsilonTransitions = (activeStates: State[]): State[] => {
      let epsilonStates: State[] = [...activeStates];
      let queue: State[] = [...activeStates];

      while (queue.length > 0) {
        const currentState = queue.shift();
        const epsilonTransitions = transitions.filter(
          (t: Transition) => t.source === currentState?.id && t.label === "ε"
        );

        epsilonTransitions.forEach((transition) => {
          const nextState = states.find(
            (state: State) => state.id === transition.target
          );
          if (nextState && !epsilonStates.includes(nextState)) {
            epsilonStates.push(nextState);
            queue.push(nextState);
          }
        });
      }

      return epsilonStates;
    };

    while (currentWordIndex < word.length && currentStates.length > 0) {
      const currentSymbol = word[currentWordIndex];
      let nextStates: State[] = [];

      currentStates.forEach((state: State) => {
        const possibleTransitions = transitions.filter(
          (t: Transition) =>
            t.source === state.id && t.label.split(",").includes(currentSymbol)
        );

        possibleTransitions.forEach((transition) => {
          const nextState = states.find(
            (s: State) => s.id === transition.target
          );
          if (nextState) {
            nextStates.push(nextState);
          }
        });
      });

      nextStates = processEpsilonTransitions(nextStates);

      currentStates = nextStates;
      currentWordIndex++;
    }

    currentStates = processEpsilonTransitions(currentStates);

    isValid = currentStates.some((state: State) => state.isFinal);

    setValid(isValid);
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

  const removeState = (stateId: string) => {
    setStates((prev) => prev.filter((state) => state.id !== stateId));

    setTransitions((prev) =>
      prev.filter(
        (transition) =>
          transition.source !== stateId && transition.target !== stateId
      )
    );
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
                width="150px"
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
            width="150px"
          />
          <Button colorScheme="blue" onClick={simulateInput}>
            Simular Palavra
          </Button>
        </Stack>
      </Box>
      
      <TransitionLine states={states} transitions={transitions} removeTransition={removeTransition}/>

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
          <Row>
            <button onClick={() => startTransition(state.id)}>
              <AddIcon />
            </button>
            <button onClick={() => toggleInitialState(state.id)}>
              {state.isInitial ? <CloseIcon /> : <StarIcon />}
            </button>
            <button onClick={() => toggleFinalState(state.id)}>
              {state.isFinal ? <CloseIcon /> : <CheckIcon />}
            </button>
            <button onClick={() => removeState(state.id)}>
              {" "}
              <DeleteIcon />
            </button>
          </Row>
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
