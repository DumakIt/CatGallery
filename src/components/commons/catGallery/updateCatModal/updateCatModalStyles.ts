import styled from "@emotion/styled";
import { Modal } from "antd";

export const CustomModal = styled(Modal)`
  width: 400px !important;

  @media (max-width: 767px) {
    top: 30%;
    min-width: 70% !important;

    & h1 {
      font-size: 36px;
    }
  }
`;

export const TitleInput = styled.input`
  width: 100%;
  height: 60px;
  margin: 15px 0;
  padding: 10px;
  font-size: 20px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;

  &:focus {
    outline: 1px solid #4096ff;
  }
`;

export const BtnWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;

  @media (max-width: 767px) {
    margin-top: 10px;
  }
`;

export const DeleteBtn = styled.button`
  width: 80px;
  height: 40px;
  font-size: 16px;
  color: #ff4d4f;
  border-radius: 6px;
  border: 1px solid #ff4d4f;
  background-color: white;
  margin-right: 10px;
  cursor: pointer;

  @media (max-width: 767px) {
    width: 100px;
    height: 50px;
    font-size: 20px;
  }
`;

export const UpdateBtn = styled.button`
  width: 80px;
  height: 40px;
  font-size: 16px;
  color: white;
  border: none;
  border-radius: 6px;
  background-color: #4096ff;
  cursor: pointer;

  @media (max-width: 767px) {
    width: 100px;
    height: 50px;
    font-size: 20px;
  }
`;
