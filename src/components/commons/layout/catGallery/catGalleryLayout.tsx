import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRecoilState } from "recoil";
import { catGalleryUserIdState } from "../../../../commons/stores";
import { useRouterMovePage } from "../../hooks/custom/useRouterMovePage";
import * as S from "./catGalleryLayoutStyles";
import { doc, getFirestore, setDoc } from "firebase/firestore/lite";
import { firebaseApp } from "../../../../commons/libraries/firebase";
import { useRouter } from "next/router";

export default function CatGalleryLayout(): JSX.Element {
  const router = useRouter();
  const { onClickMovePage } = useRouterMovePage();
  const [, setCatGalleryUserId] = useRecoilState(catGalleryUserIdState);

  useEffect(() => {
    const catGalleryUserId = localStorage.getItem("catGalleryUserId");
    if (catGalleryUserId === null) {
      const newCatGalleryUserId = uuidv4();
      localStorage.setItem("catGalleryUserId", newCatGalleryUserId);
      setCatGalleryUserId(newCatGalleryUserId);
      const onClickAddCategory = async (): Promise<void> => {
        const newCategory = {
          value: "저장한 이미지",
          label: "저장한 이미지",
          timestamp: Date(),
        };

        const accessDB = doc(
          getFirestore(firebaseApp),
          newCatGalleryUserId,
          "저장한 이미지"
        );
        await setDoc(accessDB, newCategory);
      };
      void onClickAddCategory();
    } else {
      setCatGalleryUserId(catGalleryUserId);
    }
  }, []);

  return (
    <S.Container>
      <div>
        <S.LogoWrapper onClick={onClickMovePage("/")}>
          <img src="/images/logo.svg" />
        </S.LogoWrapper>
        {router.asPath === "/" && (
          <S.SavedImgBtn href={"/saveGallery"}>저장한 이미지</S.SavedImgBtn>
        )}
      </div>
    </S.Container>
  );
}
