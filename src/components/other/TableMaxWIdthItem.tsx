import { isEmpty } from "lodash";
import styled from "styled-components";

export interface TableRowItemProps {
  items: string[];
}

const TableMaxWidthItem = ({ items }: TableRowItemProps) => {
  if (isEmpty(items)) return <>-</>;

  return <Container>{items.map((item) => item).join(", ")}</Container>;
};

const Container = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
`;

export default TableMaxWidthItem;
