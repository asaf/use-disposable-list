import { useReducer } from 'react'
import { match } from './utils'
import { Expand } from './utils'

// ItemDef defines an item in a list.
export interface ItemDef<T> {
  id: string
  show: boolean
  details: T
}

// StateDefinition is the reducer state.
interface StateDefinition<T> {
  // items: { id: string; show: boolean }[]
  items: ItemDef<T>[]
}

enum ActionTypes {
  AddItem,
  HideItem,
  RemoveItem,
}

export interface DetailsType extends Record<string, any> {}

type Actions =
  | Expand<{ type: ActionTypes.AddItem } & ItemDef<any>>
  | { type: ActionTypes.RemoveItem; id: ItemDef<any>['id'] }
  | { type: ActionTypes.HideItem; id: ItemDef<any>['id'] }

let reducers: {
  [P in ActionTypes]: (state: StateDefinition<any>, action: Extract<Actions, { type: P }>) => StateDefinition<any>
} = {
  [ActionTypes.AddItem]: (state, action) => ({
    ...state,
    items: [...state.items, { id: action.id, show: action.show, details: action.details }],
  }),
  // Hide item hides an item in the list before it get disposed
  // this gives the opportunity for transition the opportunity to leave before the item gets removed from the DOM.
  [ActionTypes.HideItem]: (state, action) => {
    let items = state.items.slice()
    let idx = state.items.findIndex((i) => i.id === action.id)
    if (idx === -1) return state
    items[idx].show = false
    return { ...state, items }
  },
  [ActionTypes.RemoveItem]: (state, action) => {
    let items = state.items.slice()
    let idx = state.items.findIndex((i) => i.id === action.id)
    if (idx === -1) return state
    items.splice(idx, 1)
    return { ...state, items }
  },
}

function stateReducer(state: StateDefinition<any>, action: Actions) {
  return match(action.type, reducers, state, action)
}

const scheduleDisposal = (
  id: string,
  delay: number,
  hideDuration: number,
  hideItem: Function,
  removeItem: Function
) => {
  hideThenRemove(id, delay, hideDuration, hideItem, removeItem)
}

const hideThenRemove = (
  id: string,
  delay: number,
  // hideDuration is the time we give for the transition to leave
  hideDuration: number,
  hideItem: Function,
  removeItem: Function
) => {
  setTimeout(() => hideItem(id), delay - hideDuration)
  setTimeout(() => removeItem(id), delay)
}

const HIDE_DURATION_DEFAULT = 300

// useDisposableList is the actual exported hook
export default function useDisposableList<E>(
  { timeout, hideDuration = HIDE_DURATION_DEFAULT }: { timeout: number; hideDuration?: number } = {
    timeout: 5000,
    hideDuration: HIDE_DURATION_DEFAULT,
  }
) {
  let [reducerBag, dispatch] = useReducer(stateReducer, {
    items: [],
  } as StateDefinition<E>)

  const removeItem = (id: string) => {
    dispatch({ type: ActionTypes.RemoveItem, id })
  }

  const hideItem = (id: string) => {
    dispatch({ type: ActionTypes.HideItem, id })
  }

  const addItem = (details: E) => {
    const id = Math.random().toString(36).substring(7)
    scheduleDisposal(id, timeout, hideDuration, hideItem, removeItem)
    dispatch({
      type: ActionTypes.AddItem,
      id,
      show: true,
      details,
    })
  }

  const removeItemManually = (id: string) => {
    // double hideDuration causes item to disappear immediately after the provided hide duration
    hideThenRemove(id, hideDuration, hideDuration, hideItem, removeItem)
  }

  return [reducerBag.items, addItem, removeItemManually] as const
}
