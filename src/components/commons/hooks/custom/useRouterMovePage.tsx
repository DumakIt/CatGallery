import { useRouter } from "next/router";

interface IuseRouterMovePage {
  onClickMovePage: (path: string) => () => void;
  routerMovePage: (path: string) => void;
}

export const useRouterMovePage = (): IuseRouterMovePage => {
  const router = useRouter();

  const onClickMovePage = (path: string) => (): void => {
    void router.push(path);
  };

  const routerMovePage = (path: string): void => {
    void router.push(path);
  };
  return { onClickMovePage, routerMovePage };
};
