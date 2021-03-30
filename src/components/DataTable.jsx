import React from 'react';
import classnames from 'classnames';
import moment from 'moment';

const DataTable = ({ data }) => {
  const inputDataTitle = Object.keys(data[0]).map(el => el.toLowerCase());
  const validData = inputDataTitle.filter(
    el => el.includes('fullname') || el.includes('phone') || el.includes('email'),
  );
  const validateEmail = email => {
    let re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  const validatePhone = phone => {
    let re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    return re.test(phone);
  };

  if (validData.length != 3) {
    return <div className="no-data">file format is not correct</div>;
  } else {
    return (
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Age</th>
            <th>Experience</th>
            <th>Early Income</th>
            <th>Has children</th>
            <th>License states</th>
            <th>Expiration date</th>
            <th>License number</th>
            <th>Dublicate with</th>
          </tr>
        </thead>
        <tbody>
          {data.map(el => (
            <tr key={el.id}>
              <td>{el.id}</td>
              <td>{el.fullName}</td>
              <td className={classnames({ invalid: !validatePhone(el.phone) })}>{el.phone}</td>
              <td className={classnames({ invalid: !validateEmail(el.email) })}>{el.email}</td>
              <td
                className={classnames({
                  invalid: !Number.isInteger(+el.age) || el.age < 21,
                })}
              >
                {el.age}
              </td>
              <td
                className={classnames({
                  invalid: el.experience < 0 || el.experience > el.age - 21,
                })}
              >
                {el.experience}
              </td>
              <td
                className={classnames({
                  invalid: el.income > 1000000,
                })}
              >
                {el.income}
              </td>
              <td
                className={classnames({
                  invalid:
                    el.hasChildren.toLowerCase() != 'true' &&
                    el.hasChildren.toLowerCase() != 'false' &&
                    el.hasChildren.toLowerCase() != '',
                })}
              >
                {el.hasChildren}
              </td>
              <td>{el.state.replace('|', ',')}</td>
              <td
                className={classnames({
                  invalid:
                    !moment(el.expiration, 'MM/DD/YYYY', true).isValid() &&
                    !moment(el.expiration, 'YYYY-MM-DD', true).isValid(),
                })}
              >
                {el.expiration}
              </td>

              <td className={classnames({ invalid: el.licenseNum.length != 6 })}>
                {el.licenseNum}
              </td>
              <td>
                {data.map(item => {
                  if (
                    (item.phone === el.phone && item.id != el.id) ||
                    (item.email.toLowerCase() === el.email.toLowerCase() && item.id != el.id)
                  ) {
                    return item.id;
                  }
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
};
export default DataTable;
