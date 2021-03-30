import React, { useState } from 'react';
import Papa from 'papaparse';
import DataTable from './DataTable';

const App = () => {
  const [data, setData] = useState(null);

  const handleFileUpload = e => {
    Papa.parse(e.target.files[0], {
      complete: function (results) {
        const newData = results.data.map((el, index) => Object.assign(el, { id: index + 1 }));
        setData(newData);
      },
      header: true,
      skipEmptyLines: true,
    });
  };
  const content = data ? <DataTable data={data} /> : <div className="no-data">choose file</div>;
  return (
    <>
      <label for="file-upload" class="custom-file-upload">
        Import users
      </label>
      <input id="file-upload" type="file" accept=".csv" onChange={handleFileUpload} />
      {content}
    </>
  );
};

export default App;
