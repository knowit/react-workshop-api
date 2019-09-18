import { ApolloServer, gql } from 'apollo-server-micro';

type Id = {
  id: string;
};

type Beverage = {
  id: number;
  name: string;
  price: number;
  img: string;
};

const typeDefs = gql`
  type Beverage {
    id: Int!
    name: String!
    price: Int!
    img: String!
  }

  type Query {
    beverage(id: String!): Beverage!
    beverages: [Beverage]
  }
`;

let beverages: Beverage[] = [
  {
    id: 1,
    name: 'Nøgne Ø Imperial Stout',
    price: 80,
    img: 'https://bilder.vinmonopolet.no/cache/300x300-0/1053802-1.jpg',
  },
  {
    id: 2,
    name: 'Kronenbourg 1664 Blanc',
    price: 40,
    img: 'https://bilder.vinmonopolet.no/cache/300x300-0/1793702-1.jpg',
  },
  {
    id: 3,
    name: 'Nøgne Ø Dark Horizon 5',
    price: 250,
    img: 'https://bilder.vinmonopolet.no/cache/300x300-0/6975202-1.jpg',
  },
  {
    id: 4,
    name: 'Brugse Zot Blond',
    price: 49,
    img: 'https://bilder.vinmonopolet.no/cache/300x300-0/5233102-1.jpg',
  },
  {
    id: 5,
    name: 'Brugse Zot Dubbel',
    price: 53,
    img: 'https://bilder.vinmonopolet.no/cache/300x300-0/6977002-1.jpg',
  },
  {
    id: 6,
    name: 'By The Horns Samba King Rye Ale',
    price: 55,
    img: 'https://bilder.vinmonopolet.no/cache/300x300-0/6989002-1.jpg',
  },
];

const resolvers = {
  Query: {
    beverage: async (_: any, { id }: Id): Promise<Beverage> => {
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
