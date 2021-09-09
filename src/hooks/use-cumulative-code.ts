import { useTypedSelector } from '../hooks/use-typed-selector';

export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells;
    const orderedCells = order.map((id) => data[id]);

    const outputFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        const root = document.querySelector('#root')
        var output = (value) => {
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root)
            } else {
              root.innerHTML = JSON.stringify(value);
            }
          } else {
            root.innerHTML = value;
          }
        };
      `;
    const outputFuncNoOp = `
        var output = (value) => {};
      `;
    const cumulativeCode = [];

    for (let c of orderedCells) {
      if (c.type === 'code') {
        if (c.id === cellId) {
          cumulativeCode.push(outputFunc);
        } else {
          cumulativeCode.push(outputFuncNoOp);
        }
        cumulativeCode.push(c.content);
      }
      if (c.id === cellId) break;
    }

    return cumulativeCode.join('\n');
  });
};
