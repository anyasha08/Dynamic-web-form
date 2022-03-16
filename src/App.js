import {useState} from 'react';
import NewMetaData from './components/NewMetaData/NewMetaData';
import DataList from './components/DataList/DataList';
const App = () => {
  const [formMetaData, setFormMetaData] = useState([]);
  const addFormMetaDataHandler = (newMetaData) => {
    console.log(newMetaData);
    setFormMetaData((prevMetaData) => {
      return [newMetaData, ...prevMetaData];
  });
  }
  return (
    <div>
      <NewMetaData onAddData={addFormMetaDataHandler} />
      <DataList formList={formMetaData}></DataList>
    </div>
  );
}

export default App;
