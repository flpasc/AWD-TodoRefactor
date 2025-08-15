import { FormControl, FormLabel, Switch, useColorMode } from "@chakra-ui/react";

const DarkMode: React.FC = () => {
  const { toggleColorMode } = useColorMode();

  return (
    <FormControl
      display="flex"
      alignItems="center"
      justifyContent="space-between"
    >
      <FormLabel htmlFor="dark-mode" mb="0">
        Dark Mode
      </FormLabel>
      <Switch colorScheme="teal" id="dark-mode" onChange={toggleColorMode} />
    </FormControl>
  );
}

export default DarkMode;