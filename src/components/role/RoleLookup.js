import React, { useContext, useEffect } from 'react'
import useAxios from 'axios-hooks'
import { Grid } from 'semantic-ui-react'

import { UpdateRole } from '../'
import { ApiContext, LanguageContext } from '../../context/AppContext'
import { DescriptionPopup, makeEnum, RolesView } from '../../utilities'
import { AUTH_API } from '../../configurations'
import { ROLE } from '../../enums'

function RoleLookup ({ roleId }) {
  const { authApi } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const [{ data, loading, error }, refetch] = useAxios(`${authApi}${AUTH_API.GET_ROLE(roleId)}`)

  useEffect(() => {
    if (!loading && error) {
      console.log(error.response)
    }
  }, [error, loading, data])

  const setRoleDescription = key => {
    try {
      return ROLE[makeEnum(key)][language]
    } catch (e) {
      console.log(e)
      console.log(key)

      return '-'
    }
  }

  if (!loading && !error && data !== undefined) {
    return (
      <Grid>
        {Object.entries(data).map(([key, value]) =>
          <Grid.Row key={key} verticalAlign='middle'>
            <Grid.Column width={4}>
              {DescriptionPopup(<span style={{ fontWeight: 'bold' }}>{setRoleDescription(key)}</span>)}
            </Grid.Column>
            <Grid.Column width={12}>
              {RolesView(key, value, language)}
            </Grid.Column>
          </Grid.Row>
        )}
        <Grid.Row>
          <Grid.Column textAlign='right'>
            <UpdateRole isNew={false} refetch={refetch} role={data} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )
  } else {
    return null
  }
}

export default RoleLookup
