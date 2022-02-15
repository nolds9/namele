import { Dispatch, useEffect } from "react";
import { GameActionType } from "../../types";

export function useSecretName(dispatch: Dispatch<any>) {
  useEffect(() => {
    // TODO: fetch secret secretWord

    dispatch({ type: GameActionType.SET_SECRET_WORD, data: "hello" });
  }, [dispatch]);
}
