import { toPdfMakeObject } from '../src';

describe('Transform objects', () => {
  it('should translate a markdown anchor to text with link pdfmake object', () => {
    expect(toPdfMakeObject('Hello [Google](https://google.com/)!', {
      a: {
        fontSize: 12
      },
      p: {
        fontSize: 16
      }
    })).toEqual([
      {
        text: [
          { text: 'Hello ' },
          { text: 'Google', link: 'https://google.com/', fontSize: 12 },
          { text: '!' },
        ],
        fontSize: 16
      },
    ]);
  });

  it('should translate a markdown anchor with to text bold and fontSize 16 with link pdfmake object', () => {
    expect(
      toPdfMakeObject('**Hello [Google](https://google.com/)!**', {
        a: {
          fontSize: 14,
        },
        p: {
          fontSize: 16,
        },
      })
    ).toEqual(
      [
        {
          fontSize: 16,
          text: [
            {
              text: [
                {
                  text: "Hello ",
                  bold: true,
                },
                {
                  text: "Google",
                  bold: true,
                  link: "https://google.com/",
                  fontSize: 14,
                },
                {
                  text: "!",
                  bold: true,
                }
              ]
            }
          ]
        }
      ]
    );
  });

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
    expect(toPdfMakeObject('###### Hello World')).toEqual([
      { text: 'Hello World' },
    ]);
  });

  it('should translate an unordered list to pdfmake ul object', () => {
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

  it('should translate an ordered list to pdfmake ol object', () => {
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
    expect(toPdfMakeObject('***Hello World***')).toEqual(
      [
        {
          text: [
            {
              text: [
                {
                  text: 'Hello World',
                  bold: true,
                  italics: true,
                }
              ]
            }
          ]
        }
      ]
    );
    expect(toPdfMakeObject('Testing ***Hello World***')).toEqual(
      [
        {
          text: [
            {
              text: "Testing "
            },
            {
              text: [
                {
                  text: 'Hello World',
                  bold: true,
                  italics: true,
                }
              ]
            }
          ]
        }
      ]
    );
  });

  it('should translate the style options to pdfmake object', () => {
    // Paragraph
    expect(toPdfMakeObject('Hello World', { p: { fontSize: 10 } })).toEqual([
      { text: 'Hello World', fontSize: 10 },
    ]);
    // Bold Paragraph
    expect(
      toPdfMakeObject('**Hello World**', { p: { fontSize: 10 } })
    ).toEqual(
      [
        {
          text: [
            {
              text: 'Hello World',
              bold: true,
            },
          ],
          fontSize: 10,
        }
      ]
    );
    // Italic Paragraph
    expect(toPdfMakeObject('*Hello World*', { p: { fontSize: 10 } })).toEqual(
      [
        {
          text: [
            {
              text: 'Hello World',
              italics: true,
            },
          ],
          fontSize: 10,
        }
      ]
    );
    // Bold/Italic Paragraph
    expect(
      toPdfMakeObject('***Hello World***', { p: { fontSize: 10 } })
    ).toEqual(
      [
        {
          text: [
            {
              text: [
                {
                  text: 'Hello World',
                  bold: true,
                  italics: true
                }
              ]
            }
          ],
          fontSize: 10
        }
      ]
    );
    // H1
    expect(toPdfMakeObject('# Hello World', { h1: { fontSize: 20 } })).toEqual([
      {
        text: 'Hello World',
        fontSize: 20,
      },
    ]);
    // H2
    expect(toPdfMakeObject('## Hello World', { h2: { fontSize: 18 } })).toEqual(
      [
        {
          text: 'Hello World',
          fontSize: 18,
        },
      ]
    );
    // H3
    expect(
      toPdfMakeObject('### Hello World', { h3: { fontSize: 16 } })
    ).toEqual([
      {
        text: 'Hello World',
        fontSize: 16,
      },
    ]);
    // H4
    expect(
      toPdfMakeObject('#### Hello World', { h4: { fontSize: 14 } })
    ).toEqual([
      {
        text: 'Hello World',
        fontSize: 14,
      },
    ]);
    // H5
    expect(
      toPdfMakeObject('##### Hello World', { h5: { fontSize: 12 } })
    ).toEqual([
      {
        text: 'Hello World',
        fontSize: 12,
      },
    ]);
    // H6
    expect(
      toPdfMakeObject('###### Hello World', { h6: { fontSize: 10 } })
    ).toEqual([
      {
        text: 'Hello World',
        fontSize: 10,
      },
    ]);
    // Unordered List
    expect(
      toPdfMakeObject('- Hello\n- World', { ul: { margin: [10, 10] } })
    ).toEqual([
      {
        ul: [
          {
            text: 'Hello',
          },
          {
            text: 'World',
          },
        ],
        margin: [10, 10],
      },
    ]);
    // Ordered List
    expect(
      toPdfMakeObject('1. Hello\n2. World', { ol: { margin: [10, 10] } })
    ).toEqual([
      {
        ol: [
          {
            text: 'Hello',
          },
          {
            text: 'World',
          },
        ],
        margin: [10, 10],
      },
    ]);
    // List Item
    expect(
      toPdfMakeObject('- Hello\n- World', { li: { fontSize: 10 } })
    ).toEqual([
      {
        ul: [
          {
            text: 'Hello',
            fontSize: 10,
          },
          {
            text: 'World',
            fontSize: 10,
          },
        ],
      },
    ]);
  });
});
