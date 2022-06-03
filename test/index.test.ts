import { toPdfMakeObject } from '../src';

describe('blah', () => {
  it('should translate a markdown paragraph to text pdfmake object', () => {
    expect(toPdfMakeObject('Hello World')).toEqual([{ text: 'Hello World' }]);
  });

  it('should translate a markdown h1 to text pdfmake object', () => {
    expect(toPdfMakeObject('# Hello World')).toEqual([{ text: 'Hello World' }]);
  });

  it('should translate a markdown h2 to text pdfmake object', () => {
    expect(toPdfMakeObject('## Hello World')).toEqual([
      { text: 'Hello World' },
    ]);
  });

  it('should translate a markdown h3 to text pdfmake object', () => {
    expect(toPdfMakeObject('### Hello World')).toEqual([
      { text: 'Hello World' },
    ]);
  });

  it('should translate a markdown h4 to text pdfmake object', () => {
    expect(toPdfMakeObject('#### Hello World')).toEqual([
      { text: 'Hello World' },
    ]);
  });

  it('should translate a markdown h5 to text pdfmake object', () => {
    expect(toPdfMakeObject('##### Hello World')).toEqual([
      { text: 'Hello World' },
    ]);
  });

  it('should translate a markdown h6 to text pdfmake object', () => {
    expect(toPdfMakeObject('##### Hello World')).toEqual([
      { text: 'Hello World' },
    ]);
  });

  it('should translate an unordered list h5 to pdfmake ul object', () => {
    expect(toPdfMakeObject('- Hello\n- World')).toEqual([
      {
        ul: [
          {
            text: 'Hello',
          },
          {
            text: 'World',
          },
        ],
      },
    ]);
  });

  it('should translate an ordered list h5 to pdfmake ol object', () => {
    expect(toPdfMakeObject('1. Hello\n2. World')).toEqual([
      {
        ol: [
          {
            text: 'Hello',
          },
          {
            text: 'World',
          },
        ],
      },
    ]);
  });
});
