/* tslint:disable */
import {combineReducers} from 'redux';
import {loadingBarReducer as loadingBar} from 'react-redux-loading-bar';

import locale from './locale';
import layout from './layout';
import authentication from './authentication';
import administration from './administration';
import salesChannels from './sales-channels';
import synonyms from './synonyms';
import redirects from './redirects';
import analytics from './analytics';
import customizations from './customizations';
import systemProperties from './system-property';

export default combineReducers({
    authentication,
    locale,
    layout,
    administration,
    systemProperties,
    loadingBar,
    salesChannels,
    synonyms,
    redirects,
    analytics,
    customizations
});
