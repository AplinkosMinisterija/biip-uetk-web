import styled from "styled-components";
import { device } from ".";

export const Container = styled.div`
  gap: 12px;
  display: grid;
  grid-template-columns: 1fr minmax(280px, 400px);
  @media ${device.mobileL} {
    grid-template-columns: 1fr;
  }
`;
export const ColumnOne = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 2;
  @media ${device.mobileL} {
    width: 100%;
  }
`;

export const ColumnTwo = styled.div`
  display: flex;
  gap: 8px;
  flex-direction: column;
  flex: 1;

  @media ${device.mobileL} {
    width: 100%;
  }
`;
