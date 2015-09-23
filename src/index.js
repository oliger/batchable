export default function batchable(handler, wait = 1) {
  if (typeof handler !== 'function') {
    throw new Error('Expected handler to be a function.');
  }

  let calls = [];
  let timeout = null;

  return function() {
    calls.push([...arguments]);
    clearTimeout(timeout);

    let delayed = () => {
      handler.call(null, calls);
      calls = [];
      timeout = null;
    };

    timeout = setTimeout(delayed, wait);
  };
}
