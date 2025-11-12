import React, { useState } from 'react';
import './DataGrid.css';
import { useTableLogic } from './useTableLogic';

const DataGrid = ({ columns, data }) => {
  const { sortedData, toggleSort, updateFilter, sortKey, sortAsc, filters } =
    useTableLogic(data, columns);

  const [visibleCols, setVisibleCols] = useState(columns.map((col) => col.key));
  const [showPanel, setShowPanel] = useState(false);

  const toggleColumn = (key) => {
    setVisibleCols((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const getCellClass = (key, value) => {
    if (key === 'stock') {
      if (value < 10) return 'cell-red';
      if (value < 20) return 'cell-yellow';
      return 'cell-green';
    }
    if (key === 'price') {
      return value > 1000 ? 'cell-red' : 'cell-green';
    }
    return '';
  };

  return (
    <div className="table-container">
      <button onClick={() => setShowPanel((prev) => !prev)}>
        {showPanel ? 'Hide Columns' : 'Show Columns'}
      </button>

      {showPanel && (
        <div className="side-panel">
          <h4>Show/Hide Columns</h4>
          {columns.map((col) => (
            <label key={col.key}>
              <input
                type="checkbox"
                checked={visibleCols.includes(col.key)}
                onChange={() => toggleColumn(col.key)}
              />
              {col.label}
            </label>
          ))}
        </div>
      )}

      <table>
        <thead>
          <tr>
            {columns.map((col) =>
              visibleCols.includes(col.key) ? (
                <th key={col.key} onClick={() => toggleSort(col.key)}>
                  {col.label}
                  {sortKey === col.key && (sortAsc ? ' 🔼' : ' 🔽')}
                </th>
              ) : null
            )}
          </tr>
          <tr>
            {columns.map((col) =>
              visibleCols.includes(col.key) && col.filterable ? (
                <th key={col.key}>
                  <input
                    value={filters[col.key] || ''}
                    onChange={(e) => updateFilter(col.key, e.target.value)}
                    placeholder={`Filter ${col.label}`}
                  />
                </th>
              ) : visibleCols.includes(col.key) ? (
                <th key={col.key}></th>
              ) : null
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) =>
                visibleCols.includes(col.key) ? (
                  <td key={col.key} className={getCellClass(col.key, row[col.key])}>
                    {row[col.key]}
                  </td>
                ) : null
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataGrid;