import { Dispatch, useEffect } from "react";
import { GameActionType } from "../../types";
import { getCurrentName, getRandomName, recordRandomName } from "../utils";

export function useSecretName(dispatch: Dispatch<any>) {
  useEffect(() => {
    const existingCurrentName = getCurrentName();

    if (existingCurrentName && existingCurrentName.name) {
      return dispatch({
        type: GameActionType.SET_SECRET_WORD,
        data: existingCurrentName.name.toLowerCase(),
      });
    }

    const randomName = getRandomName();
    recordRandomName(randomName);
    dispatch({
      type: GameActionType.SET_SECRET_WORD,
      data: randomName.toLowerCase(),
    });
  }, [dispatch]);
}
