import { PrimitiveAtom, useSetAtom } from "jotai";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export const useParamAtom = <T>(
  nameParam: string,
  atom: PrimitiveAtom<T | string>,
  needClear = true
) => {
  const params = useParams();

  const param = params[nameParam];

  const setAtom = useSetAtom(atom);

  useEffect(() => {
    setAtom(param ?? "");

    return () => {
      if (needClear) setAtom("");
    };
  }, [param]);
};
