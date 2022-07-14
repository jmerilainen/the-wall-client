import { createStore } from "./redux";
import "./style.css";

const reducer = (state = {}, action) => {
  switch (action.type) {
    case "POSTS":
      return { ...state, posts: action.payload };
    case "EDIT":
      return { ...state, edit: action.payload };
    case "STATE":
      return { ...state, state: action.payload };
    default:
      return state;
  }
};

const initialState = {
  posts: [],
  edit: null,
  state: "idle",
};

let store = createStore(reducer, initialState);

const url = import.meta.env.VITE_API_URL;

const api = async (path, args = {}) => {
  const res = await fetch(`${url}${path}`, args).catch(
    () => void store.dispatch({ type: "STATE", payload: "error" })
  );

  return await res.json();
};

const refreshData = async () => {
  store.dispatch({ type: "STATE", payload: "loading" });

  try {
    const posts = await api("/posts");

    store.dispatch({ type: "STATE", payload: "idle" });
    store.dispatch({ type: "POSTS", payload: posts });
  } catch (e) {
    store.dispatch({ type: "STATE", payload: "error" });
  }
};

const onAboutEdit = (id) => {
  store.dispatch({ type: "EDIT", payload: id });
};

const onEdit = async (event, id) => {
  event.preventDefault();
  store.dispatch({ type: "STATE", payload: "loading" });

  await api(`/posts/${id}`, {
    method: "PATCH",
    body: new URLSearchParams(new FormData(event.target)),
  });

  event.target.reset();

  store.dispatch({ type: "STATE", payload: "idle" });
  store.dispatch({ type: "EDIT", payload: null });

  refreshData();
};

const onRemove = async (id) => {
  store.dispatch({ type: "STATE", payload: "loading" });

  await api(`/posts/${id}`, {
    method: "delete",
  });

  store.dispatch({ type: "STATE", payload: "idle" });
  refreshData();
};

const onCreate = async (event) => {
  event.preventDefault();

  store.dispatch({ type: "STATE", payload: "loading" });

  await fetch(`${url}/posts`, {
    method: "post",
    body: new URLSearchParams(new FormData(event.target)),
  }).catch(() => void store.dispatch({ type: "STATE", payload: "error" }));

  store.dispatch({ type: "STATE", payload: "idle" });

  event.target.reset();

  refreshData();
};

refreshData();

const render = (store) => {
  const renderPost = (item) => {
    return `
      <li data-test="entry">
          ${
            store.edit !== item.id
              ? `<span onClick="onAboutEdit(${item.id})">${item.content}</span>`
              : `<span>
                  <form onSubmit="onEdit(event, ${item.id})">
                      <input type="text" id="edit-content-${item.id}" name="content" value="${item.content}" />
                  </form>
              </span>
          `
          }
          <button data-test="remove" aria-label="Remove item" onClick="onRemove(${
            item.id
          })">x</button>
      </li>`;
  };

  let stateHtml = "";

  if (store.state === "loading") {
    stateHtml = "<p>Loading</p>";
  }

  if (store.state === "error") {
    stateHtml = "<p>API Error</p>";
  }

  const pots = store.posts.map(renderPost);
  const list = `<ul data-test="entries">${pots.join("\n")}</ul>`;

  const html = `
    <p>Using the API: <span data-test="api_url">${url}</span></p>
    <h1>The WALL</h1>

    <main>
      ${list}
    </main>

    ${stateHtml}

    <form onSubmit="onCreate(event)">
        <input data-test="new-entry" type="text" name="content">
        <button>Send</button>
    </form>
  `;

  document.querySelector("#app").innerHTML = html;

  if (store.edit) {
    document.querySelector(`#edit-content-${store.edit}`).focus();
    document.querySelector(`#edit-content-${store.edit}`).select();
  }
};

window.onEdit = onEdit;
window.onAboutEdit = onAboutEdit;
window.onRemove = onRemove;
window.onCreate = onCreate;

store.subscribe(() => render(store.getState()));
