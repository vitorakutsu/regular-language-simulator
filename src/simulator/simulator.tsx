import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Screen } from '../components/screen/screen';
import { RegularExpression } from './regular-expression/regular-expression';
import { RegularAutomaton } from './regular-automaton/regular-automaton';

export const Simulator = () => {
  return (
    <Screen>
      <Tabs
        style={{
          width: '100%',
          justifyContent: 'flex-start',
        }}
      >
        <TabList>
          <Tab>Simulador de Expressões</Tab>
          <Tab>Simulador de Automatos</Tab>
          <Tab>Simulador de Gramaticas</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <RegularExpression />
          </TabPanel>
          <TabPanel>
            <RegularAutomaton />
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Screen>
  );
};
