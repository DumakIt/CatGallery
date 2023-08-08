import { Modal } from "antd";
import { doc, getFirestore, setDoc } from "firebase/firestore/lite";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { firebaseApp } from "../../../../commons/libraries/firebase";
import { catGalleryUserIdState } from "../../../../commons/stores";
import { useEffectGetCategory } from "../../hooks/custom/useEffectGetCategory";
import * as S from "./saveCatModalStyles";

interface ICategoryList {
  label?: string;
  value?: string;
  timestamp?: string;
}

interface ISaveCatModalProps {
  changeIsToggle: () => void;
  selectCat: {
    src?: string | undefined;
    width?: number | undefined;
    height?: number | undefined;
  };
}

export default function SaveCatModal(props: ISaveCatModalProps): JSX.Element {
  const [title, setTitle] = useState<string>("");
  const [selectCategory, setSelectCategory] = useState<string>("저장한 이미지");
  const [addCategory, setAddCategory] = useState<string>("");
  const [catGalleryUserId] = useRecoilState(catGalleryUserIdState);
  const [categoryList, setCategoryList] = useState<ICategoryList[]>([]);

  // 저장되어 있는 카테고리 리스트 불러오기
  useEffectGetCategory({ catGalleryUserId, setCategoryList });

  // 파이어스토어에 저장하기
  const onClickModalSave = async (): Promise<void> => {
    try {
      const accessDB = doc(
        getFirestore(firebaseApp),
        catGalleryUserId,
        selectCategory,
        selectCategory,
        Date()
      );

      await setDoc(accessDB, {
        ...props.selectCat,
        timestamp: Date(),
        title,
      });
      props.changeIsToggle();
    } catch (error) {
      if (error instanceof Error)
        Modal.error({
          content: "잠시후 다시 시도해 주세요",
          okButtonProps: {
            style: { backgroundColor: "#4096ff", color: "white" },
          },
        });
    }
  };

  // 파이어 스토어에 카테고리 추가
  const onClickAddCategory = async (): Promise<void> => {
    try {
      const newCategory = {
        value: addCategory,
        label: addCategory,
        timestamp: Date(),
      };

      const accessDB = doc(
        getFirestore(firebaseApp),
        catGalleryUserId,
        addCategory
      );
      await setDoc(accessDB, newCategory);
      setAddCategory("");
      setCategoryList((prev) => [...prev, newCategory]);
    } catch (error) {
      if (error instanceof Error)
        Modal.error({
          content: "잠시후 다시 시도해 주세요",
          okButtonProps: {
            style: { backgroundColor: "#4096ff", color: "white" },
          },
        });
    }
  };

  return (
    <S.CustomModal open={true} footer={false} onCancel={props.changeIsToggle}>
      <S.SaveCatContainer>
        <S.SaveCatImg src={props.selectCat.src} />
        <S.ImgInfoContainer>
          <h1>애옹이 저장</h1>
          <S.TitleWrapper>
            <S.InputTitle
              type="text"
              placeholder="제목을 입력해 주세요."
              onChange={(event) => {
                setTitle(event.currentTarget.value);
              }}
            />
            <div>필수는 아니에요</div>
          </S.TitleWrapper>

          <S.CustomSelect
            size={"large"}
            defaultValue={"저장한 이미지"}
            onChange={(value) => {
              if (typeof value === "string") {
                setSelectCategory(value);
              }
            }}
            allowClear={true}
            placement={"topRight"}
            options={categoryList}
            dropdownRender={(menu) => (
              <>
                {menu}
                <S.SelectAddCategoryWrapper>
                  <S.AddCategoryInput
                    type="text"
                    placeholder="추가하려는 카테고리를 입력해 주세요."
                    value={addCategory}
                    onChange={(event) => {
                      setAddCategory(event.currentTarget.value);
                    }}
                  />
                  <S.AddCategoryBtn
                    onClick={() => {
                      void onClickAddCategory();
                    }}
                  >
                    추가하기
                  </S.AddCategoryBtn>
                </S.SelectAddCategoryWrapper>
              </>
            )}
          />
          <S.BtnWrapper>
            <S.BtnCancel onClick={props.changeIsToggle}>취소하기</S.BtnCancel>
            <S.BtnSave
              onClick={() => {
                void onClickModalSave();
              }}
            >
              저장하기
            </S.BtnSave>
          </S.BtnWrapper>
        </S.ImgInfoContainer>
      </S.SaveCatContainer>
    </S.CustomModal>
  );
}
