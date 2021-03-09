import packagefile from '../../package.json'

export const APP_VERSION = packagefile.version
export const appName = 'translationCore:Admin'
export const base_url = process.env.NEXT_PUBLIC_DOOR43_SERVER_URL;
export const apiPath  = 'api/v1'
export const tokenid = 'PlaygroundTesting'
