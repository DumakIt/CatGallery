import styled from "@emotion/styled";
import { Modal, Select } from "antd";

export const CustomModal = styled(Modal)`
  top: 30%;
  width: 750px !important;

  @media (max-width: 767px) {
    top: 10%;
    width: 70% !important;
    min-width: 600px !important;
  }
`;

export const SaveCatContainer = styled.div`
  height: 300px;
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-direction: column;
    height: auto;
  }
`;

export const SaveCatImg = styled.img`
  width: 44%;
  height: 100%;
  object-fit: contain;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const ImgInfoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 50%;

  @media (max-width: 767px) {
    width: 100%;
    margin-top: 10px;
  }
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin-right: 10px;
    margin-top: 5px;
    align-self: flex-end;
    font-size: 12px;
    color: #828282;
  }

  @media (max-width: 767px) {
    margin: 10px 0 30px;

    & > div {
      font-size: 18px;
    }
  }
`;

export const InputTitle = styled.input`
  margin-top: 5px;
  padding: 0 11px;
  height: 38px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;

  &:focus {
    outline: 1px solid #4096ff;
  }

  @media (max-width: 767px) {
    height: 50px;
    font-size: 20px;
  }
`;

export const CustomSelect = styled(Select)`
  @media (max-width: 767px) {
    & > div {
      height: 50px !important;
    }

    & > div > span {
      height: 40px !important ;
      line-height: 50px !important;
      font-size: 20px;
    }
  }
`;

export const SelectAddCategoryWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 50px;
  padding-top: 5px;
  border-top: 1px solid #d9d9d9;
`;

export const AddCategoryInput = styled.input`
  padding: 0 10px;
  height: 100%;
  width: 75%;
  border: 1px solid #d9d9d9;
  border-radius: 8px;

  &:focus {
    outline: 1px solid #4096ff;
  }

  @media (max-width: 767px) {
    height: 50px;
    font-size: 20px;
  }
`;

export const AddCategoryBtn = styled.button`
  height: 100%;
  width: 20%;
  border: 1px solid #d9d9d9;
  background-color: white;
  border-radius: 8px;
  font-size: 12px;
  cursor: pointer;

  &:hover {
    background-color: #71b1ff;
    border: none;
  }

  @media (max-width: 767px) {
    font-size: 20px;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  @media (max-width: 767px) {
    margin-top: 30px;
  }
`;

export const BtnCancel = styled.button`
  height: 35px;
  width: 70px;
  border-radius: 4px;
  border: none;
  background-color: #d9d9d9;
  cursor: pointer;

  @media (max-width: 767px) {
    height: 50px;
    width: 100px;
    font-size: 20px;
  }
`;

export const BtnSave = styled.button`
  margin-left: 15px;
  height: 35px;
  width: 70px;
  border-radius: 4px;
  border: none;
  background-color: #71b1ff;
  cursor: pointer;

  @media (max-width: 767px) {
    height: 50px;
    width: 100px;
    font-size: 20px;
  }
`;
