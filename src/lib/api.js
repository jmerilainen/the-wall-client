const API_URL = import.meta.env.VITE_API_URL;

const api = async (path, args = {}) => {
  const res = await fetch(`${API_URL}${path}`, args);

  return await res.json();
}

const all = async () => {
  return await api('/posts')
}

const create = async (body) => {
  return await api('/posts', {
    method: 'POST',
    body: body,
  });
}

const edit = async (id, body) => {
  return await api(`/posts/${id}`, {
    method: 'PATCH',
    body: body,
  });
}

const destroy = async (id) => {
  return await api(`/posts/${id}`, {
    method: 'DELETE',
  });
}

export {
  all,
  create,
  edit,
  destroy,
}
