import React, { Component } from 'react';
import _ from 'lodash';

class TableBody extends Component {

  renderCell = (item, columm) => {
    if (columm.content) return columm.content(item);

    return _.get(item, columm.path);
  };

  createKey = (item, column) => {
    return item._id + (column.path || column.key)
  };

  render() { 
    const { data, columns } = this.props;

    return ( <tbody>
        {data.map(item => (
          <tr key={item._id}>
            {columns.map(column => ( 
              <td key={this.createKey(item, column)}>
                {this.renderCell(item, column)}
              </td>
            ))}
           </tr>))}
      </tbody> );
  }
}
 
export default TableBody;