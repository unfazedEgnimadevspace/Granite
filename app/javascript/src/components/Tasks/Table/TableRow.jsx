import React from "react";

import PropTypes from "prop-types";

import Tooltip from "components/Tooltip";

const TableRow = ({ data, destroyTask, showTask }) => (
  <tbody className="divide-y divide-gray-200 bg-white">
    {data.map(rowData => (
      <tr key={rowData.id}>
        <td
          className="truncate block w-64 px-6 py-4 text-sm
            font-medium capitalize leading-8 text-bb-purple"
        >
          <Tooltip content={rowData.title} delay={200} direction="top">
            <div className="truncate max-w-64 ">{rowData.title}</div>
          </Tooltip>
        </td>
        <td
          className="whitespace-no-wrap px-6 py-4 text-sm
            font-medium leading-5 text-gray-900"
        >
          {rowData.assigned_user.name}
        </td>
        <td className="cursor-pointer px-6 py-4 text-right text-sm font-medium leading-5">
          <a className="text-bb-purple" onClick={() => showTask(rowData.slug)}>
            Show
          </a>
        </td>
        <td
          className="cursor-pointer px-6 py-4 text-right
            text-sm font-medium leading-5"
        >
          <a
            className="text-red-500
              hover:text-red-700"
            onClick={() => destroyTask(rowData.slug)}
          >
            Delete
          </a>
        </td>
      </tr>
    ))}
  </tbody>
);

TableRow.propTypes = {
  data: PropTypes.array.isRequired,
  destroyTask: PropTypes.func,
  showTask: PropTypes.func,
};

export default TableRow;
