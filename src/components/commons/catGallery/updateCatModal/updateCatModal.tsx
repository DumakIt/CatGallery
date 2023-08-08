import { Modal } from "antd";
import {
  deleteDoc,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore/lite";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { useRecoilState } from "recoil";
import { firebaseApp } from "../../../../commons/libraries/firebase";
import { catGalleryUserIdState } from "../../../../commons/stores";
import * as S from "./updateCatModalStyles";

interface IUpdateCatModalProps {
  clickPhoto: any;
  categoryList: any[];
  selectCategory: string;
  setClickPhoto: Dispatch<any>;
  changeIsToggle: () => void;
  setIsUpdated: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateCatModal(
  props: IUpdateCatModalProps
): JSX.Element {
  const [catGalleryUserId] = useRecoilState(catGalleryUserIdState);
  const onChangeTitleInput = (event: ChangeEvent<HTMLInputElement>): void => {
    props.setClickPhoto((prev: any) => ({
      ...prev,
      title: event.currentTarget?.value,
    }));
  };

  const onClickModalUpdate = async (): Promise<void> => {
    try {
      const accessDB = doc(
        getFirestore(firebaseApp),
        catGalleryUserId,
        props.selectCategory === ""
          ? props.categoryList[0].label
          : props.selectCategory,
        props.selectCategory === ""
          ? props.categoryList[0].label
          : props.selectCategory,
        props.clickPhoto.timestamp
      );

      await updateDoc(accessDB, {
        title: props.clickPhoto.title,
      });
      props.changeIsToggle();
      props.setIsUpdated(true);
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

  const onClickModalDelete = async (): Promise<void> => {
    try {
      const accessDB = doc(
        getFirestore(firebaseApp),
        catGalleryUserId,
        props.selectCategory === ""
          ? props.categoryList[0].label
          : props.selectCategory,
        props.selectCategory === ""
          ? props.categoryList[0].label
          : props.selectCategory,
        props.clickPhoto.timestamp
      );
      await deleteDoc(accessDB);
      props.changeIsToggle();
      props.setIsUpdated(true);
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
      <h1>제목 수정</h1>
      <S.TitleInput
        type="text"
        placeholder="수정하실 제목을 입력해 주세요."
        defaultValue={props.clickPhoto.title}
        onChange={onChangeTitleInput}
      />
      <S.BtnWrapper>
        <S.DeleteBtn
          onClick={() => {
            void onClickModalDelete();
          }}
        >
          삭제하기
        </S.DeleteBtn>
        <S.UpdateBtn
          onClick={() => {
            void onClickModalUpdate();
          }}
        >
          수정하기
        </S.UpdateBtn>
      </S.BtnWrapper>
    </S.CustomModal>
  );
}
