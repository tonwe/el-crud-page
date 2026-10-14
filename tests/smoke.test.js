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

async function testQueryFormLayout() {
  const previousWindow = global.window;
  const previousDocument = global.document;
  const previousObserver = global.ResizeObserver;
  const listeners = new Set();
  let observer;
  global.window = {
    addEventListener(event, handler) { listeners.add(handler); },
    removeEventListener(event, handler) { listeners.delete(handler); },
    getComputedStyle() { return { marginTop: '0px', marginBottom: '10px' }; }
  };
  global.document = { getElementsByClassName() { return []; } };
  global.ResizeObserver = class {
    constructor(callback) { this.callback = callback; observer = this; }
    observe(element) { this.element = element; }
    disconnect() { this.element = null; }
  };
  try {
    const ticks = [];
    let visible = false;
    let width = 900;
    const context = {
      ...QueryForm.data(),
      lineClamp: 1,
      queryItems: Array.from({ length: 5 }, (_, i) => ({ prop: `field${i}`, type: 'input' })),
      $set(target, key, value) { target[key] = value; },
      $nextTick(callback) { ticks.push(callback); },
      $refs: {}
    };
    Object.entries(QueryForm.methods).forEach(([name, method]) => {
      context[name] = method.bind(context);
    });
    const form = {
      style: {},
      get clientWidth() { return visible ? width : 0; },
      get scrollHeight() {
        if (!visible) return 0;
        const shown = context.queryFormItems.filter(item => context.expand || !item.hidden).length;
        return Math.ceil((shown + 1) / (width >= 900 ? 3 : 2)) * 39 - 10;
      },
      get clientHeight() {
        return context.expand || context.formMaxHeight === null
          ? this.scrollHeight : Math.min(this.scrollHeight, context.formMaxHeight);
      }
    };
    context.$refs.queryForm = { $el: form };
    context.$refs.queryFormBtn = { $el: { get clientHeight() { return visible ? 29 : 0; } } };
    const flush = () => {
      let count = 0;
      while (ticks.length) {
        assert.ok(count++ < 100, 'layout should converge');
        ticks.shift()();
      }
    };
    const shownCount = () => context.queryFormItems.filter(item => !item.hidden).length;
    QueryForm.created.call(context);
    context.reset();
    QueryForm.mounted.call(context);
    flush();
    assert.strictEqual(context.formMaxHeight, null, 'a hidden mount must leave height unconstrained');
    assert.strictEqual(shownCount(), 5, 'a hidden mount must not hide query fields');

    visible = true;
    observer.callback([{ contentRect: { width, height: form.clientHeight } }]);
    await new Promise(resolve => setTimeout(resolve, 150));
    flush();
    assert.strictEqual(context.formMaxHeight, 39, 'becoming visible should measure the row height');
    assert.strictEqual(shownCount(), 2, 'collapsed fields should fit alongside the buttons');
    assert.strictEqual(context.needExpand, true);

    context.handelExpand();
    flush();
    assert.strictEqual(shownCount(), 5, 'expanding should restore every query field');
    context.handelExpand();
    flush();
    assert.strictEqual(shownCount(), 2);

    context.refreshLayout();
    QueryForm.deactivated.call(context);
    visible = false;
    flush();
    assert.strictEqual(shownCount(), 5, 'queued work must not hide fields after deactivation');
    assert.strictEqual(listeners.size, 0);
    assert.strictEqual(observer.element, null);

    visible = true;
    width = 600;
    QueryForm.activated.call(context);
    flush();
    assert.strictEqual(context.formMaxHeight, 39, 'keep-alive activation must remeasure the form');
    assert.strictEqual(shownCount(), 1, 'activation should use the current container width');

    width = 900;
    observer.callback([{ contentRect: { width, height: form.clientHeight } }]);
    await new Promise(resolve => setTimeout(resolve, 150));
    flush();
    assert.strictEqual(shownCount(), 2, 'container resizing should restore fields that now fit');

    context.$refs = {};
    context.refreshLayout();
    flush();
    assert.strictEqual(context.formMaxHeight, null, 'missing form refs must be safe');
    QueryForm.beforeDestroy.call(context);
    assert.strictEqual(listeners.size, 0);
  } finally {
    global.window = previousWindow;
    global.document = previousDocument;
    global.ResizeObserver = previousObserver;
  }
}

async function main() {
  await testLatestRefreshWins();
  await testQueryFormLayout();

  const packageJson = require('../package.json');
  const typesPath = path.resolve(__dirname, '..', packageJson.types);
  assert.ok(fs.existsSync(typesPath), 'the package types entry should exist');

  console.log('Smoke tests passed');
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
