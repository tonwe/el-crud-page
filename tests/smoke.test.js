'use strict';

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Importing the CommonJS bundle without window/document is the SSR smoke test.
const { Crud, CrudTable, QueryForm } = require('../dist/index.js');

assert.ok(Crud && CrudTable && QueryForm, 'all public components should be exported');
assert.deepStrictEqual(Crud.props.buttons.type, [Array, Function]);
assert.strictEqual(Crud.props.tabPanesPosition.default, 'top');
assert.strictEqual(Crud.props.tabPanesPosition.validator('top'), true);
assert.strictEqual(Crud.props.tabPanesPosition.validator('container'), true);
assert.strictEqual(Crud.props.tabPanesPosition.validator('invalid'), false);

let refreshCount = 0;
const queryContext = {
  pagination: { pageNum: 4, pageSize: 10 },
  queryParams: {},
  refresh() {
    refreshCount += 1;
  }
};
Crud.methods.handleQuery.call(queryContext, { name: 'new query' });
assert.strictEqual(queryContext.pagination.pageNum, 1, 'search should return to page 1');
assert.strictEqual(refreshCount, 1, 'search should refresh once');

refreshCount = 0;
const tabContext = {
  tabQuery: {},
  pagination: { pageNum: 3, pageSize: 10 },
  orderParams: {},
  $refs: {},
  refresh() {
    refreshCount += 1;
  }
};
Crud.methods.handleTabClick.call(tabContext, { name: 'active' });
assert.strictEqual(tabContext.pagination.pageNum, 1, 'tab changes should return to page 1');
assert.strictEqual(refreshCount, 1, 'tab changes without QueryForm should refresh once');

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

async function testLatestRefreshWins() {
  const first = deferred();
  const second = deferred();
  const responses = [first, second];
  const context = {
    refreshRequestId: 0,
    listLoading: false,
    data: [],
    total: 0,
    async getParams() {
      return {};
    },
    service: {
      page() {
        return responses.shift().promise;
      }
    }
  };

  const firstRefresh = Crud.methods.refresh.call(context);
  await Promise.resolve();
  const secondRefresh = Crud.methods.refresh.call(context);
  await Promise.resolve();

  second.resolve({ code: 200, rows: ['new'], total: 1 });
  await secondRefresh;
  first.resolve({ code: 200, rows: ['old'], total: 1 });
  await firstRefresh;

  assert.deepStrictEqual(context.data, ['new'], 'an older response must not overwrite newer data');
  assert.strictEqual(context.listLoading, false, 'loading should end after the latest request');
}

async function main() {
  await testLatestRefreshWins();

  const packageJson = require('../package.json');
  const typesPath = path.resolve(__dirname, '..', packageJson.types);
  assert.ok(fs.existsSync(typesPath), 'the package types entry should exist');

  console.log('Smoke tests passed');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
