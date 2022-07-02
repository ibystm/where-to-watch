import { Button } from "@chakra-ui/react";
import { useActions } from "../../../hooks/useActions";
import { actions } from "../../../store";

export const ResetButton: React.FC = () => {
  const { resetSearchMode } = useActions(actions);
  return (
    <Button onClick={resetSearchMode} borderRadius="10px">
      キーワードをリセット
    </Button>
  );
};
