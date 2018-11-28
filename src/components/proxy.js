import config from '../config'
import proxyReal from './proxy-real';
import proxyMock from './proxy-mock';

var proxy_return;

if (config.PROXY_MODE === 'MOCK')
    proxy_return = proxyMock;
else if (config.PROXY_MODE === 'REAL')
    proxy_return = proxyReal;
else
    console.log('ERROR: No se encuentra Proxy!')

export default proxy_return;
