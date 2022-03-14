"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.route = exports.RouteMap = void 0;
/* eslint-disable quote-props */
exports.RouteMap = {
    'status.show': '/status/:id',
    'dashboards.index': '/dashboards',
    'dashboards.show': '/dashboards/:id',
    'dashboards.default': '/dashboards/default',
    'client': '/client',
};
class Route {
    // eslint-disable-next-line no-useless-constructor
    constructor(name, params) {
        Object.defineProperty(this, "name", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: name
        });
        Object.defineProperty(this, "params", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: params
        });
        // Typically, this would live in some kind of config area
        Object.defineProperty(this, "hostName", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'localhost'
        });
        Object.defineProperty(this, "protocol", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: 'http'
        });
    }
    get relative() {
        const path = exports.RouteMap[this.name];
        if (typeof path === 'string') {
            return path;
        }
        throw new Error(`${this.name} is not a valid route`);
    }
    get parsed() {
        // grabs "bar" from /foo/:bar
        const regexp = /:(?<param>[a-z-_.]+)*/g;
        return Array.from(this.relative.matchAll(regexp))
            .map((match) => {
            var _a;
            const param = (_a = match.groups) === null || _a === void 0 ? void 0 : _a.param;
            if (typeof this.params === 'undefined') {
                throw new Error(`Route ${this.name} requires parameters`);
            }
            if (typeof this.params[param] === 'undefined') {
                throw new Error(`${param} is a required parameter for route ${this.name}`);
            }
            return [param, this.params[param].toString()];
        })
            .reduce((builtPath, [name, value]) => {
            // Replace a match for the param, unless it's followed by other letters
            // Given `name` is `id`, it will match `:id` but not `:identity`
            // Use a Regexp object as template strings get a bit tricky with escapes for regexps
            const paramReplacer = new RegExp(`:${name}(?![a-z])?`);
            return builtPath.replace(paramReplacer, `${value}/`);
        }, this.relative);
    }
    get full() {
        return `${this.protocol}://${this.hostName}${this.parsed}`;
    }
    get host() {
        return this.hostName;
    }
}
function route(name, params) {
    return new Route(name, params);
}
exports.route = route;
