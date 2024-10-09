import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { Screen } from '../components/screen/screen';
import { RegularExpression } from './regular-expression/regular-expression';

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
          <Tab>Two</Tab>
          <Tab>Three</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <RegularExpression />
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Screen>
  );
};
