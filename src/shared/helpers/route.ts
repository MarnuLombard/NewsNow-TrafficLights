export const RouteMap = {
  status: '/status',
  dashboards: '/dashboards',
  client: '/client',
};

// Typically, this would live in some kind of config area
const hostName = 'localhost';
const protocol = 'http';

class Route {
  // eslint-disable-next-line no-useless-constructor
  constructor(public name: keyof typeof RouteMap) {}

  public get relative(): string {
    const path: string|undefined = RouteMap[this.name];

    if (typeof path === 'string') {
      return path;
    }

    throw new Error(`${this.name} is not a valid route`);
  }

  public get full(): string {
    return `${protocol}://${hostName}${this.relative}`;
  }

  public get host(): string {
    return hostName;
  }
}

export function route(name: string): Route {
  return new Route(<keyof typeof RouteMap>name);
}
