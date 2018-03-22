export default function makeScene (props) {
  let {
    id,
    name,
    path,
    Fixtures,
  } = {
    id: 0,
    name: 'Scene',
    path: '',
    Fixtures: [],
    ...props,
  }

  function getId () {
    return id
  }

	function toXmlStructure () {
    return {
      Function: {
        attributes: {
          ID: id,
          Type: 'Scene',
          Name: name,
          Path: path,
        },
        childNodes: [
          {
            Speed: {
              attributes: {
                FadeIn: '0',
                FadeOut: '0',
                Duration: '0',
              },
            },
          },
          Fixtures.map(Fixture => ({
            FixtureVal: {
              attributes: {
                ID: Fixture.id,
              },
              childNodes: Fixture.channels.map(channel =>
                `${channel.id},${channel.value}`
              ).join(',')
            },
          })),
        ],
      },
    }
  }

  return Object.freeze({
    getId,
    toXmlStructure,
  })
}
