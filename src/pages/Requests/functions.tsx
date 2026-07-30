import { isEmpty } from 'lodash';
import TableStatusRowItem from '../../components/fields/TableStatusRowItem';
import FilesToDownload from '../../components/other/FilesToDownload';
import TableMaxWidthItem from '../../components/other/TableMaxWIdthItem';
import { TableRow } from '../../components/tables/table';
import { Request, RequestFilters } from '../../types';
import { colorsByStatus, RequestDataType, RequestFormat } from '../../utils/constants';
import { formatDate, formatDateFrom, formatDateTo } from '../../utils/format';
import { canShowResponseDate } from '../../utils/functions';
import { purposeTypeLabels, requestStatusLabels } from '../../utils/texts';

// The backend matches `data` by JSONB containment, so each option filters on
// the one key that identifies it — a spatial request also carries
// `extended: false`, which would make it match the basic-data filter too.
type RequestDataQuery = { extended: boolean } | { format: RequestFormat };

const dataQueryByType: Record<string, RequestDataQuery> = {
  [RequestDataType.BASIC_DATA]: { extended: false },
  [RequestDataType.EXTENDED_DATA]: { extended: true },
  [RequestDataType.GDB]: { format: RequestFormat.GDB },
  [RequestDataType.GEOJSON]: { format: RequestFormat.GEOJSON },
};

export const mapRequestFilters = (filters: RequestFilters) => {
  const params: any = {};

  if (filters) {
    (!!filters.createdFrom || !!filters.createdTo) &&
      (params.createdAt = {
        ...(filters.createdFrom && {
          $gte: formatDateFrom(new Date(filters.createdFrom)),
        }),
        ...(filters.createdTo && {
          $lt: formatDateTo(new Date(filters.createdTo)),
        }),
      });

    if (filters.requestDataType?.id) {
      const dataQuery = dataQueryByType[filters.requestDataType.id];
      dataQuery && (params.data = JSON.stringify(dataQuery));
    }

    filters?.category && (params.category = filters.category.id);

    filters?.objects &&
      !isEmpty(filters?.objects) &&
      (params.objects = { id: { $in: filters?.objects?.map((state) => state.cadastralId) } });

    !isEmpty(filters?.purpose) &&
      (params.purpose = { $in: filters?.purpose?.map((state) => state.id) });

    !isEmpty(filters?.status) &&
      (params.status = { $in: filters?.status?.map((state) => state.id) });
  }
  return params;
};

export const mapRequests = (requests: Request[]): TableRow[] =>
  requests.map((request: Request) => {
    const objects = request.objects?.map((object) => object.name);

    const createdBy = `${request.createdBy.firstName} ${request.createdBy.lastName}`;

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
              color: colorsByStatus[request.status!],
            },
          ]}
        />
      ),
      createdAt: request?.createdAt ? formatDate(new Date(request.createdAt)) : '',
      createdBy,
      generatedFile: <FilesToDownload url={request.generatedFile} />,
      respondedAt:
        canShowResponseDate(request?.status) &&
        request.respondedAt &&
        formatDate(new Date(request.respondedAt)),
    };
  });
