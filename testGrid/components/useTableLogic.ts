import { useState, useMemo } from 'react';

export function useTableLogic(data, columns) {
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [filters, setFilters] = useState({});

  const toggleSort = (key) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else {
      setSortKey(key);
      setSortAsc(true);
    }
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredData = useMemo(() => {
    return data.filter((row) =>
      columns.every((col) =>
        !filters[col.key] ||
        String(row[col.key]).toLowerCase().includes(filters[col.key].toLowerCase())
      )
    );
  }, [data, filters]);

  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      return sortAsc
        ? valA > valB ? 1 : -1
        : valA < valB ? 1 : -1;
    });
  }, [filteredData, sortKey, sortAsc]);

  return { sortedData, toggleSort, updateFilter, sortKey, sortAsc, filters };
}