import { RequestHandler, send } from 'micro';
import { IncomingMessage, ServerResponse } from 'http';

const DEFAULT_ALLOW_METHODS = [
  'POST',
  'GET',
  'PUT',
  'PATCH',
  'DELETE',
  'OPTIONS',
];

const DEFAULT_ALLOW_HEADERS = [
  'X-Requested-With',
  'Access-Control-Allow-Origin',
  'X-HTTP-Method-Override',
  'Content-Type',
  'Authorization',
  'Accept',
];

const DEFAULT_MAX_AGE_SECONDS = 60 * 60 * 24; // 24 hours

const cors = (options: any = {}) => (handler: RequestHandler) => (
  req: IncomingMessage,
  res: ServerResponse,
) => {
  const {
    origin = '*',
    maxAge = DEFAULT_MAX_AGE_SECONDS,
    allowMethods = DEFAULT_ALLOW_METHODS,
    allowHeaders = DEFAULT_ALLOW_HEADERS,
    allowCredentials = true,
    exposeHeaders = [],
  } = options;

  res.setHeader('Access-Control-Allow-Origin', origin);
  if (allowCredentials) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  if (exposeHeaders.length) {
    res.setHeader('Access-Control-Expose-Headers', exposeHeaders.join(','));
  }

  const preFlight = req.method === 'OPTIONS';
  if (preFlight) {
    res.setHeader('Access-Control-Allow-Methods', allowMethods.join(','));
    res.setHeader('Access-Control-Allow-Headers', allowHeaders.join(','));
    res.setHeader('Access-Control-Max-Age', String(maxAge));
    return send(res, 200);
  }

  return handler(req, res);
};

export default cors;
