import type { StateTree } from 'pinia';
import _ from 'lodash';

function get(state: StateTree, path: Array<string>): unknown
{
  return path.reduce((obj, p) =>
  {
    return obj?.[p];
  }, state);
}

function set(state: StateTree, path: Array<string>, val: unknown): StateTree
{
  return (
    (path.slice(0, -1).reduce((obj, p) =>
    {
      if (!/^(__proto__)$/.test(p))
      {
        return (obj[p] = obj[p] || {});
      }
      else
      {
        return {};
      }
    }, state)[path[path.length - 1]] = val),
    state
  );
}

export function unPick(baseState: StateTree, paths: string[]): StateTree
{
  baseState = _.cloneDeep(baseState);

  paths.forEach((path) =>
  {
    _.unset(baseState, path);
  });

  return baseState;
}

export function pick(baseState: StateTree, paths: string[]): StateTree
{
  return paths.reduce<StateTree>((substate, path) =>
  {
    const pathArray = path.split('.');
    return set(substate, pathArray, get(baseState, pathArray));
  }, {});
}
