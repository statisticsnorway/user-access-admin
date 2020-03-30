import React, { useContext, useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Divider, Dropdown, Icon } from 'semantic-ui-react'
import { Button as SSBButton, Text, Title } from '@statisticsnorway/ssb-component-library'

import { ApiContext, LanguageContext } from '../../utilities'
import { API, SSB_COLORS } from '../../configurations'
import { ROLE, TEST_IDS, UI, USER_ACCESS } from '../../enums'

function UserAcces ({ userId }) {
  const { authApi, catalogApi } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const [state, setState] = useState(API.ENUMS.STATES[0])
  const [namespace, setNamespace] = useState('')
  const [privilege, setPrivilege] = useState(API.ENUMS.PRIVILEGES[0])
  const [verdict, setVerdict] = useState(USER_ACCESS.VERDICTS.UNKOWN)
  const [maxValuation, setMaxValuation] = useState(API.ENUMS.VALUATIONS[0])
  const [namespacePrefixesOptions, setNamespacePrefixesOptions] = useState([])

  const [{ data: getData, loading: getLoading, error: getError }] = useAxios(`${catalogApi}${API.GET_CATALOGS}`)
  const [{ loading, error, response }, refetch] = useAxios(
    `${authApi}${API.GET_ACCESS(namespace, privilege, state, maxValuation, userId)}`,
    { manual: true }
  )

  useEffect(() => {
    if (!getLoading && !getError && getData !== undefined) {
      setNamespacePrefixesOptions(getData[API.CATALOGS].map(catalog => ({
        key: catalog.id.path,
        text: catalog.id.path,
        value: catalog.id.path
      })))
    }
  }, [getLoading, getError, getData])

  useEffect(() => {
    if (!loading && !error && response) {
      setVerdict(response.statusText)
    }

    if (!loading && error) {
      setVerdict(error.response.statusText)
    }
  }, [error, loading, response])

  return (
    <>
      <Title size={3}>{USER_ACCESS.HEADER[language]}</Title>
      <Text>{`${USER_ACCESS.GUIDE[0][language]} `}</Text>
      <Dropdown
        inline
        value={privilege}
        options={API.ENUMS.PRIVILEGES.map(privilege => ({ key: privilege, text: privilege, value: privilege }))}
        onChange={(event, { value }) => {
          setVerdict(USER_ACCESS.VERDICTS.UNKOWN)
          setPrivilege(value)
        }}
      />
      <Text>{` ${USER_ACCESS.GUIDE[1][language]} `}</Text>
      <Dropdown
        search
        selection
        allowAdditions
        value={namespace}
        options={namespacePrefixesOptions}
        data-testid={TEST_IDS.SEARCH_DROPDOWN}
        additionLabel={`${UI.ADD[language]} `}
        placeholder={ROLE.NAMESPACE_PREFIXES[language]}
        noResultsMessage={UI.SEARCH_NO_RESULTS[language]}
        onChange={(event, { value }) => {
          setVerdict(USER_ACCESS.VERDICTS.UNKOWN)
          setNamespace(value)
        }}
        onAddItem={(event, { value }) => setNamespacePrefixesOptions(
          [{ key: value, text: value, value: value }, ...namespacePrefixesOptions]
        )}
      />
      <Text>{` ${USER_ACCESS.GUIDE[2][language]} `}</Text>
      <Dropdown
        inline
        value={state}
        options={API.ENUMS.STATES.map(state => ({ key: state, text: state, value: state }))}
        onChange={(event, { value }) => {
          setVerdict(USER_ACCESS.VERDICTS.UNKOWN)
          setState(value)
        }}
      />
      <Text>{` ${USER_ACCESS.GUIDE[3][language]} `}</Text>
      <Dropdown
        inline
        value={maxValuation}
        options={API.ENUMS.VALUATIONS.map(valuation => ({ key: valuation, text: valuation, value: valuation }))}
        onChange={(event, { value }) => {
          setVerdict(USER_ACCESS.VERDICTS.UNKOWN)
          setMaxValuation(value)
        }}
      />
      <Divider hidden />
      <Text>{`${USER_ACCESS.ACCESS[language]}: `}</Text>
      {loading ? <Icon loading size='large' name='sync alternate' style={{ color: SSB_COLORS.BLUE }} /> :
        <>
          <Icon
            size='large'
            name={
              verdict === USER_ACCESS.VERDICTS.UNKOWN ?
                'question' : verdict === USER_ACCESS.VERDICTS.OK ?
                'check' : verdict === USER_ACCESS.VERDICTS.FORBIDDEN ?
                  'ban' : 'exclamation triangle'
            }
            style={{
              color:
                verdict === USER_ACCESS.VERDICTS.UNKOWN ?
                  SSB_COLORS.BLUE : verdict === USER_ACCESS.VERDICTS.OK ?
                  SSB_COLORS.GREEN : verdict === USER_ACCESS.VERDICTS.FORBIDDEN ?
                    SSB_COLORS.RED : SSB_COLORS.YELLOW
            }}
          />
          <Text>{`(${verdict})`}</Text>
        </>
      }
      <Divider hidden />
      <SSBButton primary disabled={loading} onClick={() => refetch()}>{USER_ACCESS.CHECK[language]}</SSBButton>
    </>
  )
}

export default UserAcces