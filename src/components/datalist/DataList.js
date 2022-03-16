import React from 'react';
import Input from '../UI/Input/Input';
import './DataList.css';

const DataList = (props) => {
  let noContent = <p>No Data Entered Yet.</p>;
  if (props.formList.length === 0) {
    return (<div className="card data-list">
      <h2 className="data-list__fallback">{noContent}</h2>
    </div>);
  }

  return (
    <div className="card data-list">
      <ul className="data-lists">
        <h2 className="data-list__fallback">
          <p>Rendered Version of Metadata</p>
        </h2>
        {props.formList.map((exp) => (
          <div className="card data-item">
            <Input
              key={exp.id}
              id={exp.id}
              type={exp.type}
              label={exp.label}
              bgColor={exp.bgColor}
              textColor={exp.textColor}
              minLength={exp.minLength}
              maxLength={exp.maxLength}
              options={exp.options}
            >
            </Input>
          </div>

        ))
        }
      </ul>
    </div>


  );
};

export default DataList;