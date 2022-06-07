import { toPdfMakeObject } from '../src';

describe('Transform objects', () => {
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

  it('should translate a strong text to a bold text object', () => {
    expect(toPdfMakeObject('**Hello** World')).toEqual([
      { text: [{ text: 'Hello', bold: true }, { text: ' World' }] },
    ]);
    expect(toPdfMakeObject('**Hello World**')).toEqual([
      { text: [{ text: 'Hello World', bold: true }] },
    ]);
  });

  it('should translate a italic text to a italics text object', () => {
    expect(toPdfMakeObject('*Hello World*')).toEqual([
      { text: [{ text: 'Hello World', italics: true }] },
    ]);
  });

  it('should translate a bold italic text to a bold/italics text object', () => {
    expect(toPdfMakeObject('***Hello World***')).toEqual([
      { text: [{ text: 'Hello World', bold: true, italics: true }] },
    ]);
    expect(toPdfMakeObject('Testing ***Hello World***')).toEqual([
      {
        text: [
          { text: 'Testing ' },
          { text: 'Hello World', bold: true, italics: true },
        ],
      },
    ]);
  });
});
