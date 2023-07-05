import { map } from "lodash";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { GetAllResponse } from "../../api";
import { device } from "../../styles";
import { FormHistory } from "../../types";
import { HistoryTypes } from "../../utils/constants";
import { formatDateAndTime } from "../../utils/format";
import { handleResponse } from "../../utils/functions";
import { formLabels } from "../../utils/texts";
import { ButtonColors } from "../buttons/Button";
import Avatar from "../other/Avatar";
import LoaderComponent from "../other/LoaderComponent";
import SimpleContainer from "./SimpleContainer";

interface HistoryEndpointProps {
  id?: string;
  page: number;
  pageSize: number;
}

interface FormHistoryContainerProps {
  formHistoryLabels: { [key: string]: string };
  endpoint: (props: any) => Promise<any>;
}
type HistoryContainerColorsType = {
  [key in HistoryTypes]: ButtonColors | null;
};

const historyContainerColors: HistoryContainerColorsType = {
  [HistoryTypes.APPROVED]: ButtonColors.SUCCESS,
  [HistoryTypes.RETURNED]: ButtonColors.PRIMARY,
  [HistoryTypes.REJECTED]: ButtonColors.DANGER,
  [HistoryTypes.CREATED]: null,
  [HistoryTypes.UPDATED]: null,
  [HistoryTypes.DELETED]: null,
  [HistoryTypes.FILE_GENERATED]: null
};

const FormHistoryContainer = ({
  formHistoryLabels,
  endpoint
}: FormHistoryContainerProps) => {
  const [loading, setLoading] = useState(false);
  const [history, setHistoryData] = useState<FormHistory[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [hasMore, setHasMore] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    handleLoadData();
  }, []);

  const handleLoadData = async () => {
    setLoading(true);
    handleResponse({
      endpoint: () =>
        endpoint({
          id,
          page: currentPage + 1,
          pageSize: 5
        }),
      onSuccess: (list: GetAllResponse<FormHistory>) => {
        setCurrentPage(list.page!);
        setHasMore(list.page! < list.totalPages);
        setHistoryData([...history, ...list?.rows]);
        setLoading(false);
      }
    });
  };

  const handleScroll = async (e) => {
    const element = e.currentTarget;
    const isTheBottom =
      Math.abs(
        element.scrollHeight - element.clientHeight - element.scrollTop
      ) < 1;

    if (isTheBottom && hasMore && !loading) {
      handleLoadData();
    }
  };

  return (
    <SimpleContainer title={formLabels.history}>
      <Container onScroll={handleScroll}>
        {map(history, (history: FormHistory, index: number) => {
          const type = history.type;

          const colorKey = historyContainerColors[type];

          return (
            <Row key={`formHistory-${index}`}>
              <StyledAvatar
                name={`${history?.createdBy?.firstName || "Sistema"}`}
                surname={`${history?.createdBy?.lastName || " "}`}
              />
              <Column>
                <FullName>
                  {!history?.createdBy?.firstName &&
                  !history?.createdBy?.lastName
                    ? "Sistema"
                    : `${history?.createdBy?.firstName} ${history?.createdBy?.lastName}`}
                </FullName>
                <DateContainer>
                  {formatDateAndTime(history.createdAt)}
                </DateContainer>
                <Comment>{history.comment}</Comment>
                <InnerContainer>
                  <InnerRow>
                    {colorKey && (
                      <IMG
                        variant={colorKey}
                        src={`/icons/${history.type}.svg`}
                      />
                    )}
                    <HistoryType>{formHistoryLabels[history.type]}</HistoryType>
                  </InnerRow>
                </InnerContainer>
              </Column>
            </Row>
          );
        })}
        {loading && <LoaderComponent />}
      </Container>
    </SimpleContainer>
  );
};

export default FormHistoryContainer;

const StyledAvatar = styled(Avatar)`
  margin-right: 12px;
`;

const Container = styled.div`
  max-height: 500px;
  overflow-y: auto;

  @media ${device.mobileL} {
    max-height: 100%;
  }
`;

const IMG = styled.img<{ variant: ButtonColors }>`
  width: 16px;
  height: 16px;
  background-color: ${({ theme, variant }) => theme.colors[variant]};
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Comment = styled.div`
  font-size: 1.4rem;
  color: #121926;
  margin-bottom: 6px;
  white-space: pre-line;
  word-break: break-word;
`;
const HistoryType = styled.div`
  font-size: 1.2rem;
  color: #121926;
`;

const DateContainer = styled.div`
  font-size: 1.2rem;
  color: #697586;
  margin-bottom: 12px;
`;

const FullName = styled.div`
  font-size: 1.6rem;
  color: #231f20;
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 36px 1fr;
  margin-bottom: 18px;
`;

const InnerRow = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const InnerContainer = styled.div`
  background-color: #f2f2f2;
  width: 100%;
  height: 40px;
  padding: 3px 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  @media ${device.mobileL} {
    width: 100%;
  }
`;
