import { useQuery } from 'react-query';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { TableRow } from '../components/tables/table';
import { handleErrorFromServerToast } from '../utils/functions';
import type { AppDispatch, RootState } from './store';

interface TableDataProp {
  endpoint: () => Promise<any>;
  mapData: (props: any) => TableRow[];
  dependencyArray: any[];
  name: string;
}

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useTableData = ({ endpoint, mapData, dependencyArray, name }: TableDataProp) => {
  const { data, isLoading } = useQuery({
    queryKey: [name, dependencyArray],
    queryFn: endpoint,
    onError: handleErrorFromServerToast,
    select: ({ rows = [], totalPages = 0 }) => ({
      data: mapData(rows),
      totalPages,
    }),
  });

  return { tableData: data, loading: isLoading };
};

export const useGenericTablePageHooks = () => {
  const [searchParams] = useSearchParams();
  const { page } = Object.fromEntries([...Array.from(searchParams)]);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  return { page, navigate, dispatch, location };
};
