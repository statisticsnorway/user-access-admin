import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useAxios from 'axios-hooks'

import { UserAccess } from '../components'
import { ApiContext, LanguageContext } from '../utilities'
import { API } from '../configurations'
import { USER_ACCESS } from '../enums'
import { TEST_CONFIGURATIONS } from '../setupTests'

const { apiContext, language, refetch } = TEST_CONFIGURATIONS

const setup = () => {
  const { getByText } = render(
    <ApiContext.Provider value={apiContext}>
      <LanguageContext.Provider value={{ language: language }}>
        <UserAccess userId='test' />
      </LanguageContext.Provider>
    </ApiContext.Provider>
  )

  return { getByText }
}

test('Renders correctly', () => {
  useAxios.mockReturnValue([{ data: { [API.CATALOGS]: [] }, loading: false, error: null, response: null }, refetch])
  const { getByText } = setup()

  expect(getByText(USER_ACCESS.HEADER[language])).toBeInTheDocument()
  expect(getByText(USER_ACCESS.CHECK[language])).toBeInTheDocument()
})

test('Functions correctly on good response', () => {
  useAxios.mockReturnValue([{
    data: { [API.CATALOGS]: [] },
    loading: false,
    error: null,
    response: { response: { statusText: USER_ACCESS.VERDICTS.OK } }
  }, refetch])
  const { getByText } = setup()

  userEvent.click(getByText(API.ENUMS.PRIVILEGES[2]))
  userEvent.click(getByText(USER_ACCESS.CHECK[language]))

  expect(refetch).toHaveBeenCalled()
})

test('Functions correctly on bad response', () => {
  useAxios.mockReturnValue([{
    data: { [API.CATALOGS]: [] },
    loading: false,
    error: { response: { statusText: USER_ACCESS.VERDICTS.FORBIDDEN } },
    response: null
  }, refetch])
  const { getByText } = setup()

  userEvent.click(getByText(API.ENUMS.STATES[2]))
  userEvent.click(getByText(API.ENUMS.VALUATIONS[2]))
  userEvent.click(getByText(USER_ACCESS.CHECK[language]))

  expect(refetch).toHaveBeenCalled()
})
