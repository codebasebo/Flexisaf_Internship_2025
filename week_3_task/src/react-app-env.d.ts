/// <reference types="react-scripts" />

// Basic React types
declare namespace React {
  type FC<P = {}> = (props: P) => ReactElement | null;
  
  abstract class Component<P = {}, S = {}> {
    props: P;
    state: S;
    constructor(props: P, context?: any);
    setState(partialState: Partial<S> | ((prevState: S, props: P) => Partial<S>), callback?: () => void): void;
    render(): ReactElement | null;
    componentDidMount?(): void;
    componentDidUpdate?(prevProps: P, prevState: S): void;
    componentWillUnmount?(): void;
  }
  
  interface ReactElement {
    type: any;
    props: any;
    key: string | number | null;
  }
  
  function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prev: S) => S)) => void];
  function useEffect(effect: () => void | (() => void), deps?: any[]): void;
  function createElement(type: any, props?: any, ...children: any[]): ReactElement;
  const Fragment: (props: { children?: any }) => ReactElement;
  const StrictMode: (props: { children?: any }) => ReactElement;
}

declare namespace JSX {
  interface IntrinsicElements {
    div: any;
    h1: any;
    h2: any;
    h3: any;
    p: any;
    button: any;
    span: any;
    input: any;
    [elemName: string]: any;
  }
}

declare module 'react' {
  export = React;
  export as namespace React;
}

declare module 'react-dom' {
  export function render(element: React.ReactElement, container: Element | null): void;
}

declare module 'react-dom/client' {
  interface Root {
    render(children: React.ReactElement): void;
  }
  export function createRoot(container: Element): Root;
}

declare module 'react/jsx-runtime' {
  export function jsx(type: any, props: any, key?: any): React.ReactElement;
  export function jsxs(type: any, props: any, key?: any): React.ReactElement;
  export function Fragment(props: { children?: any }): React.ReactElement;
}