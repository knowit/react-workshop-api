import micro from 'micro';
import cors from './cors';
import handler from './index';

const server = micro(cors()(handler));

server.listen(3000);
