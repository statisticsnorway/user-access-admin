import React from 'react'
import useAxios from 'axios-hooks'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import { AppHome } from '../components'
import { ApiContext, LanguageContext } from '../context/AppContext'
import { TEST_CONFIGURATIONS } from '../configurations'
import { TEST_IDS, UI } from '../enums'

import User from './test-data/User.json'

jest.mock('../components/role/RoleLookup', () => () => null)
jest.mock('../components/user/UpdateUser', () => () => null)
jest.mock('../components/group/GroupLookup', () => () => null)
jest.mock('../components/access/UserAccess', () => () => null)

window.localStorage.__proto__.getItem = jest.fn()
window.localStorage.__proto__.setItem = jest.fn()
window.localStorage.__proto__.hasOwnProperty = jest.fn()

const { alternativeTestUserId, language } = TEST_CONFIGURATIONS
const apiContext = TEST_CONFIGURATIONS.apiContext(jest.fn())
const refetch = jest.fn()

const setup = () => {
  const { getByPlaceholderText, getByTestId, getByText } = render(
    <ApiContext.Provider value={apiContext}>
      <LanguageContext.Provider value={{ language: language }}>
        <MemoryRouter initialEntries={['/']}>
          <AppHome />
        </MemoryRouter>
      </LanguageContext.Provider>
    </ApiContext.Provider>
  )

  return { getByPlaceholderText, getByTestId, getByText }
}

test('Renders correctly', () => {
  useAxios.mockReturnValue([{ data: undefined, loading: false, error: null }, refetch])
  const { getByText } = setup()

  expect(getByText(UI.USER[language])).toBeInTheDocument()
})

test('Changing user works correctly', async () => {
  useAxios.mockReturnValue([{ data: User, loading: false, error: null }, refetch])
  const { getByPlaceholderText, getByTestId } = setup()

  await userEvent.type(getByPlaceholderText(UI.USER[language]), alternativeTestUserId)
  userEvent.click(getByTestId(TEST_IDS.REFRESH_USER))

  expect(refetch).toHaveBeenCalled()
})

test('Invokes localstorage to remember user', async () => {
  useAxios.mockReturnValue([{ data: User, loading: false, error: null }, refetch])
  const { getByPlaceholderText, getByText } = setup()

  userEvent.click(getByText(UI.REMEMBER_ME[language]))
  await userEvent.type(getByPlaceholderText(UI.USER[language]), '{enter}')

  expect(window.localStorage.__proto__.setItem).toHaveBeenCalled()
  expect(window.localStorage.__proto__.hasOwnProperty).toHaveBeenCalled()
})
