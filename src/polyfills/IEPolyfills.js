import { IntersectionObserverPolyFill } from './IntersectionObserverPolyfill';
import { ArrayFindPolyfill } from './ArrayFindPolyfill';

const IEPolyfills = () => {
    IntersectionObserverPolyFill();
    ArrayFindPolyfill();
}

export { IEPolyfills };
