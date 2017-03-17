const configuredFetch = (url, opts = {}) => {
  const defaultOpts = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  if (opts.body && typeof opts.body === 'object') {
    opts.body = JSON.stringify(opts.body);
  }

  return fetch(url, Object.assign(defaultOpts, opts))
  .then(r => r.json());
};

const configure = () => {
  window.customFetch = configuredFetch;
};

export default configure;
