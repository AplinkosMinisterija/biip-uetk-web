import { isEmpty } from "lodash";
import TableStatusRowItem from "../../components/fields/TableStatusRowItem";
import { TableRow } from "../../components/tables/table";
import { Form, FormFilters, FormFiltersProps } from "../../types";
import { colorsByStatus, StatusTypes } from "../../utils/constants";
import { formatDate, formatDateFrom, formatDateTo } from "../../utils/format";
import {
  formObjectTypeLabels,
  formStatusLabels,
  formTypeLabels
} from "../../utils/texts";

export const canShowResponseDate = (status) => {
  return [
    StatusTypes.APPROVED,
    StatusTypes.REJECTED,
    StatusTypes.RETURNED
  ].includes(status);
};

export const mapFormFilters = (filters: FormFilters): FormFiltersProps => {
  let params: FormFiltersProps = {};

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

    !isEmpty(filters?.type) &&
      (params.type = { $in: filters?.type!?.map((state) => state.id) });
    !isEmpty(filters?.objectType) &&
      (params.objectType = {
        $in: filters?.objectType!?.map((state) => state.id)
      });

    !isEmpty(filters?.status) &&
      (params.status = { $in: filters?.status!?.map((state) => state.id) });
  }
  return params;
};

export const mapForms = (forms: Form[]): TableRow[] =>
  forms.map((form: Form) => {
    return {
      id: form.id,
      name: `${form.objectName}`,
      providedBy: form.providedBy,
      objectType: formObjectTypeLabels[form?.objectType!],
      status: (
        <TableStatusRowItem
          info={[
            {
              label: formStatusLabels[form.status!],
              color: colorsByStatus[form.status!]
            }
          ]}
        />
      ),
      createdAt: formatDate(new Date(form?.createdAt!)),
      type: formTypeLabels[form.type],
      respondedAt:
        canShowResponseDate(form?.status) &&
        form.respondedAt &&
        formatDate(new Date(form.respondedAt))
    };
  });
