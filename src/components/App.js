export function App(store) {
  return `
    <h1>The WALL</h1>
    <main>
      ${store.posts
        ? `<ul>
          ${store.posts.map(item => {
            return `<li data-test="entry">${Post(item, store.edit === item.id)}</li>`;
          }).join('\n')}
        </ul>`
        : ''
      }
      ${store.state !== 'idle' ? State(store.state) : ''}
    </main>
    <form onSubmit="dispatchAction({type: 'CREATE_SUBMIT', event})">
        <input data-test="new-entry" type="text" name="content">
        <button>Send</button>
    </form>
  `;
}

function State(value) {
  return `<p>${value}</p>`;
}

function Post(item, edit = false) {
  if (edit) {
    return `
      <span>
        <form onSubmit="dispatchAction({type: 'EDIT_SUBMIT', payload: {id : ${item.id}}, event})">
            <input type="text" id="edit-content-${item.id}" name="content" value="${item.content}" />
        </form>
        <button aria-label="Discard edit" onClick="dispatchAction({type: 'EDIT_DISCARD', payload: {id : ${item.id}}, event})">x</button>
      </span>
    `;
  }

  return `
    <span>
      <span onClick="dispatchAction({type: 'EDIT', payload: {id : ${item.id}}, event})">${item.content}</span>
      <button data-test="remove" aria-label="Remove item" onClick="dispatchAction({type: 'REMOVE_SUBMIT', payload: {id : ${item.id}}, event})"">x</button>
    </span>
  `;
}
