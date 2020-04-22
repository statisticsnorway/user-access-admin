import React, { useContext, useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Divider, Grid, Icon, Input, Loader, Popup, Table } from 'semantic-ui-react'

import { CatalogUserLookupPortal, ErrorMessage } from '../'
import { ApiContext, convertToDatetimeJsonString, LanguageContext, sortArrayOfObjects } from '../../utilities'
import { CATALOG_API } from '../../configurations'
import { CATALOG, TEST_IDS, UI } from '../../enums'

function CatalogsTable () {
  const { catalogApi } = useContext(ApiContext)
  const { language } = useContext(LanguageContext)

  const [open, setOpen] = useState([])
  const [catalogs, setCatalogs] = useState([])
  const [direction, setDirection] = useState('ascending')

  const [{ data, loading, error }] = useAxios(`${catalogApi}${CATALOG_API.GET_CATALOGS}`)

  useEffect(() => {
    if (!loading && !error && data !== undefined) {
      setOpen(data[CATALOG_API.CATALOGS].map(() => false))
      setCatalogs(sortArrayOfObjects(
        data[CATALOG_API.CATALOGS],
        [[CATALOG_API.CATALOG_OBJECT.OBJECT.STRING], [CATALOG_API.CATALOG_OBJECT.OBJECT.STRING[0]]]
      ))
    }
  }, [data, error, loading])

  const handleSort = () => {
    setDirection(direction === 'ascending' ? 'descending' : 'ascending')
    setCatalogs(
      sortArrayOfObjects(
        data[CATALOG_API.CATALOGS],
        [[CATALOG_API.CATALOG_OBJECT.OBJECT.STRING], [CATALOG_API.CATALOG_OBJECT.OBJECT.STRING[0]]],
        direction
      )
    )
  }

  const handleFilter = (string) => setCatalogs(data[CATALOG_API.CATALOGS].filter(({ id }) =>
    id[CATALOG_API.CATALOG_OBJECT.OBJECT.STRING[0]].includes(string)
  ))

  const handleOpen = (index) => {
    const newOpen = open.map((state, ix) => index === ix ? true : state)
    setOpen(newOpen)
  }

  const handleClose = (index) => {
    const newOpen = open.map((state, ix) => index === ix ? false : state)
    setOpen(newOpen)
  }

  return (
    <>
      <Grid columns='equal'>
        <Grid.Column>
          <Input
            size='large'
            icon='search'
            disabled={loading || !!error}
            placeholder={UI.FILTER_TABLE[language]}
            onChange={(event, { value }) => handleFilter(value)}
          />
        </Grid.Column>
      </Grid>
      {loading ? <Loader active inline='centered' /> : error ?
        <>
          <Divider hidden />
          <ErrorMessage error={error} />
        </>
        :
        <Table celled sortable size='large'>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell sorted={direction} onClick={() => handleSort()} data-testid={TEST_IDS.TABLE_SORT}>
                {CATALOG.PATH[language]}
              </Table.HeaderCell>
              <Table.HeaderCell>{CATALOG.USERS[language]}</Table.HeaderCell>
              <Table.HeaderCell>{CATALOG.TIMESTAMP[language]}</Table.HeaderCell>
              <Table.HeaderCell>{CATALOG.TYPE[language]}</Table.HeaderCell>
              <Table.HeaderCell>{CATALOG.VALUATION[language]}</Table.HeaderCell>
              <Table.HeaderCell>{CATALOG.STATE[language]}</Table.HeaderCell>
              <Table.HeaderCell>{CATALOG.PARENT_URI[language]}</Table.HeaderCell>
              <Table.HeaderCell>{CATALOG.PSEUDO_CONFIG[language]}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {catalogs.map(({ id, parentUri, pseudoConfig, state, type, valuation }, index) =>
              <Table.Row key={index}>
                <Table.Cell style={{ fontWeight: 'bold' }}>
                  {id[CATALOG_API.CATALOG_OBJECT.OBJECT.STRING[0]]}
                </Table.Cell>
                <Table.Cell textAlign='center'>
                  <CatalogUserLookupPortal
                    open={open}
                    index={index}
                    state={state}
                    path={id[CATALOG_API.CATALOG_OBJECT.OBJECT.STRING[0]]}
                    valuation={valuation}
                    handleOpen={handleOpen}
                    handleClose={handleClose}
                  />
                </Table.Cell>
                <Table.Cell>{convertToDatetimeJsonString(id[CATALOG_API.CATALOG_OBJECT.OBJECT.STRING[1]])}</Table.Cell>
                <Table.Cell>{type}</Table.Cell>
                <Table.Cell>{valuation}</Table.Cell>
                <Table.Cell>{state}</Table.Cell>
                <Table.Cell>{parentUri}</Table.Cell>
                <Table.Cell textAlign='center'>
                  <Popup basic flowing position='left center' trigger={<Icon name='user secret' size='large' />}>
                    <pre>{JSON.stringify(pseudoConfig, null, 2)}</pre>
                  </Popup>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table>
      }
    </>
  )
}

export default CatalogsTable
