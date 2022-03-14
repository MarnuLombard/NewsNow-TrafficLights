/* eslint-disable quote-props */
export const RouteMap = {
  'status.show': '/status/:id',
  'dashboards.index': '/dashboards',
  'dashboards.show': '/dashboards/:id',
  'dashboards.default': '/dashboards/default',
  'client': '/client',
};

class Route {
  // Typically, this would live in some kind of config area
  private readonly hostName = 'localhost';
  private readonly protocol = 'http';

  // eslint-disable-next-line no-useless-constructor
  constructor(
    public name: keyof typeof RouteMap,
    public params?: Record<string, string | number>,
  ) {}

  public get relative(): string {
    const path: string|undefined = RouteMap[this.name];

    if (typeof path === 'string') {
      return path;
    }

    throw new Error(`${this.name} is not a valid route`);
  }

  get parsed(): string {
    // grabs "bar" from /foo/:bar
    const regexp = /:(?<param>[a-z-_.]+)*/g;

    return Array.from<RegExpMatchArray>(this.relative.matchAll(regexp))
      .map<Array<string>>((match) => {
        const param = <string>match.groups?.param;

        if (typeof this.params === 'undefined') {
          throw new Error(`Route ${this.name} requires parameters`);
        }

        if (typeof this.params[param] === 'undefined') {
          throw new Error(`${param} is a required parameter for route ${this.name}`);
        }

        return [param, this.params[param].toString()];
      })
      .reduce((builtPath: string, [name, value]) => {
        // Replace a match for the param, unless it's followed by other letters
        // Given `name` is `id`, it will match `:id` but not `:identity`
        // Use a Regexp object as template strings get a bit tricky with escapes for regexps
        const paramReplacer = new RegExp(`:${name}(?![a-z])?`);

        return builtPath.replace(paramReplacer, `${value}/`);
      }, this.relative);
  }

  public get full(): string {
    return `${this.protocol}://${this.hostName}${this.parsed}`;
  }

  public get host(): string {
    return this.hostName;
  }
}

export function route(name: string, params?: Record<string, string | number>): Route {
  return new Route(<keyof typeof RouteMap>name, params);
}
