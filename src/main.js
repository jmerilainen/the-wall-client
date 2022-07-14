import { App } from './components/App';
import * as api from './lib/api';
import { createStore } from './lib/redux';
import './style.css'

const reducer = (state = {}, action) => {
  switch (action.type) {
      case 'POSTS':
          return {...state, posts: action.payload }
      case 'EDIT':
          return {...state, edit: action.payload }
      case 'STATE':
          return {...state, state: action.payload }
      default:
          return state
  }
}

const initialState = {
  posts: [],
  edit: null,
  state: 'idle',
}

let store = createStore(reducer, initialState)

const dispatch = store.dispatch;

const refreshData = async () => {
  dispatch({ type: 'STATE', payload: 'loading'})

  try {
      const posts = await api.all();

      dispatch({ type: 'STATE', payload: 'idle'})
      dispatch({ type: 'POSTS', payload: posts})
  } catch (e) {
      dispatch({ type: 'STATE', payload: 'error'})
  }
}

const onEdit = (id) => {
  dispatch({ type: 'EDIT', payload: id});

  if (id) {
    document.querySelector(`#edit-content-${id}`).focus()
    document.querySelector(`#edit-content-${id}`).select();
  }
}

const onEditSubmit = async (event, id) => {
  event.preventDefault();
  dispatch({ type: 'STATE', payload: 'loading'})

  await api.edit(id, new URLSearchParams(new FormData(event.target)));

  event.target.reset();

  store.dispatch({ type: 'STATE', payload: 'idle'})
  store.dispatch({ type: 'EDIT', payload: null });

  refreshData();
}

const onRemove = async (id) => {
  store.dispatch({ type: 'STATE', payload: 'loading'})

  try {
    await api.destroy(id);
    store.dispatch({ type: 'STATE', payload: 'idle'});

    refreshData();
  } catch (e) {
    dispatch({ type: 'STATE', payload: 'error'})
  }
}

const onCreate = async (event) => {
  event.preventDefault();

  store.dispatch({ type: 'STATE', payload: 'loading'})

  await api.create(new URLSearchParams(new FormData(event.target)))

  store.dispatch({ type: 'STATE', payload: 'idle'})

  event.target.reset();

  refreshData();
}

const dispatchAction = (action) => {
  console.log(action);
  switch (action.type) {
    case 'EDIT':
      return onEdit(action.payload.id);
    case 'EDIT_DISCARD':
      return onEdit(null);
    case 'EDIT_SUBMIT':
      return onEditSubmit(action.event, action.payload.id);
    case 'CREATE_SUBMIT':
      return onCreate(action.event);
    case 'REMOVE_SUBMIT':
      return onRemove(action.payload.id);
    default:
        return;
  }
}

refreshData();

const render = (store) => {
  document.querySelector('#app').innerHTML = App(store);
};

store.subscribe(() =>
  render(store.getState())
);

window.dispatchAction = dispatchAction;
