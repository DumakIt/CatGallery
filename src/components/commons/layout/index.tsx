import CatGalleryLayout from "./catGallery/catGalleryLayout";

interface ILayoutPros {
  children: JSX.Element;
}

export default function Layout(props: ILayoutPros): JSX.Element {
  return (
        <>
          <CatGalleryLayout />
          {props.children}
        </>
  );
}
