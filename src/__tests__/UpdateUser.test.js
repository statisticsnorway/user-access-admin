import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useAxios from 'axios-hooks'

import { UpdateUser } from '../components'
import { ApiContext, LanguageContext } from '../utilities'
import { API } from '../configurations'
import { TEST_IDS, USER } from '../enums'
import { TEST_CONFIGURATIONS } from '../setupTests'

const { alternativeTestUserId, apiContext, execute, language, returnRoles, testRoles, testUserId, updatedTestUser } = TEST_CONFIGURATIONS

const setup = (isNew, roles, userId) => {
  const { getAllByText, getByPlaceholderText, getByTestId, getByText } = render(
    <ApiContext.Provider value={apiContext}>
      <LanguageContext.Provider value={{ language: language }}>
        <UpdateUser isNew={isNew} refetch={jest.fn()} roles={roles} userId={userId} />
      </LanguageContext.Provider>
    </ApiContext.Provider>
  )

  return { getAllByText, getByPlaceholderText, getByTestId, getByText }
}

describe('Common mock', () => {
  useAxios.mockReturnValue([{ data: returnRoles, loading: false, error: null, response: null }, execute])

  test('Renders correctly on new user', () => {
    const { getByPlaceholderText, getByTestId } = setup(true, [], '')

    userEvent.click(getByTestId(TEST_IDS.NEW_USER))

    expect(getByPlaceholderText(USER.USER_ID[language])).toBeInTheDocument()
  })

  test('Renders correctly on update user', () => {
    const { getAllByText, getByPlaceholderText, getByTestId } = setup(false, testRoles, testUserId)

    userEvent.click(getByTestId(TEST_IDS.UPDATE_USER))

    expect(getAllByText(USER.UPDATE_USER[language])).toHaveLength(2)
    expect(getByPlaceholderText(USER.USER_ID[language])).toBeDisabled()
  })

  test('Functions correctly on PUT request', () => {
    const { getAllByText, getByPlaceholderText, getByTestId, getByText } = setup(true, [], '')

    userEvent.click(getByTestId(TEST_IDS.NEW_USER))
    userEvent.type(getByPlaceholderText(USER.USER_ID[language]), alternativeTestUserId)
    userEvent.click(getByText(returnRoles[API.ROLES][0].roleId))
    userEvent.click(getAllByText(USER.CREATE_USER[language])[1])

    expect(execute).toHaveBeenCalledTimes(1)
    expect(execute).toHaveBeenCalledWith(updatedTestUser)
  })
})