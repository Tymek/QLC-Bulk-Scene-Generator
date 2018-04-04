export default function makeChaser (props) {
  let {
    id,
    name,
    path,
    direction,
    runOrder,
    Scenes,
  } = {
    id: 0,
    name: 'Chaser',
    path: '',
    direction: 'Forward',
    runOrder: 'Loop',
    Scenes: [],
    ...props,
  }

  let speed = {
    duration: 4294967294,
    fadeIn: 0,
    fadeOut: 0,
  }

  let speedModes = {
    fadeIn: 'Default',
    fadeOut: 'Default',
    duration: 'Common',
  }

  function getId () {
    return id
  }

  function toXmlStructure () {
    return {
      Function: {
        attributes: {
          ID: id,
          Type: 'Chaser',
          Name: name,
          Path: path,
        },
        childNodes: [
          {
            Speed: {
              attributes: {
                FadeIn: speed.fadeIn,
                FadeOut: speed.fadeOut,
                Duration: speed.duration,
              }
            },
            SpeedModes: {
              attributes: {
                FadeIn: speedModes.fadeIn,
                FadeOut: speedModes.fadeOut,
                Duration: speedModes.duration,
              }
            },
            Direction: {
              childNodes: direction,
            },
            RunOrder: {
              childNodes: runOrder,
            },
          },
          Scenes.map((Scene, index) => ({
            Step: {
              attributes: {
                Number: 255-index,
                FadeIn: '0',
                Hold: '0',
                FadeOut: '0',
              },
              childNodes: Scene.getId(),
            }
          })).reverse(),
        ],
      },
    }
  }

  return Object.freeze({
    getId,
    toXmlStructure,
  })
}
