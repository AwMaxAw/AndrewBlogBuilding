var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/pages-FApaFO/bundledWorker-0.10253631019073106.mjs
import { Writable } from "node:stream";
import { EventEmitter } from "node:events";
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
__name2(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name2(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
__name2(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");
__name2(notImplementedClass, "notImplementedClass");
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  static {
    __name2(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark2");
  }
  static {
    __name2(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  static {
    __name2(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  static {
    __name2(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  static {
    __name2(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  static {
    __name2(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  static {
    __name2(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();
if (!("__unenv__" in performance)) {
  const proto = Performance.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;
var noop_default = Object.assign(() => {
}, { __unenv__: true });
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;
globalThis.console = console_default;
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime2"), "hrtime"), { bigint: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint"), "bigint") });
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  static {
    __name2(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  static {
    __name2(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir3, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x2, y2, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count3, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
var NODE_VERSION = "22.14.0";
var Process = class _Process extends EventEmitter {
  static {
    __name(this, "_Process");
  }
  static {
    __name2(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name2(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var workerdProcess = getBuiltinModule("node:process");
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
var { exit, features, platform } = workerdProcess;
var {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert: assert2,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime3,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;
globalThis.process = process_default;
import("node:buffer").then(({ Buffer: Buffer2 }) => {
  globalThis.Buffer = Buffer2;
}).catch(() => null);
var __ALSes_PROMISE__ = import("node:async_hooks").then(({ AsyncLocalStorage }) => {
  globalThis.AsyncLocalStorage = AsyncLocalStorage;
  const envAsyncLocalStorage = new AsyncLocalStorage();
  const requestContextAsyncLocalStorage = new AsyncLocalStorage();
  globalThis.process = {
    env: new Proxy(
      {},
      {
        ownKeys: /* @__PURE__ */ __name2(() => Reflect.ownKeys(envAsyncLocalStorage.getStore()), "ownKeys"),
        getOwnPropertyDescriptor: /* @__PURE__ */ __name2((_2, ...args) => Reflect.getOwnPropertyDescriptor(envAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
        get: /* @__PURE__ */ __name2((_2, property) => Reflect.get(envAsyncLocalStorage.getStore(), property), "get"),
        set: /* @__PURE__ */ __name2((_2, property, value) => Reflect.set(envAsyncLocalStorage.getStore(), property, value), "set")
      }
    )
  };
  globalThis[/* @__PURE__ */ Symbol.for("__cloudflare-request-context__")] = new Proxy(
    {},
    {
      ownKeys: /* @__PURE__ */ __name2(() => Reflect.ownKeys(requestContextAsyncLocalStorage.getStore()), "ownKeys"),
      getOwnPropertyDescriptor: /* @__PURE__ */ __name2((_2, ...args) => Reflect.getOwnPropertyDescriptor(requestContextAsyncLocalStorage.getStore(), ...args), "getOwnPropertyDescriptor"),
      get: /* @__PURE__ */ __name2((_2, property) => Reflect.get(requestContextAsyncLocalStorage.getStore(), property), "get"),
      set: /* @__PURE__ */ __name2((_2, property, value) => Reflect.set(requestContextAsyncLocalStorage.getStore(), property, value), "set")
    }
  );
  return { envAsyncLocalStorage, requestContextAsyncLocalStorage };
}).catch(() => null);
var se = Object.create;
var U = Object.defineProperty;
var re = Object.getOwnPropertyDescriptor;
var ne = Object.getOwnPropertyNames;
var oe = Object.getPrototypeOf;
var ie = Object.prototype.hasOwnProperty;
var M = /* @__PURE__ */ __name2((e, t) => () => (e && (t = e(e = 0)), t), "M");
var V = /* @__PURE__ */ __name2((e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports), "V");
var ce = /* @__PURE__ */ __name2((e, t, s, a) => {
  if (t && typeof t == "object" || typeof t == "function") for (let n of ne(t)) !ie.call(e, n) && n !== s && U(e, n, { get: /* @__PURE__ */ __name2(() => t[n], "get"), enumerable: !(a = re(t, n)) || a.enumerable });
  return e;
}, "ce");
var $ = /* @__PURE__ */ __name2((e, t, s) => (s = e != null ? se(oe(e)) : {}, ce(t || !e || !e.__esModule ? U(s, "default", { value: e, enumerable: true }) : s, e)), "$");
var f;
var l = M(() => {
  f = { collectedLocales: [] };
});
var g;
var u = M(() => {
  g = { version: 3, routes: { none: [{ src: "^(?:/((?:[^/]+?)(?:/(?:[^/]+?))*))/$", headers: { Location: "/$1" }, status: 308, continue: true }, { src: "^/_next/__private/trace$", dest: "/404", status: 404, continue: true }, { src: "^/404/?$", status: 404, continue: true, missing: [{ type: "header", key: "x-prerender-revalidate" }] }, { src: "^/500$", status: 500, continue: true }, { src: "^/?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/index.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }, { src: "^/((?!.+\\.rsc).+?)(?:/)?$", has: [{ type: "header", key: "rsc", value: "1" }], dest: "/$1.rsc", headers: { vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" }, continue: true, override: true }], filesystem: [{ src: "^/index(\\.action|\\.rsc)$", dest: "/", continue: true }, { src: "^/_next/data/(.*)$", dest: "/_next/data/$1", check: true }, { src: "^/\\.prefetch\\.rsc$", dest: "/__index.prefetch.rsc", check: true }, { src: "^/(.+)/\\.prefetch\\.rsc$", dest: "/$1.prefetch.rsc", check: true }, { src: "^/\\.rsc$", dest: "/index.rsc", check: true }, { src: "^/(.+)/\\.rsc$", dest: "/$1.rsc", check: true }], miss: [{ src: "^/_next/static/.+$", status: 404, check: true, dest: "/_next/static/not-found.txt", headers: { "content-type": "text/plain; charset=utf-8" } }], rewrite: [{ src: "^/_next/data/(.*)$", dest: "/404", status: 404 }, { src: "^/blog/(?<nxtPslug>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/blog/[slug].rsc?nxtPslug=$nxtPslug" }, { src: "^/blog/(?<nxtPslug>[^/]+?)(?:/)?$", dest: "/blog/[slug]?nxtPslug=$nxtPslug" }, { src: "^/changelog/(?<nxtPslug>[^/]+?)(?:\\.rsc)(?:/)?$", dest: "/changelog/[slug].rsc?nxtPslug=$nxtPslug" }, { src: "^/changelog/(?<nxtPslug>[^/]+?)(?:/)?$", dest: "/changelog/[slug]?nxtPslug=$nxtPslug" }, { src: "^/docs(?:/(?<nxtPslug>.+?))?(?:\\.rsc)(?:/)?$", dest: "/docs/[[...slug]].rsc?nxtPslug=$nxtPslug" }, { src: "^/docs(?:/(?<nxtPslug>.+?))?(?:/)?$", dest: "/docs/[[...slug]]?nxtPslug=$nxtPslug" }], resource: [{ src: "^/.*$", status: 404 }], hit: [{ src: "^/_next/static/(?:[^/]+/pages|pages|chunks|runtime|css|image|media|lhh\\-g73nikyvhXGC5PCk7)/.+$", headers: { "cache-control": "public,max-age=31536000,immutable" }, continue: true, important: true }, { src: "^/index(?:/)?$", headers: { "x-matched-path": "/" }, continue: true, important: true }, { src: "^/((?!index$).*?)(?:/)?$", headers: { "x-matched-path": "/$1" }, continue: true, important: true }], error: [{ src: "^/.*$", dest: "/404", status: 404, headers: { "x-next-error-status": "404" } }, { src: "^/.*$", dest: "/500", status: 500, headers: { "x-next-error-status": "500" } }] }, images: { domains: [], sizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840, 16, 32, 48, 64, 96, 128, 256, 384], remotePatterns: [], minimumCacheTTL: 60, formats: ["image/webp"], dangerouslyAllowSVG: false, contentSecurityPolicy: "script-src 'none'; frame-src 'none'; sandbox;", contentDispositionType: "inline" }, overrides: { "404.html": { path: "404", contentType: "text/html; charset=utf-8" }, "500.html": { path: "500", contentType: "text/html; charset=utf-8" }, "_app.rsc.json": { path: "_app.rsc", contentType: "application/json" }, "_error.rsc.json": { path: "_error.rsc", contentType: "application/json" }, "_document.rsc.json": { path: "_document.rsc", contentType: "application/json" }, "404.rsc.json": { path: "404.rsc", contentType: "application/json" }, "_next/static/not-found.txt": { contentType: "text/plain" } }, framework: { slug: "nextjs", version: "14.2.5" }, crons: [] };
});
var _;
var h = M(() => {
  _ = { "/404.html": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/404.rsc.json": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/500.html": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc.json": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc.json": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc.json": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_next/static/chunks/231-39ba487928325fc9.js": { type: "static" }, "/_next/static/chunks/526-9ea1a71e6298c2fb.js": { type: "static" }, "/_next/static/chunks/app/_not-found/page-f444ca605ac6cf0d.js": { type: "static" }, "/_next/static/chunks/app/about/page-6d70ba9054598bd9.js": { type: "static" }, "/_next/static/chunks/app/blog/[slug]/page-246a6d688f115f74.js": { type: "static" }, "/_next/static/chunks/app/blog/page-58b474c539cd136d.js": { type: "static" }, "/_next/static/chunks/app/changelog/[slug]/page-899292daaf4e3dc7.js": { type: "static" }, "/_next/static/chunks/app/changelog/page-5c279c9fdd06c8cc.js": { type: "static" }, "/_next/static/chunks/app/docs/[[...slug]]/page-076cb8dec1555911.js": { type: "static" }, "/_next/static/chunks/app/layout-b345a6278d5e3a01.js": { type: "static" }, "/_next/static/chunks/app/more/page-3b3d3371acac51a7.js": { type: "static" }, "/_next/static/chunks/app/page-60a39e6a830901c8.js": { type: "static" }, "/_next/static/chunks/app/search/page-4505b5b0190b3101.js": { type: "static" }, "/_next/static/chunks/fd9d1056-dd161187184bf178.js": { type: "static" }, "/_next/static/chunks/framework-f66176bb897dc684.js": { type: "static" }, "/_next/static/chunks/main-9cb7e7eb51af3369.js": { type: "static" }, "/_next/static/chunks/main-app-9f5037b3d4e09dc3.js": { type: "static" }, "/_next/static/chunks/pages/_app-6a626577ffa902a4.js": { type: "static" }, "/_next/static/chunks/pages/_error-1be831200e60c5c0.js": { type: "static" }, "/_next/static/chunks/polyfills-78c92fac7aa8fdd8.js": { type: "static" }, "/_next/static/chunks/webpack-b92be795f7b5b54d.js": { type: "static" }, "/_next/static/css/daeb41ebd2ad4c93.css": { type: "static" }, "/_next/static/lhh-g73nikyvhXGC5PCk7/_buildManifest.js": { type: "static" }, "/_next/static/lhh-g73nikyvhXGC5PCk7/_ssgManifest.js": { type: "static" }, "/_next/static/media/19cfc7226ec3afaa-s.woff2": { type: "static" }, "/_next/static/media/21350d82a1f187e9-s.woff2": { type: "static" }, "/_next/static/media/28a2004cf8372660-s.woff2": { type: "static" }, "/_next/static/media/47f136985ef5b5cb-s.woff2": { type: "static" }, "/_next/static/media/4ead58c4dcc3f285-s.woff2": { type: "static" }, "/_next/static/media/8e9860b6e62d6359-s.woff2": { type: "static" }, "/_next/static/media/ba9851c3c22cd980-s.woff2": { type: "static" }, "/_next/static/media/c5fe6dc8356a8c31-s.woff2": { type: "static" }, "/_next/static/media/df0a9ae256c0569c-s.woff2": { type: "static" }, "/_next/static/media/e4af272ccee01ff0-s.p.woff2": { type: "static" }, "/_next/static/media/eaead17c7dbfcd5d-s.p.woff2": { type: "static" }, "/_next/static/not-found.txt": { type: "static" }, "/pic/IMG_9165.jpeg": { type: "static" }, "/pic/IMG_9166.png": { type: "static" }, "/docs/[[...slug]]": { type: "function", entrypoint: "__next-on-pages-dist__/functions/docs/[[...slug]].func.js" }, "/docs/[[...slug]].rsc": { type: "function", entrypoint: "__next-on-pages-dist__/functions/docs/[[...slug]].func.js" }, "/404": { type: "override", path: "/404.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/500": { type: "override", path: "/500.html", headers: { "content-type": "text/html; charset=utf-8" } }, "/_app.rsc": { type: "override", path: "/_app.rsc.json", headers: { "content-type": "application/json" } }, "/_error.rsc": { type: "override", path: "/_error.rsc.json", headers: { "content-type": "application/json" } }, "/_document.rsc": { type: "override", path: "/_document.rsc.json", headers: { "content-type": "application/json" } }, "/404.rsc": { type: "override", path: "/404.rsc.json", headers: { "content-type": "application/json" } }, "/about.html": { type: "override", path: "/about.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/about": { type: "override", path: "/about.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/about.rsc": { type: "override", path: "/about.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/about/layout,_N_T_/about/page,_N_T_/about", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/blog/2024-mid-year-review.html": { type: "override", path: "/blog/2024-mid-year-review.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/2024-mid-year-review", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/2024-mid-year-review": { type: "override", path: "/blog/2024-mid-year-review.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/2024-mid-year-review", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/2024-mid-year-review.rsc": { type: "override", path: "/blog/2024-mid-year-review.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/2024-mid-year-review", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/blog/about-design-and-minimalism.html": { type: "override", path: "/blog/about-design-and-minimalism.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/about-design-and-minimalism", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/about-design-and-minimalism": { type: "override", path: "/blog/about-design-and-minimalism.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/about-design-and-minimalism", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/about-design-and-minimalism.rsc": { type: "override", path: "/blog/about-design-and-minimalism.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/about-design-and-minimalism", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/blog/hello-world.html": { type: "override", path: "/blog/hello-world.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/hello-world", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/hello-world": { type: "override", path: "/blog/hello-world.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/hello-world", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog/hello-world.rsc": { type: "override", path: "/blog/hello-world.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/[slug]/layout,_N_T_/blog/[slug]/page,_N_T_/blog/hello-world", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/blog.html": { type: "override", path: "/blog.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/page,_N_T_/blog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog": { type: "override", path: "/blog.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/page,_N_T_/blog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/blog.rsc": { type: "override", path: "/blog.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/blog/layout,_N_T_/blog/page,_N_T_/blog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/changelog/site-launched.html": { type: "override", path: "/changelog/site-launched.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/[slug]/layout,_N_T_/changelog/[slug]/page,_N_T_/changelog/site-launched", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/changelog/site-launched": { type: "override", path: "/changelog/site-launched.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/[slug]/layout,_N_T_/changelog/[slug]/page,_N_T_/changelog/site-launched", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/changelog/site-launched.rsc": { type: "override", path: "/changelog/site-launched.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/[slug]/layout,_N_T_/changelog/[slug]/page,_N_T_/changelog/site-launched", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/changelog.html": { type: "override", path: "/changelog.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/page,_N_T_/changelog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/changelog": { type: "override", path: "/changelog.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/page,_N_T_/changelog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/changelog.rsc": { type: "override", path: "/changelog.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/changelog/layout,_N_T_/changelog/page,_N_T_/changelog", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/index.html": { type: "override", path: "/index.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/index": { type: "override", path: "/index.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/": { type: "override", path: "/index.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/index.rsc": { type: "override", path: "/index.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/page,_N_T_/", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/more.html": { type: "override", path: "/more.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/more/layout,_N_T_/more/page,_N_T_/more", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/more": { type: "override", path: "/more.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/more/layout,_N_T_/more/page,_N_T_/more", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/more.rsc": { type: "override", path: "/more.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/more/layout,_N_T_/more/page,_N_T_/more", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } }, "/search.html": { type: "override", path: "/search.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/search/layout,_N_T_/search/page,_N_T_/search", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/search": { type: "override", path: "/search.html", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/search/layout,_N_T_/search/page,_N_T_/search", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch" } }, "/search.rsc": { type: "override", path: "/search.rsc", headers: { "x-next-cache-tags": "_N_T_/layout,_N_T_/search/layout,_N_T_/search/page,_N_T_/search", vary: "RSC, Next-Router-State-Tree, Next-Router-Prefetch", "content-type": "text/x-component" } } };
});
var q = V((ze, F) => {
  "use strict";
  l();
  u();
  h();
  function R(e, t) {
    e = String(e || "").trim();
    let s = e, a, n = "";
    if (/^[^a-zA-Z\\\s]/.test(e)) {
      a = e[0];
      let i = e.lastIndexOf(a);
      n += e.substring(i + 1), e = e.substring(1, i);
    }
    let r = 0;
    return e = he(e, (i) => {
      if (/^\(\?[P<']/.test(i)) {
        let c = /^\(\?P?[<']([^>']+)[>']/.exec(i);
        if (!c) throw new Error(`Failed to extract named captures from ${JSON.stringify(i)}`);
        let d = i.substring(c[0].length, i.length - 1);
        return t && (t[r] = c[1]), r++, `(${d})`;
      }
      return i.substring(0, 3) === "(?:" || r++, i;
    }), e = e.replace(/\[:([^:]+):\]/g, (i, c) => R.characterClasses[c] || i), new R.PCRE(e, n, s, n, a);
  }
  __name(R, "R");
  __name2(R, "R");
  function he(e, t) {
    let s = 0, a = 0, n = false;
    for (let o = 0; o < e.length; o++) {
      let r = e[o];
      if (n) {
        n = false;
        continue;
      }
      switch (r) {
        case "(":
          a === 0 && (s = o), a++;
          break;
        case ")":
          if (a > 0 && (a--, a === 0)) {
            let i = o + 1, c = s === 0 ? "" : e.substring(0, s), d = e.substring(i), p = String(t(e.substring(s, i)));
            e = c + p + d, o = s;
          }
          break;
        case "\\":
          n = true;
          break;
        default:
          break;
      }
    }
    return e;
  }
  __name(he, "he");
  __name2(he, "he");
  (function(e) {
    class t extends RegExp {
      static {
        __name(this, "t");
      }
      static {
        __name2(this, "t");
      }
      constructor(a, n, o, r, i) {
        super(a, n), this.pcrePattern = o, this.pcreFlags = r, this.delimiter = i;
      }
    }
    e.PCRE = t, e.characterClasses = { alnum: "[A-Za-z0-9]", word: "[A-Za-z0-9_]", alpha: "[A-Za-z]", blank: "[ \\t]", cntrl: "[\\x00-\\x1F\\x7F]", digit: "\\d", graph: "[\\x21-\\x7E]", lower: "[a-z]", print: "[\\x20-\\x7E]", punct: "[\\]\\[!\"#$%&'()*+,./:;<=>?@\\\\^_`{|}~-]", space: "\\s", upper: "[A-Z]", xdigit: "[A-Fa-f0-9]" };
  })(R || (R = {}));
  R.prototype = R.PCRE.prototype;
  F.exports = R;
});
var Q = V((H) => {
  "use strict";
  l();
  u();
  h();
  H.parse = Te;
  H.serialize = we;
  var Ne = Object.prototype.toString, k = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
  function Te(e, t) {
    if (typeof e != "string") throw new TypeError("argument str must be a string");
    for (var s = {}, a = t || {}, n = a.decode || ve, o = 0; o < e.length; ) {
      var r = e.indexOf("=", o);
      if (r === -1) break;
      var i = e.indexOf(";", o);
      if (i === -1) i = e.length;
      else if (i < r) {
        o = e.lastIndexOf(";", r - 1) + 1;
        continue;
      }
      var c = e.slice(o, r).trim();
      if (s[c] === void 0) {
        var d = e.slice(r + 1, i).trim();
        d.charCodeAt(0) === 34 && (d = d.slice(1, -1)), s[c] = Ce(d, n);
      }
      o = i + 1;
    }
    return s;
  }
  __name(Te, "Te");
  __name2(Te, "Te");
  function we(e, t, s) {
    var a = s || {}, n = a.encode || Pe;
    if (typeof n != "function") throw new TypeError("option encode is invalid");
    if (!k.test(e)) throw new TypeError("argument name is invalid");
    var o = n(t);
    if (o && !k.test(o)) throw new TypeError("argument val is invalid");
    var r = e + "=" + o;
    if (a.maxAge != null) {
      var i = a.maxAge - 0;
      if (isNaN(i) || !isFinite(i)) throw new TypeError("option maxAge is invalid");
      r += "; Max-Age=" + Math.floor(i);
    }
    if (a.domain) {
      if (!k.test(a.domain)) throw new TypeError("option domain is invalid");
      r += "; Domain=" + a.domain;
    }
    if (a.path) {
      if (!k.test(a.path)) throw new TypeError("option path is invalid");
      r += "; Path=" + a.path;
    }
    if (a.expires) {
      var c = a.expires;
      if (!Se(c) || isNaN(c.valueOf())) throw new TypeError("option expires is invalid");
      r += "; Expires=" + c.toUTCString();
    }
    if (a.httpOnly && (r += "; HttpOnly"), a.secure && (r += "; Secure"), a.priority) {
      var d = typeof a.priority == "string" ? a.priority.toLowerCase() : a.priority;
      switch (d) {
        case "low":
          r += "; Priority=Low";
          break;
        case "medium":
          r += "; Priority=Medium";
          break;
        case "high":
          r += "; Priority=High";
          break;
        default:
          throw new TypeError("option priority is invalid");
      }
    }
    if (a.sameSite) {
      var p = typeof a.sameSite == "string" ? a.sameSite.toLowerCase() : a.sameSite;
      switch (p) {
        case true:
          r += "; SameSite=Strict";
          break;
        case "lax":
          r += "; SameSite=Lax";
          break;
        case "strict":
          r += "; SameSite=Strict";
          break;
        case "none":
          r += "; SameSite=None";
          break;
        default:
          throw new TypeError("option sameSite is invalid");
      }
    }
    return r;
  }
  __name(we, "we");
  __name2(we, "we");
  function ve(e) {
    return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
  }
  __name(ve, "ve");
  __name2(ve, "ve");
  function Pe(e) {
    return encodeURIComponent(e);
  }
  __name(Pe, "Pe");
  __name2(Pe, "Pe");
  function Se(e) {
    return Ne.call(e) === "[object Date]" || e instanceof Date;
  }
  __name(Se, "Se");
  __name2(Se, "Se");
  function Ce(e, t) {
    try {
      return t(e);
    } catch {
      return e;
    }
  }
  __name(Ce, "Ce");
  __name2(Ce, "Ce");
});
l();
u();
h();
l();
u();
h();
l();
u();
h();
var N = "INTERNAL_SUSPENSE_CACHE_HOSTNAME.local";
l();
u();
h();
l();
u();
h();
l();
u();
h();
l();
u();
h();
var D = $(q());
function P(e, t, s) {
  if (t == null) return { match: null, captureGroupKeys: [] };
  let a = s ? "" : "i", n = [];
  return { match: (0, D.default)(`%${e}%${a}`, n).exec(t), captureGroupKeys: n };
}
__name(P, "P");
__name2(P, "P");
function T(e, t, s, { namedOnly: a } = {}) {
  return e.replace(/\$([a-zA-Z0-9_]+)/g, (n, o) => {
    let r = s.indexOf(o);
    return a && r === -1 ? n : (r === -1 ? t[parseInt(o, 10)] : t[r + 1]) || "";
  });
}
__name(T, "T");
__name2(T, "T");
function A(e, { url: t, cookies: s, headers: a, routeDest: n }) {
  switch (e.type) {
    case "host":
      return { valid: t.hostname === e.value };
    case "header":
      return e.value !== void 0 ? I(e.value, a.get(e.key), n) : { valid: a.has(e.key) };
    case "cookie": {
      let o = s[e.key];
      return o && e.value !== void 0 ? I(e.value, o, n) : { valid: o !== void 0 };
    }
    case "query":
      return e.value !== void 0 ? I(e.value, t.searchParams.get(e.key), n) : { valid: t.searchParams.has(e.key) };
  }
}
__name(A, "A");
__name2(A, "A");
function I(e, t, s) {
  let { match: a, captureGroupKeys: n } = P(e, t);
  return s && a && n.length ? { valid: !!a, newRouteDest: T(s, a, n, { namedOnly: true }) } : { valid: !!a };
}
__name(I, "I");
__name2(I, "I");
l();
u();
h();
function B(e) {
  let t = new Headers(e.headers);
  return e.cf && (t.set("x-vercel-ip-city", encodeURIComponent(e.cf.city)), t.set("x-vercel-ip-country", e.cf.country), t.set("x-vercel-ip-country-region", e.cf.regionCode), t.set("x-vercel-ip-latitude", e.cf.latitude), t.set("x-vercel-ip-longitude", e.cf.longitude)), t.set("x-vercel-sc-host", N), new Request(e, { headers: t });
}
__name(B, "B");
__name2(B, "B");
l();
u();
h();
function y(e, t, s) {
  let a = t instanceof Headers ? t.entries() : Object.entries(t);
  for (let [n, o] of a) {
    let r = n.toLowerCase(), i = s?.match ? T(o, s.match, s.captureGroupKeys) : o;
    r === "set-cookie" ? e.append(r, i) : e.set(r, i);
  }
}
__name(y, "y");
__name2(y, "y");
function w(e) {
  return /^https?:\/\//.test(e);
}
__name(w, "w");
__name2(w, "w");
function x(e, t) {
  for (let [s, a] of t.entries()) {
    let n = /^nxtP(.+)$/.exec(s), o = /^nxtI(.+)$/.exec(s);
    n?.[1] ? (e.set(s, a), e.set(n[1], a)) : o?.[1] ? e.set(o[1], a.replace(/(\(\.+\))+/, "")) : (!e.has(s) || !!a && !e.getAll(s).includes(a)) && e.append(s, a);
  }
}
__name(x, "x");
__name2(x, "x");
function L(e, t) {
  let s = new URL(t, e.url);
  return x(s.searchParams, new URL(e.url).searchParams), s.pathname = s.pathname.replace(/\/index.html$/, "/").replace(/\.html$/, ""), new Request(s, e);
}
__name(L, "L");
__name2(L, "L");
function v(e) {
  return new Response(e.body, e);
}
__name(v, "v");
__name2(v, "v");
function j(e) {
  return e.split(",").map((t) => {
    let [s, a] = t.split(";"), n = parseFloat((a ?? "q=1").replace(/q *= */gi, ""));
    return [s.trim(), isNaN(n) ? 1 : n];
  }).sort((t, s) => s[1] - t[1]).map(([t]) => t === "*" || t === "" ? [] : t).flat();
}
__name(j, "j");
__name2(j, "j");
l();
u();
h();
function O(e) {
  switch (e) {
    case "none":
      return "filesystem";
    case "filesystem":
      return "rewrite";
    case "rewrite":
      return "resource";
    case "resource":
      return "miss";
    default:
      return "miss";
  }
}
__name(O, "O");
__name2(O, "O");
async function S(e, { request: t, assetsFetcher: s, ctx: a }, { path: n, searchParams: o }) {
  let r, i = new URL(t.url);
  x(i.searchParams, o);
  let c = new Request(i, t);
  try {
    switch (e?.type) {
      case "function":
      case "middleware": {
        let d = await import(e.entrypoint);
        try {
          r = await d.default(c, a);
        } catch (p) {
          let m = p;
          throw m.name === "TypeError" && m.message.endsWith("default is not a function") ? new Error(`An error occurred while evaluating the target edge function (${e.entrypoint})`) : p;
        }
        break;
      }
      case "override": {
        r = v(await s.fetch(L(c, e.path ?? n))), e.headers && y(r.headers, e.headers);
        break;
      }
      case "static": {
        r = await s.fetch(L(c, n));
        break;
      }
      default:
        r = new Response("Not Found", { status: 404 });
    }
  } catch (d) {
    return console.error(d), new Response("Internal Server Error", { status: 500 });
  }
  return v(r);
}
__name(S, "S");
__name2(S, "S");
function G(e, t) {
  let s = "^//?(?:", a = ")/(.*)$";
  return !e.startsWith(s) || !e.endsWith(a) ? false : e.slice(s.length, -a.length).split("|").every((o) => t.has(o));
}
__name(G, "G");
__name2(G, "G");
l();
u();
h();
function de(e, { protocol: t, hostname: s, port: a, pathname: n }) {
  return !(t && e.protocol.replace(/:$/, "") !== t || !new RegExp(s).test(e.hostname) || a && !new RegExp(a).test(e.port) || n && !new RegExp(n).test(e.pathname));
}
__name(de, "de");
__name2(de, "de");
function pe(e, t) {
  if (e.method !== "GET") return;
  let { origin: s, searchParams: a } = new URL(e.url), n = a.get("url"), o = Number.parseInt(a.get("w") ?? "", 10), r = Number.parseInt(a.get("q") ?? "75", 10);
  if (!n || Number.isNaN(o) || Number.isNaN(r) || !t?.sizes?.includes(o) || r < 0 || r > 100) return;
  let i = new URL(n, s);
  if (i.pathname.endsWith(".svg") && !t?.dangerouslyAllowSVG) return;
  let c = n.startsWith("//"), d = n.startsWith("/") && !c;
  if (!d && !t?.domains?.includes(i.hostname) && !t?.remotePatterns?.find((b) => de(i, b))) return;
  let p = e.headers.get("Accept") ?? "", m = t?.formats?.find((b) => p.includes(b))?.replace("image/", "");
  return { isRelative: d, imageUrl: i, options: { width: o, quality: r, format: m } };
}
__name(pe, "pe");
__name2(pe, "pe");
function ge(e, t, s) {
  let a = new Headers();
  if (s?.contentSecurityPolicy && a.set("Content-Security-Policy", s.contentSecurityPolicy), s?.contentDispositionType) {
    let o = t.pathname.split("/").pop(), r = o ? `${s.contentDispositionType}; filename="${o}"` : s.contentDispositionType;
    a.set("Content-Disposition", r);
  }
  e.headers.has("Cache-Control") || a.set("Cache-Control", `public, max-age=${s?.minimumCacheTTL ?? 60}`);
  let n = v(e);
  return y(n.headers, a), n;
}
__name(ge, "ge");
__name2(ge, "ge");
async function K(e, { buildOutput: t, assetsFetcher: s, imagesConfig: a }) {
  let n = pe(e, a);
  if (!n) return new Response("Invalid image resizing request", { status: 400 });
  let { isRelative: o, imageUrl: r } = n, c = await (o && r.pathname in t ? s.fetch.bind(s) : fetch)(r);
  return ge(c, r, a);
}
__name(K, "K");
__name2(K, "K");
l();
u();
h();
l();
u();
h();
l();
u();
h();
async function C(e) {
  return import(e);
}
__name(C, "C");
__name2(C, "C");
var _e = "x-vercel-cache-tags";
var fe = "x-next-cache-soft-tags";
var me = /* @__PURE__ */ Symbol.for("__cloudflare-request-context__");
async function J(e) {
  let t = `https://${N}/v1/suspense-cache/`;
  if (!e.url.startsWith(t)) return null;
  try {
    let s = new URL(e.url), a = await ye();
    if (s.pathname === "/v1/suspense-cache/revalidate") {
      let o = s.searchParams.get("tags")?.split(",") ?? [];
      for (let r of o) await a.revalidateTag(r);
      return new Response(null, { status: 200 });
    }
    let n = s.pathname.replace("/v1/suspense-cache/", "");
    if (!n.length) return new Response("Invalid cache key", { status: 400 });
    switch (e.method) {
      case "GET": {
        let o = z(e, fe), r = await a.get(n, { softTags: o });
        return r ? new Response(JSON.stringify(r.value), { status: 200, headers: { "Content-Type": "application/json", "x-vercel-cache-state": "fresh", age: `${(Date.now() - (r.lastModified ?? Date.now())) / 1e3}` } }) : new Response(null, { status: 404 });
      }
      case "POST": {
        let o = globalThis[me], r = /* @__PURE__ */ __name2(async () => {
          let i = await e.json();
          i.data.tags === void 0 && (i.tags ??= z(e, _e) ?? []), await a.set(n, i);
        }, "r");
        return o ? o.ctx.waitUntil(r()) : await r(), new Response(null, { status: 200 });
      }
      default:
        return new Response(null, { status: 405 });
    }
  } catch (s) {
    return console.error(s), new Response("Error handling cache request", { status: 500 });
  }
}
__name(J, "J");
__name2(J, "J");
async function ye() {
  return process.env.__NEXT_ON_PAGES__KV_SUSPENSE_CACHE ? W("kv") : W("cache-api");
}
__name(ye, "ye");
__name2(ye, "ye");
async function W(e) {
  let t = `./__next-on-pages-dist__/cache/${e}.js`, s = await C(t);
  return new s.default();
}
__name(W, "W");
__name2(W, "W");
function z(e, t) {
  return e.headers.get(t)?.split(",")?.filter(Boolean);
}
__name(z, "z");
__name2(z, "z");
function Z() {
  globalThis[X] || (xe(), globalThis[X] = true);
}
__name(Z, "Z");
__name2(Z, "Z");
function xe() {
  let e = globalThis.fetch;
  globalThis.fetch = async (...t) => {
    let s = new Request(...t), a = await Re(s);
    return a || (a = await J(s), a) ? a : (be(s), e(s));
  };
}
__name(xe, "xe");
__name2(xe, "xe");
async function Re(e) {
  if (e.url.startsWith("blob:")) try {
    let s = `./__next-on-pages-dist__/assets/${new URL(e.url).pathname}.bin`, a = (await C(s)).default, n = { async arrayBuffer() {
      return a;
    }, get body() {
      return new ReadableStream({ start(o) {
        let r = Buffer.from(a);
        o.enqueue(r), o.close();
      } });
    }, async text() {
      return Buffer.from(a).toString();
    }, async json() {
      let o = Buffer.from(a);
      return JSON.stringify(o.toString());
    }, async blob() {
      return new Blob(a);
    } };
    return n.clone = () => ({ ...n }), n;
  } catch {
  }
  return null;
}
__name(Re, "Re");
__name2(Re, "Re");
function be(e) {
  e.headers.has("user-agent") || e.headers.set("user-agent", "Next.js Middleware");
}
__name(be, "be");
__name2(be, "be");
var X = /* @__PURE__ */ Symbol.for("next-on-pages fetch patch");
l();
u();
h();
var Y = $(Q());
var E = class {
  static {
    __name(this, "E");
  }
  static {
    __name2(this, "E");
  }
  constructor(t, s, a, n, o) {
    this.routes = t;
    this.output = s;
    this.reqCtx = a;
    this.url = new URL(a.request.url), this.cookies = (0, Y.parse)(a.request.headers.get("cookie") || ""), this.path = this.url.pathname || "/", this.headers = { normal: new Headers(), important: new Headers() }, this.searchParams = new URLSearchParams(), x(this.searchParams, this.url.searchParams), this.checkPhaseCounter = 0, this.middlewareInvoked = [], this.wildcardMatch = o?.find((r) => r.domain === this.url.hostname), this.locales = new Set(n.collectedLocales);
  }
  url;
  cookies;
  wildcardMatch;
  path;
  status;
  headers;
  searchParams;
  body;
  checkPhaseCounter;
  middlewareInvoked;
  locales;
  checkRouteMatch(t, { checkStatus: s, checkIntercept: a }) {
    let n = P(t.src, this.path, t.caseSensitive);
    if (!n.match || t.methods && !t.methods.map((r) => r.toUpperCase()).includes(this.reqCtx.request.method.toUpperCase())) return;
    let o = { url: this.url, cookies: this.cookies, headers: this.reqCtx.request.headers, routeDest: t.dest };
    if (!t.has?.find((r) => {
      let i = A(r, o);
      return i.newRouteDest && (o.routeDest = i.newRouteDest), !i.valid;
    }) && !t.missing?.find((r) => A(r, o).valid) && !(s && t.status !== this.status)) {
      if (a && t.dest) {
        let r = /\/(\(\.+\))+/, i = r.test(t.dest), c = r.test(this.path);
        if (i && !c) return;
      }
      return { routeMatch: n, routeDest: o.routeDest };
    }
  }
  processMiddlewareResp(t) {
    let s = "x-middleware-override-headers", a = t.headers.get(s);
    if (a) {
      let c = new Set(a.split(",").map((d) => d.trim()));
      for (let d of c.keys()) {
        let p = `x-middleware-request-${d}`, m = t.headers.get(p);
        this.reqCtx.request.headers.get(d) !== m && (m ? this.reqCtx.request.headers.set(d, m) : this.reqCtx.request.headers.delete(d)), t.headers.delete(p);
      }
      t.headers.delete(s);
    }
    let n = "x-middleware-rewrite", o = t.headers.get(n);
    if (o) {
      let c = new URL(o, this.url), d = this.url.hostname !== c.hostname;
      this.path = d ? `${c}` : c.pathname, x(this.searchParams, c.searchParams), t.headers.delete(n);
    }
    let r = "x-middleware-next";
    t.headers.get(r) ? t.headers.delete(r) : !o && !t.headers.has("location") ? (this.body = t.body, this.status = t.status) : t.headers.has("location") && t.status >= 300 && t.status < 400 && (this.status = t.status), y(this.reqCtx.request.headers, t.headers), y(this.headers.normal, t.headers), this.headers.middlewareLocation = t.headers.get("location");
  }
  async runRouteMiddleware(t) {
    if (!t) return true;
    let s = t && this.output[t];
    if (!s || s.type !== "middleware") return this.status = 500, false;
    let a = await S(s, this.reqCtx, { path: this.path, searchParams: this.searchParams, headers: this.headers, status: this.status });
    return this.middlewareInvoked.push(t), a.status === 500 ? (this.status = a.status, false) : (this.processMiddlewareResp(a), true);
  }
  applyRouteOverrides(t) {
    !t.override || (this.status = void 0, this.headers.normal = new Headers(), this.headers.important = new Headers());
  }
  applyRouteHeaders(t, s, a) {
    !t.headers || (y(this.headers.normal, t.headers, { match: s, captureGroupKeys: a }), t.important && y(this.headers.important, t.headers, { match: s, captureGroupKeys: a }));
  }
  applyRouteStatus(t) {
    !t.status || (this.status = t.status);
  }
  applyRouteDest(t, s, a) {
    if (!t.dest) return this.path;
    let n = this.path, o = t.dest;
    this.wildcardMatch && /\$wildcard/.test(o) && (o = o.replace(/\$wildcard/g, this.wildcardMatch.value)), this.path = T(o, s, a);
    let r = /\/index\.rsc$/i.test(this.path), i = /^\/(?:index)?$/i.test(n), c = /^\/__index\.prefetch\.rsc$/i.test(n);
    r && !i && !c && (this.path = n);
    let d = /\.rsc$/i.test(this.path), p = /\.prefetch\.rsc$/i.test(this.path), m = this.path in this.output;
    d && !p && !m && (this.path = this.path.replace(/\.rsc/i, ""));
    let b = new URL(this.path, this.url);
    return x(this.searchParams, b.searchParams), w(this.path) || (this.path = b.pathname), n;
  }
  applyLocaleRedirects(t) {
    if (!t.locale?.redirect || !/^\^(.)*$/.test(t.src) && t.src !== this.path || this.headers.normal.has("location")) return;
    let { locale: { redirect: a, cookie: n } } = t, o = n && this.cookies[n], r = j(o ?? ""), i = j(this.reqCtx.request.headers.get("accept-language") ?? ""), p = [...r, ...i].map((m) => a[m]).filter(Boolean)[0];
    if (p) {
      !this.path.startsWith(p) && (this.headers.normal.set("location", p), this.status = 307);
      return;
    }
  }
  getLocaleFriendlyRoute(t, s) {
    return !this.locales || s !== "miss" ? t : G(t.src, this.locales) ? { ...t, src: t.src.replace(/\/\(\.\*\)\$$/, "(?:/(.*))?$") } : t;
  }
  async checkRoute(t, s) {
    let a = this.getLocaleFriendlyRoute(s, t), { routeMatch: n, routeDest: o } = this.checkRouteMatch(a, { checkStatus: t === "error", checkIntercept: t === "rewrite" }) ?? {}, r = { ...a, dest: o };
    if (!n?.match || r.middlewarePath && this.middlewareInvoked.includes(r.middlewarePath)) return "skip";
    let { match: i, captureGroupKeys: c } = n;
    if (this.applyRouteOverrides(r), this.applyLocaleRedirects(r), !await this.runRouteMiddleware(r.middlewarePath)) return "error";
    if (this.body !== void 0 || this.headers.middlewareLocation) return "done";
    this.applyRouteHeaders(r, i, c), this.applyRouteStatus(r);
    let p = this.applyRouteDest(r, i, c);
    if (r.check && !w(this.path)) if (p === this.path) {
      if (t !== "miss") return this.checkPhase(O(t));
      this.status = 404;
    } else if (t === "miss") {
      if (!(this.path in this.output) && !(this.path.replace(/\/$/, "") in this.output)) return this.checkPhase("filesystem");
      this.status === 404 && (this.status = void 0);
    } else return this.checkPhase("none");
    return !r.continue || r.status && r.status >= 300 && r.status <= 399 ? "done" : "next";
  }
  async checkPhase(t) {
    if (this.checkPhaseCounter++ >= 50) return console.error(`Routing encountered an infinite loop while checking ${this.url.pathname}`), this.status = 500, "error";
    this.middlewareInvoked = [];
    let s = true;
    for (let o of this.routes[t]) {
      let r = await this.checkRoute(t, o);
      if (r === "error") return "error";
      if (r === "done") {
        s = false;
        break;
      }
    }
    if (t === "hit" || w(this.path) || this.headers.normal.has("location") || !!this.body) return "done";
    if (t === "none") for (let o of this.locales) {
      let r = new RegExp(`/${o}(/.*)`), c = this.path.match(r)?.[1];
      if (c && c in this.output) {
        this.path = c;
        break;
      }
    }
    let a = this.path in this.output;
    if (!a && this.path.endsWith("/")) {
      let o = this.path.replace(/\/$/, "");
      a = o in this.output, a && (this.path = o);
    }
    if (t === "miss" && !a) {
      let o = !this.status || this.status < 400;
      this.status = o ? 404 : this.status;
    }
    let n = "miss";
    return a || t === "miss" || t === "error" ? n = "hit" : s && (n = O(t)), this.checkPhase(n);
  }
  async run(t = "none") {
    this.checkPhaseCounter = 0;
    let s = await this.checkPhase(t);
    return this.headers.normal.has("location") && (!this.status || this.status < 300 || this.status >= 400) && (this.status = 307), s;
  }
};
async function ee(e, t, s, a) {
  let n = new E(t.routes, s, e, a, t.wildcard), o = await te(n);
  return ke(e, o, s);
}
__name(ee, "ee");
__name2(ee, "ee");
async function te(e, t = "none", s = false) {
  return await e.run(t) === "error" || !s && e.status && e.status >= 400 ? te(e, "error", true) : { path: e.path, status: e.status, headers: e.headers, searchParams: e.searchParams, body: e.body };
}
__name(te, "te");
__name2(te, "te");
async function ke(e, { path: t = "/404", status: s, headers: a, searchParams: n, body: o }, r) {
  let i = a.normal.get("location");
  if (i) {
    if (i !== a.middlewareLocation) {
      let p = [...n.keys()].length ? `?${n.toString()}` : "";
      a.normal.set("location", `${i ?? "/"}${p}`);
    }
    return new Response(null, { status: s, headers: a.normal });
  }
  let c;
  if (o !== void 0) c = new Response(o, { status: s });
  else if (w(t)) {
    let p = new URL(t);
    x(p.searchParams, n), c = await fetch(p, e.request);
  } else c = await S(r[t], e, { path: t, status: s, headers: a, searchParams: n });
  let d = a.normal;
  return y(d, c.headers), y(d, a.important), c = new Response(c.body, { ...c, status: s || c.status, headers: d }), c;
}
__name(ke, "ke");
__name2(ke, "ke");
l();
u();
h();
function ae() {
  globalThis.__nextOnPagesRoutesIsolation ??= { _map: /* @__PURE__ */ new Map(), getProxyFor: Ee };
}
__name(ae, "ae");
__name2(ae, "ae");
function Ee(e) {
  let t = globalThis.__nextOnPagesRoutesIsolation._map.get(e);
  if (t) return t;
  let s = Me();
  return globalThis.__nextOnPagesRoutesIsolation._map.set(e, s), s;
}
__name(Ee, "Ee");
__name2(Ee, "Ee");
function Me() {
  let e = /* @__PURE__ */ new Map();
  return new Proxy(globalThis, { get: /* @__PURE__ */ __name2((t, s) => e.has(s) ? e.get(s) : Reflect.get(globalThis, s), "get"), set: /* @__PURE__ */ __name2((t, s, a) => Ie.has(s) ? Reflect.set(globalThis, s, a) : (e.set(s, a), true), "set") });
}
__name(Me, "Me");
__name2(Me, "Me");
var Ie = /* @__PURE__ */ new Set(["_nextOriginalFetch", "fetch", "__incrementalCache"]);
var Ae = Object.defineProperty;
var Le = /* @__PURE__ */ __name2((...e) => {
  let t = e[0], s = e[1], a = "__import_unsupported";
  if (!(s === a && typeof t == "object" && t !== null && a in t)) return Ae(...e);
}, "Le");
globalThis.Object.defineProperty = Le;
globalThis.AbortController = class extends AbortController {
  constructor() {
    try {
      super();
    } catch (t) {
      if (t instanceof Error && t.message.includes("Disallowed operation called within global scope")) return { signal: { aborted: false, reason: null, onabort: /* @__PURE__ */ __name2(() => {
      }, "onabort"), throwIfAborted: /* @__PURE__ */ __name2(() => {
      }, "throwIfAborted") }, abort() {
      } };
      throw t;
    }
  }
};
var va = { async fetch(e, t, s) {
  ae(), Z();
  let a = await __ALSes_PROMISE__;
  if (!a) {
    let r = new URL(e.url), i = await t.ASSETS.fetch(`${r.protocol}//${r.host}/cdn-cgi/errors/no-nodejs_compat.html`), c = i.ok ? i.body : "Error: Could not access built-in Node.js modules. Please make sure that your Cloudflare Pages project has the 'nodejs_compat' compatibility flag set.";
    return new Response(c, { status: 503 });
  }
  let { envAsyncLocalStorage: n, requestContextAsyncLocalStorage: o } = a;
  return n.run({ ...t, NODE_ENV: "production", SUSPENSE_CACHE_URL: N }, async () => o.run({ env: t, ctx: s, cf: e.cf }, async () => {
    if (new URL(e.url).pathname.startsWith("/_next/image")) return K(e, { buildOutput: _, assetsFetcher: t.ASSETS, imagesConfig: g.images });
    let i = B(e);
    return ee({ request: i, ctx: s, assetsFetcher: t.ASSETS }, g, _, f);
  }));
} };

// ../root/.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/pages-dev-util.ts
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
__name(isRoutingRuleMatch, "isRoutingRuleMatch");
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}
__name(transformRoutingRuleToRegExp, "transformRoutingRuleToRegExp");

// .wrangler/tmp/pages-FApaFO/pyhbpat8x68.js
var define_ROUTES_default = { version: 1, description: "Built with @cloudflare/next-on-pages@1.13.16.", include: ["/*"], exclude: ["/_next/static/*"] };
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env2, context2) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env2.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = va;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env2, context2);
      }
    }
    return env2.ASSETS.fetch(request);
  }
};

// ../root/.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;

// ../root/.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name(async (request, env2, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env2);
  } catch (e) {
    const error3 = reduceError(e);
    const body = JSON.stringify(error3);
    const headers = {
      "Content-Type": "application/json",
      "MF-Experimental-Error-Stack": "true"
    };
    const encoded = encodeURIComponent(body);
    if (encoded.length <= 8192) {
      headers["MF-Experimental-Error-Stack-Payload"] = encoded;
    }
    return new Response(body, { status: 500, headers });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;

// .wrangler/tmp/bundle-QWQss3/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_dev_pipeline_default;

// ../root/.npm/_npx/32026684e21afda6/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env2, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env2, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env2, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env2, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");

// .wrangler/tmp/bundle-QWQss3/middleware-loader.entry.ts
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env2, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env2, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env2, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env2, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env2, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env2, ctx) => {
      this.env = env2;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default as default
};
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
//# sourceMappingURL=pyhbpat8x68.js.map
