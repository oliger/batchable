import { assert } from 'chai';
import batchable from '../src/index';

describe('batchable', () => {
  let result;
  let batched = batchable((calls) => {
    result = calls.map(c => c[0]).join('');
  });

  it('throws an error if first argument is not a function', () => {
    assert.throw(() => batchable(), 'Expected handler to be a function.');
  });

  it('returns a function', () => {
    assert.isFunction(batched);
  });

  describe('batched', () => {
    context('when called consecutive time', () => {
      it('calls handler one time', (done) => {
        batched('a');
        batched('b');
        batched('c');

        setTimeout(() => {
          assert.equal(result, 'abc');
          done();
        }, 1);
      });
    });
  });
});
