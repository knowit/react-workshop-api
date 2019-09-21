import { ApolloServer, gql } from 'apollo-server-micro';
import data from './data.json';

type Id = {
  id: string;
};

type Beverage = {
  id: number;
  name: string;
  category: string;
  price: number;
  img: string;
};

const typeDefs = gql`
  type Beverage {
    id: Int!
    name: String!
    category: String!
    price: Int!
    img: String!
  }

  type Query {
    beverage(id: String!): Beverage!
    beverages: [Beverage]
  }
`;

const beverages: Beverage[] = data;

const resolvers = {
  Query: {
    beverage: async (_: any, { id }: Id): Promise<Beverage | undefined> => {
      return beverages.find(beverage => beverage.id === parseInt(id));
    },
    beverages: async (): Promise<Beverage[]> => {
      return beverages;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: true,
});

const handler = server.createHandler();

export default handler;
