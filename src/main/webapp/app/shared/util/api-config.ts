/* tslint:disable */
let backendHost;
let statsHost;

const hostname = window && window.location && window.location.hostname;

if ('localhost' === hostname) {
    backendHost = 'http://localhost:8080';
    statsHost = 'https://ntc3l0mzug.execute-api.us-west-1.amazonaws.com/prod/stats';
} else if ('saasclient.s3-website-us-west-1.amazonaws.com' === hostname) {
    backendHost = 'https://search.testapp123.com';
    statsHost = 'https://f0pcpw0738.execute-api.us-west-1.amazonaws.com/prod/stats';
} else if ('d2kmm0jpigycxg.cloudfront.net' === hostname) {
    backendHost = `https://search.testapp123.com`;
    statsHost = 'https://f0pcpw0738.execute-api.us-west-1.amazonaws.com/prod/stats';
} else {
    backendHost = 'https://search.testapp123.com';
    statsHost = 'https://f0pcpw0738.execute-api.us-west-1.amazonaws.com/prod/stats';
}

//backendHost = 'https://search.testapp123.com';
//statsHost = 'https://f0pcpw0738.execute-api.us-west-1.amazonaws.com/prod/stats';

export const API_ROOT = `${backendHost}`;
export const STATS_ROOT = `${statsHost}`;