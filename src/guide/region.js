const Util = require('../util');
const PathUtil = require('./util/path');
const Guide = require('./base');

class Region extends Guide {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();

    return Util.mix({}, cfg, {
      name: 'region',
      zIndex: 1,
      start: null,
      end: null,
      style: {
        lineWidth: 0,
        fill: '#CCD7EB',
        opacity: 0.4
      }
    });
  }

  render(coord, group) {
    const self = this;
    const rectStyle = self.get('style');
    const path = self._getPath(coord);

    const regionGroup = group.addShape('path', {
      zIndex: self.get('zIndex'),
      attrs: Util.mix({
        path
      }, rectStyle)
    });
    regionGroup.name = 'guide-region';
    self.get('appendInfo') && regionGroup.setSilent('appendInfo', self.get('appendInfo'));
    self.set('el', regionGroup);
  }

  _getPath(coord) {
    const self = this;
    let start = self.parsePoint(coord, self.get('start'), false);
    let end = self.parsePoint(coord, self.get('end'), false);

    let path;
    if (coord.isPolar) {
      path = [
        [ 'M', start.x, start.y ],
        [ 'L', end.x, start.y ],
        [ 'L', end.x, end.y ],
        [ 'L', start.x, end.y ],
        [ 'z' ]
      ];
      path = PathUtil.convertPolarPath(coord, path);
    } else {
      start = coord.convert(start);
      end = coord.convert(end);

      path = [
        [ 'M', start.x, start.y ],
        [ 'L', end.x, start.y ],
        [ 'L', end.x, end.y ],
        [ 'L', start.x, end.y ],
        [ 'z' ]
      ];
    }
    return path;
  }
}

module.exports = Region;