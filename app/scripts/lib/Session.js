import Browser from 'webextension-polyfill';
import {BROWSER_EXTENSION_ID} from '../actions/common';

function getActiveUsername() {
    return document.querySelector('meta[name="user-login"]')?.getAttribute('content');
}

function isUserSessionActive() {
    return !!getActiveUsername();
}

const syncHandlers = [];
function registerSyncHandler(callback) {
    syncHandlers.push(callback);
}

function syncTab() {
    Browser.runtime.sendMessage({op: 'pull'});
}

function syncInit() {
    syncInit.handler = (data, sender) => {
        if (sender.id !== BROWSER_EXTENSION_ID) {
            return new Error('Very Bad!');
        }
        syncHandlers.forEach((callback) => callback(data, sender));
    };

    Browser.runtime.onMessage.removeListener(syncInit.handler);
    Browser.runtime.onMessage.addListener(syncInit.handler);
    syncTab();
}

export default {
    getActiveUsername,
    isUserSessionActive,
    registerSyncHandler,
    syncInit,
};
