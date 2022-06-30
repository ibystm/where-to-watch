import { Tab, TabList, Tabs } from "@chakra-ui/react";
import { useChoiceTabs } from "./useChoiceTabs";

const modes = ["映画", "ドラマ・TV番組"] as const;

export const ChoiceTabs: React.FC = () => {
  const { handleChange, modeIndex } = useChoiceTabs();
  return (
    <Tabs
      variant="soft-rounded"
      colorScheme="purple"
      onChange={handleChange}
      index={modeIndex}
    >
      <TabList>
        {modes.map((m, index) => (
          <Tab key={m} _focus={{ boxShadow: "none" }}>
            {m}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
};
