import qs from "query-string";

interface FormUrlQueryProps {
  params: string;
  key: string;
  value: string;
}

interface RemoveKeysFormUrlQueryProps {
  params: string;
  keysToRemove: string[];
}

export const formUrlQuery = ({ params, key, value }: FormUrlQueryProps) => {
  const queryString = qs.parse(params);

  queryString[key] = value;

  return qs.stringifyUrl({
    url: window.location.pathname,
    query: queryString,
  });
};

export const removeKeysFormUrlQuery = ({
  params,
  keysToRemove,
}: RemoveKeysFormUrlQueryProps) => {
  const queryString = qs.parse(params);

  keysToRemove.forEach((key) => {
    delete queryString[key];
  });

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: queryString,
    },
    { skipNull: true }
  );
};
