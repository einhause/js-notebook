import { useState } from 'react';
import CodeEditor from './code-editor';
import Preview from './preview';
import bundle from '../bundler';
import Resizable from './resizable';

const CodeCell = () => {
  // User input text
  const [inputText, setInputText] = useState<string>('');
  // Code state
  const [code, setCode] = useState('');

  const onClick = async () => {
    const output = await bundle(inputText);
    setCode(output);
  };

  return (
    <Resizable direction='y'>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'row' }}>
        <Resizable direction='x'>
          <CodeEditor
            initialValue='const a = 1;'
            onChange={(value) => setInputText(value)}
          />
        </Resizable>
        {/* <div>
          <button onClick={onClick}>Submit</button>
        </div> */}
        <Preview code={code} />
      </div>
    </Resizable>
  );
};

export default CodeCell;