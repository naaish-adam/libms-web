export default interface Paginated<T> {
  edges: [
    {
      cursor: string;
      node: T;
    }
  ];
  pageInfo: {
    startCursor: string;
    endCursor: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface Forward {
  first?: number;
  after?: string;
  last?: never;
  before?: never;
}
interface Backward {
  last?: number;
  before?: string;
  first?: never;
  after?: never;
}

export type Pagination = Forward | Backward;
