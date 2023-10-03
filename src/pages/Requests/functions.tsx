import { isEmpty } from "lodash";
import TableStatusRowItem from "../../components/fields/TableStatusRowItem";
import FilesToDownload from "../../components/other/FilesToDownload";
import TableMaxWidthItem from "../../components/other/TableMaxWIdthItem";
import { TableRow } from "../../components/tables/table";
import { Request, RequestFilters, RequestFiltersProps } from "../../types";
import { colorsByStatus } from "../../utils/constants";
import { formatDate, formatDateFrom, formatDateTo } from "../../utils/format";
import { canShowResponseDate } from "../../utils/functions";
import { purposeTypeLabels, requestStatusLabels } from "../../utils/texts";

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

    !isEmpty(filters?.purpose) &&
      (params.purpose = { $in: filters?.purpose!?.map((state) => state.id) });

    !isEmpty(filters?.status) &&
      (params.status = { $in: filters?.status!?.map((state) => state.id) });
  }
  return params;
};

export const mapRequests = (requests: Request[]): TableRow[] =>
  requests.map((request: Request) => {
    const objects = request.objects?.map((object) => object.name);
    return {
      tableId: `#${request.id}`,
      objects: <TableMaxWidthItem items={objects!} />,
      id: request.id,
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
