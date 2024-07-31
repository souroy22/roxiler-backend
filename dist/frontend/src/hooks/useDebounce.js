"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useDebounce;
const react_1 = require("react");
function useDebounce(func, delay = 1000) {
    const timer = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        return () => {
            if (!timer.current)
                return;
            clearTimeout(timer.current);
        };
    }, []);
    const debouncedFunction = ((...args) => {
        const newTimer = setTimeout(() => {
            func(...args);
        }, delay);
        clearTimeout(timer.current);
        timer.current = newTimer;
    });
    return debouncedFunction;
}
//# sourceMappingURL=useDebounce.js.map