import React, { useEffect } from "react"
import clsx from "clsx"
import MaUTable from "@material-ui/core/Table"
import PropTypes from "prop-types"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableContainer from "@material-ui/core/TableContainer"
import TableFooter from "@material-ui/core/TableFooter"
import TableHead from "@material-ui/core/TableHead"
import TablePagination from "@material-ui/core/TablePagination"
import TablePaginationActions from "./table-pagination-actions"
import TableRow from "@material-ui/core/TableRow"
import TableSortLabel from "@material-ui/core/TableSortLabel"
import TableToolbar from "./table-toolbar"
import { usePrevious } from "@hyperobjekt/hooks"
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from "react-table"

const Table = ({
  columns,
  data,
  skipPageReset = false,
  onSort,
  sortColumn,
  options,
  ...props
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    toggleSortBy,
    state: { pageIndex, pageSize, globalFilter, sortBy },
  } = useTable(
    {
      columns,
      data,
      autoResetPage: !skipPageReset,
      ...options,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  )

  const prevSortBy = usePrevious(sortBy)

  // fire sort callback
  // useEffect(() => {
  //   const prevId = prevSortBy ? prevSortBy[0].id : null
  //   const newId = sortBy[0].id
  //   onSort && prevId !== newId && onSort(sortBy)
  // }, [sortBy, prevSortBy, onSort])

  // override sort direction from prop
  useEffect(() => {
    if (sortColumn) {
      const currentSortColumn = sortBy[0].id
      if (currentSortColumn !== sortColumn) {
        console.log("toggle sorting", sortColumn, sortBy)
        toggleSortBy(sortColumn, true)
      }
    }
  }, [sortColumn, toggleSortBy, sortBy])

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setPageSize(Number(event.target.value))
  }

  return (
    <>
      <TableToolbar
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <TableContainer {...props}>
        <MaUTable {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => {
              return (
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => {
                    const sortProps = column.getSortByToggleProps()
                    return (
                      <TableCell
                        {...column.getHeaderProps({
                          onClick: () => onSort && onSort(column.id),
                          className: clsx(column.className, {
                            "tableCell--active": column.isSorted,
                          }),
                          style: { ...column.style, ...sortProps.style },
                        })}
                        variant="head"
                      >
                        {column.render("Header")}
                        <TableSortLabel
                          active={column.isSorted}
                          // react-table has a unsorted state which is not treated here
                          direction="desc"
                        />
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableHead>
          <TableBody>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <TableCell
                        {...cell.getCellProps([
                          {
                            className: clsx(cell.column.className, {
                              "tableCell--active": cell.column.isSorted,
                            }),
                            style: cell.column.style,
                          },
                        ])}
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[
                  5,
                  10,
                  25,
                  { label: "All", value: data.length },
                ]}
                colSpan={7}
                count={data.length}
                rowsPerPage={pageSize}
                page={pageIndex}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </MaUTable>
      </TableContainer>
    </>
  )
}

Table.defaultProps = {
  options: {},
}

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  skipPageReset: PropTypes.bool,
}

export default Table
