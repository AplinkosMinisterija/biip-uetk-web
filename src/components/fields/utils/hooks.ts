import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { handleResponse } from "../../../utils/functions";
import { getFilteredOptions } from "./functions";

export const useAsyncSelectData = ({
  setSuggestionsFromApi,
  disabled,
  onChange,
  dependantId,
  optionsKey,
  hasOptionKey
}: any) => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [suggestions, setSuggestions] = useState<any>([]);
  const [hasMore, setHasMore] = useState(false);
  const [input, setInput] = useState("");
  const [showSelect, setShowSelect] = useState(false);

  const handleBlur = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowSelect(false);
      setInput("");
    }
  };

  const handleClick = (option: any) => {
    setShowSelect(false);
    setInput("");
    setSuggestions([]);
    setCurrentPage(1);
    onChange(option);
  };

  useEffect(() => {
    if (isEmpty(suggestions) && showSelect) {
      handleLoadData("", 1);
    }
  }, [showSelect]);

  useEffect(() => {
    if (!dependantId) return;

    handleLoadData("", 1);
  }, [dependantId]);

  const handleLoadData = async (
    input: string,
    page: number,
    lazyLoading = false
  ) => {
    setLoading(true);
    handleResponse({
      endpoint: () => setSuggestionsFromApi(input, page, dependantId),
      onSuccess: (response: any) => {
        setCurrentPage(response.page);
        setSuggestions(
          lazyLoading
            ? [...suggestions, ...response?.[optionsKey]]
            : response?.[optionsKey]
        );
        setHasMore(response.page < response.totalPages);
        setLoading(false);
      }
    });
  };

  const handleScroll = async (e: any) => {
    const element = e.currentTarget;
    const isTheBottom =
      Math.abs(
        element.scrollHeight - element.clientHeight - element.scrollTop
      ) < 1;

    if (isTheBottom && hasMore && !loading) {
      handleLoadData(input, currentPage + 1, true);
    }
  };

  const handleToggleSelect = () => {
    !disabled && setShowSelect(!showSelect);
  };

  const handleInputChange = (input: string) => {
    setShowSelect(true);
    handleLoadData(input, 1);
    setInput(input);
  };

  return {
    loading,
    suggestions,
    handleScroll,
    input,
    handleInputChange,
    handleToggleSelect,
    showSelect,
    handleBlur,
    handleClick
  };
};
export const useSelectData = ({
  options,
  disabled,
  onChange,
  getOptionLabel
}) => {
  const [input, setInputValue] = useState("");
  const [showSelect, setShowSelect] = useState(false);
  const [suggestions, setSuggestions] = useState<any>(options);

  useEffect(() => {
    setSuggestions(options);
  }, [options]);

  const handleBlur = (event: any) => {
    if (!event.currentTarget.contains(event.relatedTarget)) {
      setShowSelect(false);
      setInputValue("");
    }
  };

  const handleToggleSelect = () => {
    !disabled && setShowSelect(!showSelect);
  };

  const handleClick = (option: any) => {
    setShowSelect(false);
    setInputValue("");
    onChange(option);
  };

  const handleOnChange = (input) => {
    if (!options) return;

    if (input) {
      setShowSelect(true);
    }
    setInputValue(input);
    setSuggestions(getFilteredOptions(options, input, getOptionLabel));
  };

  return {
    suggestions,
    input,
    handleToggleSelect,
    showSelect,
    handleBlur,
    handleClick,
    handleOnChange
  };
};
