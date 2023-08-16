import { isEmpty } from "lodash";
import Api from "../../../api";
import { ColumnButtonProps } from "../../../components/other/ColumnButton";
import { DynamicFilterProps } from "../../../components/other/DynamicFilter";
import { NotFoundProps } from "../../../components/other/NotFound";
import { ButtonInfo } from "../../../components/wrappers/PageWrapper";
import { actions as columnActions } from "../../../state/columns/reducer";
import { actions } from "../../../state/filters/reducer";
import {
  useAppSelector,
  useGenericTablePageHooks,
  useTableData
} from "../../../state/hooks";
import { slugs } from "../../../utils/routes";
import {
  buttonsTitles,
  emptyStateLabels,
  emptyStateUrlLabels
} from "../../../utils/texts";
import { filterConfig, rowConfig } from "../config";
import { mapRequestFilters, mapRequests } from "../functions";

export const useData = () => {
  const { dispatch, navigate, page } = useGenericTablePageHooks();
  const filters = useAppSelector((state) => state.filters.requestFilters);
  const columns = useAppSelector((state) => state.columns.request);

  const { tableData, loading } = useTableData({
    endpoint: () =>
      Api.requests({
        page,
        filter: mapRequestFilters(filters)
      }),
    mapData: (list) => mapRequests(list),
    dependencyArray: [page, filters],
    name: "requests"
  });

  const buttonInfo: ButtonInfo = {
    url: slugs.newRequest,
    loading,
    label: buttonsTitles.newExcerpt
  };

  const filterInfo: DynamicFilterProps = {
    loading,
    filterConfig: filterConfig,
    isFilterApplied: !isEmpty(filters),
    rowConfig: rowConfig,
    onSetFilters: (filters: any) =>
      dispatch(actions.setRequestFilters(filters)),
    filters: filters
  };

  const columnInfo: ColumnButtonProps = {
    columns,
    handleToggle: (key) => dispatch(columnActions.toggleRequestColumns(key))
  };

  const notFoundInfo: NotFoundProps = {
    url: slugs.newRequest,
    urlLabel: emptyStateUrlLabels.request,
    label: emptyStateLabels.request
  };

  return {
    notFoundInfo,
    columnInfo,
    filterInfo,
    buttonInfo,
    navigate,
    loading,
    tableData
  };
};
