import { Tabs } from "antd";
import { useState } from "react";
import { Photo, PhotoAlbum } from "react-photo-album";
import { useRecoilState } from "recoil";
import { catGalleryUserIdState } from "../../../../commons/stores";
import UpdateCatModal from "../../../commons/catGallery/updateCatModal/updateCatModal";
import { useEffectGetCategory } from "../../../commons/hooks/custom/useEffectGetCategory";
import { useEffectGetCategoryImg } from "../../../commons/hooks/custom/useEffectGetCategoryImg";
import { useSetIsToggle } from "../../../commons/hooks/custom/useSetIsToggle";
import * as S from "./saveGalleryStyles";

export default function SaveGallery(): JSX.Element {
  const [catGalleryUserId] = useRecoilState(catGalleryUserIdState);
  const [categoryList, setCategoryList] = useState<any[]>([]);
  const [selectCategory, setSelectCategory] = useState("");
  const [catImgs, setCatImgs] = useState<Photo[]>([]);
  const [isToggle, changeIsToggle] = useSetIsToggle();
  const [clickPhoto, setClickPhoto] = useState<any>({});
  const [isUpdated, setIsUpdated] = useState(false);

  // 카테고리 조회
  useEffectGetCategory({ catGalleryUserId, setCategoryList });

  // 해당 카테고리의 저장한 이미지 조회
  useEffectGetCategoryImg({
    isUpdated,
    categoryList,
    selectCategory,
    catGalleryUserId,
    setCatImgs,
    setIsUpdated,
  });

  return (
    <S.Container>
      <Tabs
        type="line"
        tabPosition={"left"}
        onChange={(event) => {
          setSelectCategory(event);
        }}
        items={categoryList.map((el) => {
          return {
            label: el.label,
            key: el.label,
            children: (
              <PhotoAlbum
                layout="masonry"
                photos={catImgs}
                columns={(containerWidth) => {
                  if (containerWidth < 768) return 2;
                  return 3;
                }}
                onClick={(event) => {
                  setClickPhoto(event.photo);
                  changeIsToggle();
                }}
                renderPhoto={({ photo, wrapperStyle, renderDefaultPhoto }) => (
                  <div style={{ position: "relative", ...wrapperStyle }}>
                    {renderDefaultPhoto({ wrapped: true })}
                    {photo.title !== "" && (
                      <S.ImgTitle>{photo.title}</S.ImgTitle>
                    )}
                  </div>
                )}
              />
            ),
          };
        })}
      />
      {isToggle && (
        <UpdateCatModal
          clickPhoto={clickPhoto}
          categoryList={categoryList}
          selectCategory={selectCategory}
          setIsUpdated={setIsUpdated}
          setClickPhoto={setClickPhoto}
          changeIsToggle={changeIsToggle}
        />
      )}
    </S.Container>
  );
}
