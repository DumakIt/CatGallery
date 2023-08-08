import { Dispatch, SetStateAction, useState } from "react";

export const useSetIsToggle = (): [
  boolean,
  () => void,
  Dispatch<SetStateAction<boolean>>
] => {
  const [isToggle, setIsToggle] = useState(false);

  const changeIsToggle = (): void => {
    setIsToggle((prev) => !prev);
  };

  return [isToggle, changeIsToggle, setIsToggle];
};
