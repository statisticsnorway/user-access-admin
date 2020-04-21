import { AUTH_API, CATALOG_API } from './'
import { LANGUAGE } from '../enums'

const errorString = 'A problem occured'

export const TEST_CONFIGURATIONS = {
  alternativeTestGroupId: 'testGroupId2',
  alternativeTestRoleId: 'testRoleId2',
  alternativeTestUserId: 'testUserId2',
  alternativeUrl: 'http://localhost:9999',
  apiContext: (fn) => ({
    authApi: process.env.REACT_APP_API_AUTH,
    catalogApi: process.env.REACT_APP_API_CATALOG,
    setAuthApi: fn,
    setCatalogApi: fn
  }),
  emptyRole: {
    data: {
      [AUTH_API.ROLE_OBJECT.STRING[1]]: '',
      [AUTH_API.ROLE_OBJECT.STRING[0]]: '',
      [AUTH_API.ROLE_OBJECT.ENUM]: AUTH_API.ENUMS.VALUATIONS[3],
      [AUTH_API.ROLE_OBJECT.LIST]: { [AUTH_API.INCLUDES]: [], [AUTH_API.EXCLUDES]: [] },
      [AUTH_API.ROLE_OBJECT.ARRAY[1]]: { [AUTH_API.INCLUDES]: [], [AUTH_API.EXCLUDES]: AUTH_API.ENUMS.STATES },
      [AUTH_API.ROLE_OBJECT.ARRAY[0]]: { [AUTH_API.INCLUDES]: [], [AUTH_API.EXCLUDES]: AUTH_API.ENUMS.PRIVILEGES }
    }
  },
  emptyCatalogs: { [CATALOG_API.CATALOGS]: [] },
  errorHeader: 'Error header',
  errorString: errorString,
  errorObject: { response: { data: errorString } },
  errorStatus: { response: { statusText: errorString } },
  language: LANGUAGE.LANGUAGES.ENGLISH.languageCode,
  objectToString: '[object Object]',
  otherLanguage: LANGUAGE.LANGUAGES.NORWEGIAN.languageCode,
  responseObject: { data: { statusCode: 200 } },
  returnCatalogs: {
    [CATALOG_API.CATALOGS]: [
      {
        id: {
          path: '/test/1',
          type: 'UNDBOUNDED',
          timestamp: '1582719098762',
          state: AUTH_API.ENUMS.STATES[0],
          parentUri: 'file:///test/teststore',
          valuation: AUTH_API.ENUMS.VALUATIONS[0]
        }
      },
      {
        id: {
          path: '/test/2',
          type: 'UNDBOUNDED',
          timestamp: '1582719098762',
          state: AUTH_API.ENUMS.STATES[0],
          parentUri: 'file:///test/teststore',
          valuation: AUTH_API.ENUMS.VALUATIONS[0]
        }
      }
    ]
  },
  returnCatalogAccessUsers: {
    'catalogAccess': [
      {
        'path': '/skatt/person/rawdata-2018',
        'role': 'skatt.person.rawdata',
        'privileges': 'READ CREATE UPDATE ',
        'user': 'magnus',
        'group': 'skatt-test'
      },
      {
        'path': '/skatt/person/rawdata-2018',
        'role': 'skatt.person.rawdata',
        'privileges': 'READ CREATE UPDATE ',
        'user': 'marianne',
        'group': 'skatt-test'
      },
      {
        'path': '/skatt/person/rawdata-2018',
        'role': 'skatt.person.rawdata',
        'privileges': 'READ CREATE UPDATE ',
        'user': 'mehran',
        'group': 'skatt-test'
      },
      {
        'path': '/skatt/person/rawdata-2018',
        'role': 'skatt.person.rawdata',
        'privileges': 'READ CREATE UPDATE ',
        'user': 'ove',
        'group': 'skatt-test'
      },
      {
        'path': '/skatt/person/rawdata-2018',
        'role': 'skatt.person.rawdata',
        'privileges': 'READ CREATE UPDATE ',
        'user': 'oyvind',
        'group': 'skatt-test'
      },
      {
        'path': '/skatt/person/rawdata-2018',
        'role': 'skatt.person.rawdata',
        'privileges': 'READ CREATE UPDATE ',
        'user': 'rannveig',
        'group': 'skatt-test'
      }
    ]
  },
  returnGroups: {
    [AUTH_API.GROUPS]: [
      {
        [AUTH_API.GROUP_OBJECT.LIST]: ['role1'],
        [AUTH_API.GROUP_OBJECT.STRING[0]]: 'group1',
        [AUTH_API.GROUP_OBJECT.STRING[1]]: 'A group'
      },
      {
        [AUTH_API.GROUP_OBJECT.LIST]: ['role2'],
        [AUTH_API.GROUP_OBJECT.STRING[0]]: 'group2',
        [AUTH_API.GROUP_OBJECT.STRING[1]]: 'An alternative group'
      }
    ]
  },
  returnRoles: {
    [AUTH_API.ROLES]: [
      {
        [AUTH_API.ROLE_OBJECT.ARRAY[1]]: {},
        [AUTH_API.ROLE_OBJECT.STRING[0]]: 'role1',
        [AUTH_API.ROLE_OBJECT.STRING[1]]: 'A role',
        [AUTH_API.ROLE_OBJECT.ENUM]: AUTH_API.ENUMS.VALUATIONS[0],
        [AUTH_API.ROLE_OBJECT.ARRAY[0]]: { [AUTH_API.INCLUDES]: [AUTH_API.ENUMS.PRIVILEGES[0]] },
        [AUTH_API.ROLE_OBJECT.LIST]: { [AUTH_API.INCLUDES]: ['/test/1'], [AUTH_API.EXCLUDES]: ['/test/2'] }
      }, {
        [AUTH_API.ROLE_OBJECT.STRING[0]]: 'role2',
        [AUTH_API.ROLE_OBJECT.STRING[1]]: 'Another role',
        [AUTH_API.ROLE_OBJECT.ENUM]: AUTH_API.ENUMS.VALUATIONS[1],
        [AUTH_API.ROLE_OBJECT.LIST]: { [AUTH_API.INCLUDES]: ['/test/2'] },
        [AUTH_API.ROLE_OBJECT.ARRAY[1]]: { [AUTH_API.INCLUDES]: [AUTH_API.ENUMS.STATES[1]] },
        [AUTH_API.ROLE_OBJECT.ARRAY[0]]: {
          [AUTH_API.EXCLUDES]: [
            AUTH_API.ENUMS.PRIVILEGES[0],
            AUTH_API.ENUMS.PRIVILEGES[2],
            AUTH_API.ENUMS.PRIVILEGES[3]
          ]
        }
      }
    ]
  },
  returnUser: {
    [AUTH_API.USER_OBJECT.STRING]: 'user1',
    [AUTH_API.USER_OBJECT.ARRAY[1]]: ['role1', 'role2'],
    [AUTH_API.USER_OBJECT.ARRAY[0]]: ['group1', 'group2']
  },
  returnUsers: {
    [AUTH_API.USERS]: [
      {
        [AUTH_API.USER_OBJECT.STRING]: 'user1',
        [AUTH_API.USER_OBJECT.ARRAY[1]]: ['role1', 'role2'],
        [AUTH_API.USER_OBJECT.ARRAY[0]]: ['group1', 'group2']
      },
      {
        [AUTH_API.USER_OBJECT.STRING]: 'user2',
        [AUTH_API.USER_OBJECT.ARRAY[1]]: ['role3', 'role4'],
        [AUTH_API.USER_OBJECT.ARRAY[0]]: ['group3', 'group4']
      }
    ]
  },
  testUserCatalog: {
    data: {
      [CATALOG_API.CATALOG_OBJECT.STRING[0]]: '/test/1',
      [CATALOG_API.CATALOG_OBJECT.STRING[1]]: 'file:///test/1',
      [CATALOG_API.CATALOG_OBJECT.ENUM[0]]: AUTH_API.ENUMS.VALUATIONS[3],
      [CATALOG_API.CATALOG_OBJECT.ENUM[1]]: AUTH_API.ENUMS.STATES[1],
      [CATALOG_API.CATALOG_OBJECT.TIMESTAMP]: '1523765273'
    }
  },
  testCatalogPath: '/test/1',
  testGroup: {
    [AUTH_API.GROUP_OBJECT.LIST]: ['role1', 'role2'],
    [AUTH_API.GROUP_OBJECT.STRING[0]]: 'testGroupId',
    [AUTH_API.GROUP_OBJECT.STRING[1]]: 'A test group'
  },
  testGroupId: 'testGroupId',
  testRole: {
    [AUTH_API.ROLE_OBJECT.STRING[0]]: 'testRoleId',
    [AUTH_API.ROLE_OBJECT.STRING[1]]: 'A test role',
    [AUTH_API.ROLE_OBJECT.ENUM]: AUTH_API.ENUMS.VALUATIONS[1],
    [AUTH_API.ROLE_OBJECT.LIST]: { [AUTH_API.INCLUDES]: ['/test/1', '/test/2'] },
    [AUTH_API.ROLE_OBJECT.ARRAY[1]]: { [AUTH_API.INCLUDES]: [AUTH_API.ENUMS.STATES[1]] },
    [AUTH_API.ROLE_OBJECT.ARRAY[0]]: { [AUTH_API.INCLUDES]: [AUTH_API.ENUMS.PRIVILEGES[1]] }
  },
  testRoleId: 'testRoleId',
  testUser: {
    [AUTH_API.USER_OBJECT.STRING]: 'testUserId',
    [AUTH_API.USER_OBJECT.ARRAY[1]]: ['role1', 'role2'],
    [AUTH_API.USER_OBJECT.ARRAY[0]]: ['group1', 'group2']
  },
  testUserId: 'testUserId',
  updatedTestGroup: {
    data: {
      [AUTH_API.GROUP_OBJECT.LIST]: ['role1'],
      [AUTH_API.GROUP_OBJECT.STRING[0]]: 'testGroupId2',
      [AUTH_API.GROUP_OBJECT.STRING[1]]: 'A test group described'
    }
  },
  updatedTestRole: {
    data: {
      [AUTH_API.ROLE_OBJECT.STRING[0]]: 'testRoleId2',
      [AUTH_API.ROLE_OBJECT.STRING[1]]: 'A test role described',
      [AUTH_API.ROLE_OBJECT.ENUM]: AUTH_API.ENUMS.VALUATIONS[3],
      [AUTH_API.ROLE_OBJECT.ARRAY[1]]: {
        [AUTH_API.INCLUDES]: [AUTH_API.ENUMS.STATES[2]],
        [AUTH_API.EXCLUDES]: AUTH_API.ENUMS.STATES.filter(state => state !== AUTH_API.ENUMS.STATES[2])
      },
      [AUTH_API.ROLE_OBJECT.ARRAY[0]]: {
        [AUTH_API.INCLUDES]: [AUTH_API.ENUMS.PRIVILEGES[2]],
        [AUTH_API.EXCLUDES]: AUTH_API.ENUMS.PRIVILEGES.filter(privilege => privilege !== AUTH_API.ENUMS.PRIVILEGES[2])
      },
      [AUTH_API.ROLE_OBJECT.LIST]: { [AUTH_API.INCLUDES]: ['/test/3'], [AUTH_API.EXCLUDES]: ['/test/4'] }
    }
  },
  updatedTestUser: {
    data: {
      [AUTH_API.USER_OBJECT.ARRAY[1]]: ['role1'],
      [AUTH_API.USER_OBJECT.ARRAY[0]]: ['group1'],
      [AUTH_API.USER_OBJECT.STRING]: 'testUserId2'
    }
  }
}
