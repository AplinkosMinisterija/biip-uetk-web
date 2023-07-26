import { isEmpty } from "lodash";
import TableStatusRowItem from "../../components/fields/TableStatusRowItem";
import FilesToDownload from "../../components/other/FilesToDownload";
import { TableRow } from "../../components/tables/table";
import { Request, RequestFilters, RequestFiltersProps } from "../../types";
import { colorsByStatus } from "../../utils/constants";
import { formatDate, formatDateFrom, formatDateTo } from "../../utils/format";
import { canShowResponseDate } from "../../utils/functions";
import {
  deliveryTypeLabels,
  purposeTypeLabels,
  requestStatusLabels
} from "../../utils/texts";

export const mapRequestFilters = (filters: RequestFilters) => {
  let params: RequestFiltersProps = {};

  if (filters) {
    (!!filters.createdFrom || !!filters.createdTo) &&
      (params.createdAt = {
        ...(filters.createdFrom && {
          $gte: formatDateFrom(new Date(filters.createdFrom))
        }),
        ...(filters.createdTo && {
          $lt: formatDateTo(new Date(filters.createdTo))
        })
      });

    !isEmpty(filters?.delivery) &&
      (params.delivery = { $in: filters?.delivery!?.map((state) => state.id) });

    !isEmpty(filters?.purpose) &&
      (params.purpose = { $in: filters?.purpose!?.map((state) => state.id) });

    !isEmpty(filters?.status) &&
      (params.status = { $in: filters?.status!?.map((state) => state.id) });
  }
  return params;
};

export const mapRequests = (requests: Request[]): TableRow[] =>
  requests.map((request: Request) => {
    return {
      tableId: `#${request.id}`,
      id: request.id,
      delivery: deliveryTypeLabels[request.delivery!],
      purpose: purposeTypeLabels[request.purpose!],
      status: (
        <TableStatusRowItem
          info={[
            {
              label: requestStatusLabels[request.status!],
              color: colorsByStatus[request.status!]
            }
          ]}
        />
      ),
      createdAt: formatDate(new Date(request?.createdAt!)),

      generatedFile: <FilesToDownload url={request.generatedFile} />,
      respondedAt:
        canShowResponseDate(request?.status) &&
        request.respondedAt &&
        formatDate(new Date(request.respondedAt))
    };
  });
