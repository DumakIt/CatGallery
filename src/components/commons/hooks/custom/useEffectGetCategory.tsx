import { Modal } from "antd";
import {
  collection,
  getDocs,
  getFirestore,
  orderBy,
  query,
} from "firebase/firestore/lite";
import { Dispatch, SetStateAction, useEffect } from "react";
import { firebaseApp } from "../../../../commons/libraries/firebase";

interface ICategoryList {
  label?: string;
  value?: string;
  timestamp?: string;
}

interface IUseEffectGetCategoryArgs {
  catGalleryUserId: string;
  setCategoryList: Dispatch<SetStateAction<ICategoryList[]>>;
}

export const useEffectGetCategory = (args: IUseEffectGetCategoryArgs): void => {
  useEffect(() => {
    if (args.catGalleryUserId !== "") {
      try {
        const getCategory = async (): Promise<void> => {
          const accessDB = collection(
            getFirestore(firebaseApp),
            args.catGalleryUserId
          );
          const result = await getDocs(
            query(accessDB, orderBy("timestamp", "asc"))
          );
          const data: ICategoryList[] = result.docs.map((el) => el.data());

          if (data.length !== 0) {
            args.setCategoryList(data);
          }
        };
        void getCategory();
      } catch (error) {
        if (error instanceof Error)
          Modal.error({
            content: "잠시후 다시 시도해 주세요",
            okButtonProps: {
              style: { backgroundColor: "#4096ff", color: "white" },
            },
          });
      }
    }
  }, [args.catGalleryUserId]);
};
