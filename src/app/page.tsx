'use client';
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { useCallback, useState, useRef } from 'react';
import { ColDef } from 'ag-grid-community';
import { faker } from '@faker-js/faker';
import Banner from './_component/Banner';

const pagination = true;
const paginationPageSize = 500;
const paginationPageSizeSelector = [200, 500, 1000];

type rowDataType = {
  transactionId: string;
  offerId: string;
  portfolioManager: string;
  email: string;
  contentProvider: string;
  amount: string;
  currency: string;
  registeredAt: string;
  updatedAt: string;
  status: string;
};

export default function Home() {
  const [searchParams, setSearchParams] = useState('');
  const gridRef = useRef<AgGridReact<rowDataType>>(null);
  enum Status {
    pending = 'pending',
    success = 'success',
    rejected = 'rejected',
  }

  const createRandomUser = () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    return {
      transactionId: faker.string.uuid(),
      offerId: faker.string.uuid(),
      portfolioManager: `${firstName} ${lastName}`,
      email: faker.internet.email(),
      contentProvider: faker.company.name(),
      amount: faker.finance.amount(),
      currency: faker.finance.currencyCode(),
      registeredAt: faker.date.past(),
      updatedAt: faker.date.recent(),
      status: faker.helpers.enumValue(Status),
    };
  };

  const users = faker.helpers.multiple(createRandomUser, {
    count: 200,
  });

  const [tableData, settableData] = useState(users);

  const [colDefs, setColDefs] = useState<ColDef[]>([
    { checkboxSelection: true, headerCheckboxSelection: true, resizable: false },
    { field: 'transactionId' },
    { field: 'offerId' },
    { field: 'portfolioManager' },
    { field: 'email' },
    { field: 'contentProvider' },
    { field: 'amount' },
    { field: 'currency' },
    { field: 'registeredAt' },
    { field: 'updatedAt' },
    { field: 'status' },
  ]);

  const onRowClicked = (row: rowDataType) => {
    console.log(row);
  };

  const gridOptions = {
    onRowClicked: onRowClicked,
  };

  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <Banner />
      <div className="ag-theme-quartz h-3/4">
        <div className="flex flex-row justify-end items-center mx-3 my-4">
          <label> Search: </label>
          <input
            type="text"
            placeholder="Search"
            className="p-2 border border-gray-300 rounded-md min-w-[250px]"
            onChange={e => setSearchParams(e.target.value)}
          />
        </div>
        <AgGridReact
          ref={gridRef}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
          quickFilterText={searchParams}
          rowData={tableData}
          columnDefs={colDefs}
          rowSelection="multiple"
          onRowClicked={row => gridOptions.onRowClicked(row.data)}
          domLayout="autoHeight"
          autoSizeStrategy={{ type: 'fitCellContents' }}
        />
      </div>
    </div>
  );
}
