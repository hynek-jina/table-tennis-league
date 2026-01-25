import {
  constFalse,
  constNull,
  constTrue,
  constVoid,
  emptyRows
} from "./chunk-MFTVS33O.js";
import {
  require_jsx_runtime
} from "./chunk-OFNMVIHK.js";
import {
  require_react
} from "./chunk-NDZ77MHB.js";
import {
  __toESM
} from "./chunk-G3PMV62Z.js";

// node_modules/@evolu/react/dist/useEvolu.js
var import_react2 = __toESM(require_react(), 1);

// node_modules/@evolu/react/dist/EvoluContext.js
var import_react = __toESM(require_react(), 1);
var EvoluContext = (0, import_react.createContext)(null);

// node_modules/@evolu/react/dist/useEvolu.js
var useEvolu = () => {
  const evolu = (0, import_react2.useContext)(EvoluContext);
  if (evolu == null) {
    throw new Error("Could not find Evolu context value. Ensure the component is wrapped in an <EvoluProvider>.");
  }
  return evolu;
};

// node_modules/@evolu/react/dist/createUseEvolu.js
var createUseEvolu = (evolu) => useEvolu;

// node_modules/@evolu/react/dist/EvoluProvider.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var EvoluProvider = ({ children, value }) => (0, import_jsx_runtime.jsx)(EvoluContext, { value, children });

// node_modules/@evolu/react/dist/useEvoluError.js
var import_react3 = __toESM(require_react(), 1);
var useEvoluError = () => {
  const evolu = useEvolu();
  return (0, import_react3.useSyncExternalStore)(evolu.subscribeError, evolu.getError, constNull);
};

// node_modules/@evolu/react/dist/useOwner.js
var import_react4 = __toESM(require_react(), 1);
var useOwner = (owner) => {
  const evolu = useEvolu();
  (0, import_react4.useEffect)(() => {
    if (owner == null)
      return;
    return evolu.useOwner(owner);
  }, [evolu, owner]);
};

// node_modules/@evolu/react/dist/useQueries.js
var import_react7 = __toESM(require_react(), 1);

// node_modules/@evolu/react/dist/useQuerySubscription.js
var import_react5 = __toESM(require_react(), 1);
var useQuerySubscription = (query, options = {}) => {
  const evolu = useEvolu();
  const { once } = (0, import_react5.useRef)(options).current;
  if (once) {
    (0, import_react5.useEffect)(
      // No useSyncExternalStore, no unnecessary updates.
      () => evolu.subscribeQuery(query)(constVoid),
      [evolu, query]
    );
    return evolu.getQueryRows(query);
  }
  return (0, import_react5.useSyncExternalStore)((0, import_react5.useMemo)(() => evolu.subscribeQuery(query), [evolu, query]), (0, import_react5.useMemo)(() => () => evolu.getQueryRows(query), [evolu, query]), () => emptyRows);
};

// node_modules/@evolu/react/dist/useIsSsr.js
var import_react6 = __toESM(require_react(), 1);
var emptySubscribe = () => () => {
};
var useIsSsr = () => {
  return (0, import_react6.useSyncExternalStore)(emptySubscribe, constFalse, constTrue);
};

// node_modules/@evolu/react/dist/useQueries.js
var useQueries = (queries, options = {}) => {
  const evolu = useEvolu();
  const once = (0, import_react7.useRef)(options).current.once;
  const allQueries = once ? queries.concat(once) : queries;
  const wasSSR = useIsSsr();
  if (wasSSR) {
    if (!options.promises)
      void evolu.loadQueries(allQueries);
  } else {
    if (options.promises)
      options.promises.map(import_react7.use);
    else
      evolu.loadQueries(allQueries).map(import_react7.use);
  }
  return allQueries.map((query, i) => (
    // Safe until the number of queries is stable.
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuerySubscription(query, { once: i > queries.length - 1 })
  ));
};

// node_modules/@evolu/react/dist/useQuery.js
var import_react8 = __toESM(require_react(), 1);
var useQuery = (query, options = {}) => {
  const evolu = useEvolu();
  const isSSR = useIsSsr();
  if (isSSR) {
    if (!options.promise)
      void evolu.loadQuery(query);
  } else {
    (0, import_react8.use)(options.promise ?? evolu.loadQuery(query));
  }
  return useQuerySubscription(query, options);
};
export {
  EvoluContext,
  EvoluProvider,
  createUseEvolu,
  useEvolu,
  useEvoluError,
  useIsSsr,
  useOwner,
  useQueries,
  useQuery,
  useQuerySubscription
};
//# sourceMappingURL=@evolu_react.js.map
