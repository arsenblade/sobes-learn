import {
  ActionCreatorsMapObject, AsyncThunk, bindActionCreators,
} from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { allActions } from '../store/rootAction';
import { useAppDispatch } from './useAppDispatch';

export const useActions = () => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};

export const useActionCreatorsTyped = <
    Actions extends ActionCreatorsMapObject = ActionCreatorsMapObject
    >(
    actions: Actions,
  ): BoundActions<Actions> => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};

type BoundActions<Actions extends ActionCreatorsMapObject> = {
  [key in keyof Actions]: Actions[key]extends AsyncThunk<any, any, any>
      ? BoundAsyncThunk<Actions[key]>
      : Actions[key]
}

type BoundAsyncThunk<Thunk extends AsyncThunk<any, any, any>> = (
    ...args: Parameters<Thunk>
) => ReturnType<ReturnType<Thunk>>
