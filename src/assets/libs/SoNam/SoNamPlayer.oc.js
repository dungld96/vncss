/* eslint-disable */
const _0x542729 = (function () {
  let _0x4632cd = !![];
  return function (_0x99daa5, _0x199dfe) {
    const _0x42b1a9 = _0x4632cd
      ? function () {
          if (_0x199dfe) {
            const _0x18cd4c = _0x199dfe['apply'](_0x99daa5, arguments);
            _0x199dfe = null;
            return _0x18cd4c;
          }
        }
      : function () {};
    _0x4632cd = ![];
    return _0x42b1a9;
  };
})();
const _0x2825c1 = _0x542729(this, function () {
  let _0xd37c92;
  try {
    const _0x565cbc = Function('return\x20(function()\x20' + '{}.constructor(\x22return\x20this\x22)(\x20)' + ');');
    _0xd37c92 = _0x565cbc();
  } catch (_0x48cfac) {
    _0xd37c92 = window;
  }
  const _0x450a66 = (_0xd37c92['console'] = _0xd37c92['console'] || {});
  const _0x54a1c9 = ['log', 'warn', 'info', 'error', 'exception', 'table', 'trace'];
  for (let _0xa812c1 = 0x0; _0xa812c1 < _0x54a1c9['length']; _0xa812c1++) {
    const _0x5ddf3d = _0x542729['constructor']['prototype']['bind'](_0x542729);
    const _0x24b2d6 = _0x54a1c9[_0xa812c1];
    const _0x3c4c0b = _0x450a66[_0x24b2d6] || _0x5ddf3d;
    _0x5ddf3d['__proto__'] = _0x542729['bind'](_0x542729);
    _0x5ddf3d['toString'] = _0x3c4c0b['toString']['bind'](_0x3c4c0b);
    _0x450a66[_0x24b2d6] = _0x5ddf3d;
  }
});
// _0x2825c1();
function appendByteArray(_0x25b8b2, _0x54764c) {
  let _0x2fd6c4 = new Uint8Array((_0x25b8b2['byteLength'] | 0x0) + (_0x54764c['byteLength'] | 0x0));
  _0x2fd6c4['set'](_0x25b8b2, 0x0);
  _0x2fd6c4['set'](_0x54764c, _0x25b8b2['byteLength'] | 0x0);
  return _0x2fd6c4;
}
function appendByteArrayAsync(_0x3e06d5, _0x20d78b) {
  return new Promise((_0x5daf08, _0x4083ec) => {
    let _0x389748 = new Blob([_0x3e06d5, _0x20d78b]);
    let _0x15317c = new FileReader();
    _0x15317c['addEventListener']('loadend', function () {
      _0x5daf08();
    });
    _0x15317c['readAsArrayBuffer'](_0x389748);
  });
}
function base64ToArrayBuffer(_0x5dbff7) {
  var _0x3b3e0b = window['atob'](_0x5dbff7);
  var _0x15292d = _0x3b3e0b['length'];
  var _0x2f4219 = new Uint8Array(_0x15292d);
  for (var _0x1e4c36 = 0x0; _0x1e4c36 < _0x15292d; _0x1e4c36++) {
    _0x2f4219[_0x1e4c36] = _0x3b3e0b['charCodeAt'](_0x1e4c36);
  }
  return _0x2f4219['buffer'];
}
function u8ToBase64(_0x3113bb) {
  return btoa(String['fromCharCode']['apply'](null, _0x3113bb));
}
function hexToByteArray(_0x3ed360) {
  let _0x16f6bd = _0x3ed360['length'] >> 0x1;
  var _0x2d46e9 = new Uint8Array(_0x16f6bd);
  for (var _0xa2a712 = 0x0; _0xa2a712 < _0x16f6bd; _0xa2a712++) {
    _0x2d46e9[_0xa2a712] = parseInt(_0x3ed360['substr'](_0xa2a712 << 0x1, 0x2), 0x10);
  }
  return _0x2d46e9;
}
function concatenate(_0x173fa3, ..._0x2627b0) {
  let _0x415355 = 0x0;
  for (let _0x215b84 of _0x2627b0) {
    _0x415355 += _0x215b84['length'];
  }
  let _0x493748 = new _0x173fa3(_0x415355);
  let _0x1c674b = 0x0;
  for (let _0x475551 of _0x2627b0) {
    _0x493748['set'](_0x475551, _0x1c674b);
    _0x1c674b += _0x475551['length'];
  }
  return _0x493748;
}
function bitSlice(_0x9a70, _0x3b1c37 = 0x0, _0x558c13 = _0x9a70['byteLength'] * 0x8) {
  let _0x38e6a3 = Math['ceil']((_0x558c13 - _0x3b1c37) / 0x8);
  let _0x160fa7 = new Uint8Array(_0x38e6a3);
  let _0x397b5d = (_0x3b1c37 / 0x8) >> 0x0;
  let _0x3b281f = ((_0x558c13 / 0x8) >> 0x0) - 0x1;
  let _0x4c8066 = _0x3b1c37 % 0x8;
  let _0x45c951 = 0x8 - _0x4c8066;
  let _0x48bae = 0x8 - (_0x558c13 % 0x8);
  for (let _0x5c3fc6 = 0x0; _0x5c3fc6 < _0x38e6a3; ++_0x5c3fc6) {
    let _0x412a2e = 0x0;
    if (_0x5c3fc6 < _0x3b281f) {
      _0x412a2e = _0x9a70[_0x397b5d + _0x5c3fc6 + 0x1] >> _0x45c951;
      if (_0x5c3fc6 == _0x3b281f - 0x1 && _0x48bae < 0x8) {
        _0x412a2e >>= _0x48bae;
        _0x412a2e <<= _0x48bae;
      }
    }
    _0x160fa7[_0x5c3fc6] = (_0x9a70[_0x397b5d + _0x5c3fc6] << _0x4c8066) | _0x412a2e;
  }
  return _0x160fa7;
}
class BitArray {
  constructor(_0x5b4e1b) {
    this['src'] = new DataView(_0x5b4e1b['buffer'], _0x5b4e1b['byteOffset']);
    this['bitpos'] = 0x0;
    this['byte'] = 0x0;
    this['bytepos'] = 0x0;
  }
  ['readBits'](_0x605671) {
    if (0x20 < (_0x605671 | 0x0) || 0x0 === (_0x605671 | 0x0)) {
      throw new Error('too\x20big');
    }
    let _0x15dc1d = 0x0;
    this['byte'] = this['src']['getUint8'](this['bytepos']);
    for (let _0xdab99f = 0x1; _0xdab99f <= _0x605671; ++_0xdab99f) {
      _0x15dc1d = ((_0x15dc1d | 0x0) << 0x1) | (((this['byte'] | 0x0) >> (0x8 - ++this['bitpos'])) & 0x1);
      if ((this['bitpos'] | 0x0) >= 0x8) {
        this['byte'] = this['src']['getUint8'](++this['bytepos']);
      }
      this['bitpos'] %= 0x8;
    }
    return _0x15dc1d;
  }
  ['skipBits'](_0x4dad14) {
    this['bitpos'] += (_0x4dad14 | 0x0) % 0x8;
    this['bytepos'] += ((_0x4dad14 | 0x0) / 0x8) >> 0x0;
    this['byte'] = this['src']['getUint8'](this['bytepos']);
  }
}
class ExpGolomb {
  constructor(_0x231703) {
    this['data'] = _0x231703;
    this['bytesAvailable'] = this['data']['byteLength'];
    this['word'] = 0x0;
    this['bitsAvailable'] = 0x0;
  }
  ['loadWord']() {
    var _0x2c1b13 = this['data']['byteLength'] - this['bytesAvailable'],
      _0x19b8d1 = new Uint8Array(0x4),
      _0x269630 = Math['min'](0x4, this['bytesAvailable']);
    if (_0x269630 === 0x0) {
      throw new Error('no\x20bytes\x20available');
    }
    _0x19b8d1['set'](this['data']['subarray'](_0x2c1b13, _0x2c1b13 + _0x269630));
    this['word'] = new DataView(_0x19b8d1['buffer'], _0x19b8d1['byteOffset'])['getUint32'](0x0);
    this['bitsAvailable'] = _0x269630 * 0x8;
    this['bytesAvailable'] -= _0x269630;
  }
  ['skipBits'](_0x21a571) {
    var _0x3aebae;
    if (this['bitsAvailable'] > _0x21a571) {
      this['word'] <<= _0x21a571;
      this['bitsAvailable'] -= _0x21a571;
    } else {
      _0x21a571 -= this['bitsAvailable'];
      _0x3aebae = _0x21a571 >> 0x3;
      _0x21a571 -= _0x3aebae >> 0x3;
      this['bytesAvailable'] -= _0x3aebae;
      this['loadWord']();
      this['word'] <<= _0x21a571;
      this['bitsAvailable'] -= _0x21a571;
    }
  }
  ['readBits'](_0x560393) {
    var _0x5393b1 = Math['min'](this['bitsAvailable'], _0x560393),
      _0x2fa5d8 = this['word'] >>> (0x20 - _0x5393b1);
    if (_0x560393 > 0x20) {
      console['log']('Cannot\x20read\x20more\x20than\x2032\x20bits\x20at\x20a\x20time');
    }
    this['bitsAvailable'] -= _0x5393b1;
    if (this['bitsAvailable'] > 0x0) {
      this['word'] <<= _0x5393b1;
    } else if (this['bytesAvailable'] > 0x0) {
      this['loadWord']();
    }
    _0x5393b1 = _0x560393 - _0x5393b1;
    if (_0x5393b1 > 0x0) {
      return (_0x2fa5d8 << _0x5393b1) | this['readBits'](_0x5393b1);
    } else {
      return _0x2fa5d8;
    }
  }
  ['skipLZ']() {
    var _0x55cd76;
    for (_0x55cd76 = 0x0; _0x55cd76 < this['bitsAvailable']; ++_0x55cd76) {
      if (0x0 !== (this['word'] & (0x80000000 >>> _0x55cd76))) {
        this['word'] <<= _0x55cd76;
        this['bitsAvailable'] -= _0x55cd76;
        return _0x55cd76;
      }
    }
    this['loadWord']();
    return _0x55cd76 + this['skipLZ']();
  }
  ['skipUEG']() {
    this['skipBits'](0x1 + this['skipLZ']());
  }
  ['skipEG']() {
    this['skipBits'](0x1 + this['skipLZ']());
  }
  ['readUEG']() {
    var _0x4e60a2 = this['skipLZ']();
    return this['readBits'](_0x4e60a2 + 0x1) - 0x1;
  }
  ['readEG']() {
    var _0xc00042 = this['readUEG']();
    if (0x1 & _0xc00042) {
      return (0x1 + _0xc00042) >>> 0x1;
    } else {
      return -0x1 * (_0xc00042 >>> 0x1);
    }
  }
  ['readBoolean']() {
    return 0x1 === this['readBits'](0x1);
  }
  ['readUByte']() {
    return this['readBits'](0x8);
  }
  ['readUShort']() {
    return this['readBits'](0x10);
  }
  ['readUInt']() {
    return this['readBits'](0x20);
  }
  ['skipScalingList'](_0x59f4af) {
    var _0x29d059 = 0x8,
      _0x35df12 = 0x8,
      _0x2e9f09,
      _0x20ea9e;
    for (_0x2e9f09 = 0x0; _0x2e9f09 < _0x59f4af; _0x2e9f09++) {
      if (_0x35df12 !== 0x0) {
        _0x20ea9e = this['readEG']();
        _0x35df12 = (_0x29d059 + _0x20ea9e + 0x100) % 0x100;
      }
      _0x29d059 = _0x35df12 === 0x0 ? _0x29d059 : _0x35df12;
    }
  }
  ['readSPS']() {
    var _0x166097 = 0x0,
      _0x1d95dd = 0x0,
      _0x2e06de = 0x0,
      _0x209f1d = 0x0,
      _0x404256 = 0x1,
      _0x3de004,
      _0x36901c,
      _0x5c10e6,
      _0x2d416c,
      _0x36a64c,
      _0x30d481,
      _0x25114f,
      _0x2e060e,
      _0x38ecf8;
    this['readUByte']();
    _0x3de004 = this['readUByte']();
    _0x36901c = this['readBits'](0x5);
    this['skipBits'](0x3);
    _0x5c10e6 = this['readUByte']();
    this['skipUEG']();
    if (
      _0x3de004 === 0x64 ||
      _0x3de004 === 0x6e ||
      _0x3de004 === 0x7a ||
      _0x3de004 === 0xf4 ||
      _0x3de004 === 0x2c ||
      _0x3de004 === 0x53 ||
      _0x3de004 === 0x56 ||
      _0x3de004 === 0x76 ||
      _0x3de004 === 0x80
    ) {
      var _0x175d70 = this['readUEG']();
      if (_0x175d70 === 0x3) {
        this['skipBits'](0x1);
      }
      this['skipUEG']();
      this['skipUEG']();
      this['skipBits'](0x1);
      if (this['readBoolean']()) {
        _0x2e060e = _0x175d70 !== 0x3 ? 0x8 : 0xc;
        for (_0x38ecf8 = 0x0; _0x38ecf8 < _0x2e060e; _0x38ecf8++) {
          if (this['readBoolean']()) {
            if (_0x38ecf8 < 0x6) {
              this['skipScalingList'](0x10);
            } else {
              this['skipScalingList'](0x40);
            }
          }
        }
      }
    }
    this['skipUEG']();
    var _0xc6085b = this['readUEG']();
    if (_0xc6085b === 0x0) {
      this['readUEG']();
    } else if (_0xc6085b === 0x1) {
      this['skipBits'](0x1);
      this['skipEG']();
      this['skipEG']();
      _0x2d416c = this['readUEG']();
      for (_0x38ecf8 = 0x0; _0x38ecf8 < _0x2d416c; _0x38ecf8++) {
        this['skipEG']();
      }
    }
    this['skipUEG']();
    this['skipBits'](0x1);
    _0x36a64c = this['readUEG']();
    _0x30d481 = this['readUEG']();
    _0x25114f = this['readBits'](0x1);
    if (_0x25114f === 0x0) {
      this['skipBits'](0x1);
    }
    this['skipBits'](0x1);
    if (this['readBoolean']()) {
      _0x166097 = this['readUEG']();
      _0x1d95dd = this['readUEG']();
      _0x2e06de = this['readUEG']();
      _0x209f1d = this['readUEG']();
    }
    if (this['readBoolean']()) {
      if (this['readBoolean']()) {
        let _0x20a254;
        const _0x2e1f08 = this['readUByte']();
        switch (_0x2e1f08) {
          case 0x1:
            _0x20a254 = [0x1, 0x1];
            break;
          case 0x2:
            _0x20a254 = [0xc, 0xb];
            break;
          case 0x3:
            _0x20a254 = [0xa, 0xb];
            break;
          case 0x4:
            _0x20a254 = [0x10, 0xb];
            break;
          case 0x5:
            _0x20a254 = [0x28, 0x21];
            break;
          case 0x6:
            _0x20a254 = [0x18, 0xb];
            break;
          case 0x7:
            _0x20a254 = [0x14, 0xb];
            break;
          case 0x8:
            _0x20a254 = [0x20, 0xb];
            break;
          case 0x9:
            _0x20a254 = [0x50, 0x21];
            break;
          case 0xa:
            _0x20a254 = [0x12, 0xb];
            break;
          case 0xb:
            _0x20a254 = [0xf, 0xb];
            break;
          case 0xc:
            _0x20a254 = [0x40, 0x21];
            break;
          case 0xd:
            _0x20a254 = [0xa0, 0x63];
            break;
          case 0xe:
            _0x20a254 = [0x4, 0x3];
            break;
          case 0xf:
            _0x20a254 = [0x3, 0x2];
            break;
          case 0x10:
            _0x20a254 = [0x2, 0x1];
            break;
          case 0xff: {
            _0x20a254 = [
              (this['readUByte']() << 0x8) | this['readUByte'](),
              (this['readUByte']() << 0x8) | this['readUByte'](),
            ];
            break;
          }
        }
        if (_0x20a254) {
          _0x404256 = _0x20a254[0x0] / _0x20a254[0x1];
        }
      }
    }
    return {
      width: Math['ceil'](((_0x36a64c + 0x1) * 0x10 - _0x166097 * 0x2 - _0x1d95dd * 0x2) * _0x404256),
      height: (0x2 - _0x25114f) * (_0x30d481 + 0x1) * 0x10 - (_0x25114f ? 0x2 : 0x4) * (_0x2e06de + _0x209f1d),
    };
  }
  ['readSliceType']() {
    this['readUByte']();
    this['readUEG']();
    return this['readUEG']();
  }
}
class MSE {
  static get ['ErrorNotes']() {
    return {
      [MediaError['MEDIA_ERR_ABORTED']]: 'fetching\x20process\x20aborted\x20by\x20user',
      [MediaError['MEDIA_ERR_NETWORK']]: 'error\x20occurred\x20when\x20downloading',
      [MediaError['MEDIA_ERR_DECODE']]: 'error\x20occurred\x20when\x20decoding',
      [MediaError['MEDIA_ERR_SRC_NOT_SUPPORTED']]: 'audio/video\x20not\x20supported',
    };
  }
  static ['isSupported'](_0x579035 = [MSE['CODEC_AVC_BASELINE'], MSE['CODEC_AAC']]) {
    return (
      window['MediaSource'] &&
      window['MediaSource']['isTypeSupported']('video/mp4;\x20codecs=\x22' + _0x579035['join'](',') + '\x22')
    );
  }
  constructor(_0x563d4f) {
    this['players'] = _0x563d4f;
    this['eventSource'] = new EventEmitter();
    this['reset']();
  }
  ['destroy']() {
    this['clear']();
    this['eventSource']['destroy']();
  }
  ['play']() {
    this['players']['forEach']((_0x31d47) => {
      _0x31d47['play']();
    });
  }
  ['resetBuffers']() {
    this['players']['forEach']((_0x1f1132) => {
      _0x1f1132['pause']();
      _0x1f1132['currentTime'] = 0x0;
    });
    let _0x402b81 = [];
    for (let _0x29ce4b of this['buffers']['values']()) {
      _0x402b81['push'](_0x29ce4b['clear']());
    }
    return Promise['all'](_0x402b81)['then'](() => {
      this['mediaSource']['endOfStream']();
      this['mediaSource']['duration'] = 0x0;
      this['mediaSource']['clearLiveSeekableRange']();
      this['play']();
    });
  }
  ['clear']() {
    for (let _0x38730f in this['buffers']) {
      this['buffers'][_0x38730f]['destroy']();
      delete this['buffers'][_0x38730f];
    }
  }
  ['doCleanup']() {
    for (let _0x13bea7 in this['buffers']) {
      this['buffers'][_0x13bea7]['doCleanup']();
    }
  }
  ['reset']() {
    this['updating'] = ![];
    this['resolved'] = ![];
    this['buffers'] = {};
    this['mediaSource'] = new MediaSource();
    this['players']['forEach']((_0x10946a) => {
      _0x10946a['src'] = URL['createObjectURL'](this['mediaSource']);
    });
    this['mediaReady'] = new Promise((_0xe3ca9b, _0x5b50be) => {
      this['mediaSource']['addEventListener']('sourceopen', () => {
        console['log']('Media\x20source\x20opened:\x20' + this['mediaSource']['readyState']);
        if (!this['resolved']) {
          this['resolved'] = !![];
          _0xe3ca9b();
        }
      });
      this['mediaSource']['addEventListener']('sourceended', () => {
        console['log']('Media\x20source\x20ended:\x20' + this['mediaSource']['readyState']);
      });
      this['mediaSource']['addEventListener']('sourceclose', () => {
        console['log']('Media\x20source\x20closed:\x20' + this['mediaSource']['readyState']);
        this['eventSource']['dispatchEvent']('sourceclose');
      });
    });
  }
  ['setCodec'](_0x5ba34a, _0x4ddf10) {
    return this['mediaReady']['then'](() => {
      this['buffers'][_0x5ba34a] = new Buffer(this, _0x4ddf10);
    });
  }
  ['feed'](_0x13d442, _0x5c2fd6) {
    if (this['buffers'][_0x13d442]) {
      this['buffers'][_0x13d442]['feed'](_0x5c2fd6);
    }
  }
}
const listener = Symbol('event_listener');
const listeners = Symbol('event_listeners');
class Remuxer {
  static get ['TrackConverters']() {
    return { H264: H264TrackConverter };
  }
  constructor() {
    this['initialized'] = ![];
    this['initSegment'] = null;
    this['tracks'] = {};
    this['codecs'] = [];
    this['streams'] = {};
    this['enabled'] = ![];
    this['mse_ready'] = !![];
    this['errorListener'] = this['sendTeardown']['bind'](this);
    this['closeListener'] = this['sendTeardown']['bind'](this);
    this['count'] = 0x0;
    this['track_type'] = null;
  }
  ['setTrack'](_0x3d2374, _0x5dbbd1) {
    let _0x30c753 = _0x3d2374['rtpmap'][_0x3d2374['fmt'][0x0]]['name'];
    this['streams'][_0x3d2374['type']] = _0x5dbbd1;
    if (Remuxer['TrackConverters'][_0x30c753]) {
      this['tracks'][_0x3d2374['type']] = new Remuxer['TrackConverters'][_0x30c753](_0x3d2374);
    } else {
      Log['warn'](
        _0x3d2374['type'] +
          '\x20track\x20is\x20not\x20attached\x20cause\x20there\x20is\x20no\x20remuxer\x20for\x20' +
          _0x30c753
      );
    }
  }
  ['setTimeOffset'](_0x41f72b, _0x147f40) {
    if (this['tracks'][_0x147f40['type']]) {
      this['tracks'][_0x147f40['type']]['timeOffset'] = _0x41f72b / this['tracks'][_0x147f40['type']]['scaleFactor'];
    }
  }
  ['init']() {
    let _0xe96719 = [];
    let _0x238ef9 = [];
    this['codecs'] = [];
    for (let _0x2cdd6d in this['tracks']) {
      let _0x12b794 = this['tracks'][_0x2cdd6d];
      if (!MSE['isSupported']([_0x12b794['codecstring']])) {
        throw new Error(
          _0x12b794['mp4track']['type'] + '\x20codec\x20' + _0x12b794['codecstring'] + '\x20is\x20not\x20supported'
        );
      }
      _0xe96719['push'](_0x12b794['mp4track']);
      this['codecs']['push'](_0x12b794['codecstring']);
      _0x238ef9['push'](this['initMSE'](_0x2cdd6d, _0x12b794['mp4track']['codec']));
      this['track_type'] = _0x2cdd6d;
      this['initSegment'] = MP4['initSegment'](_0xe96719, 0x15f90, 0x15f90);
    }
    this['initialized'] = !![];
    Promise['all'](_0x238ef9)['then'](() => {
      this['mse']['play']();
      this['enabled'] = !![];
    });
  }
  ['initMSE'](_0x366085) {
    if (MSE['isSupported'](this['codecs'])) {
      return this['mse']
        ['setCodec'](_0x366085, 'video/mp4;\x20codecs=\x22' + this['codecs']['join'](',\x20') + '\x22')
        ['then'](() => {
          this['mse']['feed'](_0x366085, this['initSegment']);
        });
    } else {
      throw new Error('Codecs\x20are\x20not\x20supported');
      Log('Codec\x20không\x20hỗ\x20trợ', 'error');
    }
  }
  ['attachMSE'](_0x255257) {
    if (this['mse']) {
      this['detachMSE']();
    }
    this['mse'] = _0x255257;
    this['mse']['eventSource']['addEventListener']('error', this['errorListener']);
    this['mse']['eventSource']['addEventListener']('sourceclose', this['closeListener']);
    if (this['initialized']) {
      this['initMSE']();
    }
  }
  ['detachMSE']() {
    if (this['mse']) {
      this['mse']['eventSource']['removeEventListener']('error', this['errorListener']);
      this['mse']['eventSource']['removeEventListener']('sourceclose', this['closeListener']);
      this['mse'] = null;
    }
  }
  ['sendTeardown']() {
    Log('Xóa\x20hết\x20cache', 'info');
    this['mse_ready'] = ![];
    this['enabled'] = ![];
    this['initialized'] = ![];
  }
  ['flush']() {
    if (!this['mse_ready']) return;
    if (!this['initialized']) {
      for (let _0x5df521 in this['tracks']) {
        if (!this['tracks'][_0x5df521]['readyToDecode']) return;
      }
      try {
        Log('Khởi\x20tạo\x20player\x20thành\x20công,\x20sẵn\x20sàng\x20decode\x20\x20', 'info');
        this['init']();
      } catch (_0xe56046) {
        this['eventSource']['dispatchEvent']('error', { reason: _0xe56046['message'] });
        Log('Có\x20lỗi\x20trong\x20quá\x20trình\x20khởi\x20tạo\x20player' + _0xe56046['message'], 'error');
        Log['error'](_0xe56046['message']);
        this['sendTeardown']();
        return;
      }
    }
    if (!this['enabled']) return;
    if (this['mse']) {
      for (let _0x5c78c9 in this['tracks']) {
        let _0x241a9 = this['tracks'][_0x5c78c9];
        let _0x47c2ac = _0x241a9['getPayload']();
        if (_0x47c2ac && _0x47c2ac['byteLength']) {
          let _0x222994 = MP4['mdat'](_0x47c2ac);
          let _0x54208a = MP4['moof'](_0x241a9['seq'], _0x241a9['firstDTS'], _0x241a9['mp4track']);
          this['mse']['feed'](_0x5c78c9, _0x54208a);
          this['mse']['feed'](_0x5c78c9, _0x222994);
          _0x241a9['flush']();
        }
      }
    } else {
      for (let _0x43ad10 in this['tracks']) {
        let _0x442903 = this['tracks'][_0x43ad10];
        _0x442903['flush']();
      }
    }
  }
  ['feedRTP'](_0x23dea0) {
    let _0x1fe4be = this['tracks'][_0x23dea0['media']['type']];
    if (_0x1fe4be) {
      _0x1fe4be['remux'](_0x23dea0);
    }
  }
}
class DestructibleEventListener {
  constructor(_0x8c0f30) {
    this[listener] = _0x8c0f30;
    this[listeners] = new Map();
  }
  ['destroy']() {
    this[listeners]['forEach']((_0x4f820d, _0x2c56b6) => {
      _0x4f820d['forEach']((_0x33a92e) => {
        this[listener]['removeEventListener'](_0x2c56b6, _0x33a92e);
      });
      _0x4f820d = null;
    });
    this[listeners] = null;
  }
  ['addEventListener'](_0x5cda28, _0x2f55c7) {
    if (!this[listeners]['has'](_0x5cda28)) {
      this[listeners]['set'](_0x5cda28, new Set());
    }
    this[listeners]['get'](_0x5cda28)['add'](_0x2f55c7);
    this[listener]['addEventListener'](_0x5cda28, _0x2f55c7, ![]);
  }
  ['removeEventListener'](_0x5476fe, _0x1886d7) {
    this[listener]['removeEventListener'](_0x5476fe, _0x1886d7, ![]);
    if (this[listeners]['has'](_0x5476fe)) {
      this[listeners]['set'](_0x5476fe, new Set());
      let _0x2e85fa = this[listeners]['get'](_0x5476fe);
      _0x2e85fa['delete'](_0x1886d7);
      if (!_0x2e85fa['size']) {
        this[listeners]['delete'](_0x5476fe);
      }
    }
  }
  ['dispatchEvent'](_0x20cc56) {
    this[listener]['dispatchEvent'](_0x20cc56);
  }
}
class EventEmitter {
  constructor() {
    this[listener] = new DestructibleEventListener(document['createElement']('div'));
  }
  ['destroy']() {
    this[listener]['destroy']();
    this[listener] = null;
  }
  ['addEventListener'](_0x5714c3, _0x4720c8) {
    this[listener]['addEventListener'](_0x5714c3, _0x4720c8, ![]);
  }
  ['removeEventListener'](_0x246186, _0x2c4502) {
    this[listener]['removeEventListener'](_0x246186, _0x2c4502, ![]);
  }
  ['dispatchEvent'](_0x211644, _0x2c0553) {
    this[listener]['dispatchEvent'](new CustomEvent(_0x211644, { detail: _0x2c0553 }));
  }
}
class Buffer {
  constructor(_0x1f8fa7, _0x346949) {
    this['mediaSource'] = _0x1f8fa7['mediaSource'];
    this['players'] = _0x1f8fa7['players'];
    this['cleaning'] = ![];
    this['parent'] = _0x1f8fa7;
    this['queue'] = [];
    this['cleanResolvers'] = [];
    this['codec'] = _0x346949;
    this['check'] = ![];
    this['flushBuffer'] = ![];
    this['bufferFlushInterval'] = setInterval(() => {
      this['flushBuffer'] = !![];
    }, 0xc350);
    console['log']('Use\x20codec:\x20' + _0x346949);
    this['sourceBuffer'] = this['mediaSource']['addSourceBuffer'](_0x346949);
    this['sourceBuffer']['mode'] = 'sequence';
    console['log']('SourceBuffer\x20mode\x20set\x20to\x20' + this['sourceBuffer']['mode']);
    this['sourceBuffer']['addEventListener']('updatestart', (_0x4e1bc4) => {
      if (this['cleaning']) {
        console['log'](this['codec'] + '\x20cleaning\x20start');
      }
    });
    this['sourceBuffer']['addEventListener']('update', (_0x2402ee) => {
      if (this['cleaning']) {
        console['log'](this['codec'] + '\x20cleaning\x20update');
      }
    });
    this['sourceBuffer']['addEventListener']('updateend', (_0x2ff66f) => {
      if (this['cleaning']) {
        console['log'](this['codec'] + '\x20cleaning\x20end');
        while (this['cleanResolvers']['length']) {
          let _0x1a1bd6 = this['cleanResolvers']['shift']();
          _0x1a1bd6();
        }
        this['cleaning'] = ![];
      } else {
      }
      let _0x5a80c7 = this['sourceBuffer']['buffered']['length'];
      if (
        this['flushBuffer'] &&
        !this['sourceBuffer']['updating'] &&
        _0x5a80c7 > 0x0 &&
        this['mediaSource']['duration']
      ) {
        console['log']('BUFFER\x20FLUSHING....');
        let _0x517c82 = 0x0;
        for (; _0x517c82 < this['sourceBuffer']['buffered']['length'] - 0x1; _0x517c82++) {
          if (
            !this['sourceBuffer']['updating'] &&
            this['sourceBuffer']['buffered']['end'](_0x517c82) - this['sourceBuffer']['buffered']['start'](_0x517c82) >
              0.5
          )
            this['sourceBuffer']['remove'](
              this['sourceBuffer']['buffered']['start'](_0x517c82),
              this['sourceBuffer']['buffered']['end'](_0x517c82)
            );
        }
        if (!this['sourceBuffer']['updating']) {
          if (
            this['sourceBuffer']['buffered']['end'](this['sourceBuffer']['buffered']['length'] - 0x1) -
              this['sourceBuffer']['buffered']['start'](this['sourceBuffer']['buffered']['length'] - 0x1) >
            0xa
          )
            this['sourceBuffer']['remove'](
              this['sourceBuffer']['buffered']['start'](this['sourceBuffer']['buffered']['length'] - 0x1),
              this['sourceBuffer']['buffered']['end'](this['sourceBuffer']['buffered']['length'] - 0x1) - 0x5
            );
          this['flushBuffer'] = ![];
        }
      }
      this['feedNext']();
    });
    this['sourceBuffer']['addEventListener']('error', (_0x1c045b) => {
      console['log']('Source\x20buffer\x20error:\x20' + this['mediaSource']['readyState']);
      if (this['mediaSource']['sourceBuffers']['length']) {
        this['mediaSource']['removeSourceBuffer'](this['sourceBuffer']);
      }
      this['parent']['eventSource']['dispatchEvent']('error');
    });
    this['sourceBuffer']['addEventListener']('abort', (_0x2b4e2b) => {
      console['log']('Source\x20buffer\x20aborted:\x20' + this['mediaSource']['readyState']);
      if (this['mediaSource']['sourceBuffers']['length']) {
        this['mediaSource']['removeSourceBuffer'](this['sourceBuffer']);
      }
      this['parent']['eventSource']['dispatchEvent']('error');
    });
    if (!this['sourceBuffer']['updating']) {
      this['feedNext']();
    }
  }
  ['destroy']() {
    clearInterval(this['bufferFlushInterval']);
    this['clear']();
    this['mediaSource']['removeSourceBuffer'](this['sourceBuffer']);
  }
  ['clear']() {
    this['queue'] = [];
    let _0x31163a = [];
    for (let _0xef970e = 0x0; _0xef970e < this['sourceBuffer']['buffered']['length']; ++_0xef970e) {
      this['cleaning'] = !![];
      _0x31163a['push'](
        new Promise((_0x43b490, _0x584025) => {
          this['cleanResolvers']['push'](_0x43b490);
        })
      );
    }
    return Promise['all'](_0x31163a);
  }
  ['feedNext']() {
    if (!this['sourceBuffer']['updating'] && !this['cleaning'] && this['queue']['length']) {
      if (
        this['sourceBuffer']['buffered']['length'] &&
        this['sourceBuffer']['buffered']['start'](this['sourceBuffer']['buffered']['length'] - 0x1) >
          this['players'][0x0]['currentTime']
      ) {
        this['players'][0x0]['currentTime'] = this['sourceBuffer']['buffered']['start'](
          this['sourceBuffer']['buffered']['length'] - 0x1
        );
      }
      if (
        this['sourceBuffer']['buffered']['length'] &&
        this['sourceBuffer']['buffered']['end'](this['sourceBuffer']['buffered']['length'] - 0x1) -
          this['sourceBuffer']['buffered']['start'](this['sourceBuffer']['buffered']['length'] - 0x1) >
          0x5
      ) {
        let _0x211287 =
          this['sourceBuffer']['buffered']['end'](this['sourceBuffer']['buffered']['length'] - 0x1) -
          this['players'][0x0]['currentTime'];
        if (_0x211287 > 0x1) {
          Log('Độ\x20trễ\x20>1s,\x20đồng\x20bộ\x20lại\x20dữ\x20liệu', 'warning');
          this['players'][0x0]['playbackRate'] = 1.5;
          this['players'][0x0]['play']();
          console['log']('speed\x201.5');
        }
        if (_0x211287 < 0.5 && this['players'][0x0]['playbackRate'] > 0x1) {
          this['players'][0x0]['playbackRate'] = 0x1;
          console['log']('speed\x201');
        }
      }
      if (!this['sourceBuffer']['updating']) this['doAppend'](this['queue']['shift']());
    }
  }
  ['doCleanup']() {
    if (this['sourceBuffer']['buffered']['length'] && !this['sourceBuffer']['updating'] && !this['cleaning']) {
    } else {
      if (!this['sourceBuffer']['updating']) this['feedNext']();
    }
  }
  ['doAppend'](_0x11ec94) {
    let _0x40a1ca = this['players'][0x0]['error'];
    if (_0x40a1ca) {
      if (!this['sourceBuffer']['updating'])
        console['log']('Error\x20occured:\x20' + MSE['ErrorNotes'][_0x40a1ca['code']]);
      Log('Có\x20lỗi\x20trong\x20quá\x20trình\x20giải\x20mã:\x20' + MSE['ErrorNotes'][_0x40a1ca['code']], 'error');
      try {
        this['mediaSource']['endOfStream']();
      } catch (_0x546a3d) {}
      this['parent']['eventSource']['dispatchEvent']('error');
    } else {
      try {
        if (!this['sourceBuffer']['updating']) this['sourceBuffer']['appendBuffer'](_0x11ec94);
      } catch (_0x2db1f3) {
        if (_0x2db1f3['name'] === 'QuotaExceededError') {
          console['log'](this['codec'] + '\x20quota\x20fail');
          this['doCleanup']();
          return;
        }
        console['log'](
          'Error\x20occured\x20while\x20appending\x20buffer.\x20' + _0x2db1f3['name'] + ':\x20' + _0x2db1f3['message']
        );
        Log(
          'Dữ\x20liệu\x20decode\x20không\x20thể\x20play:\x20' + _0x2db1f3['name'] + ':\x20' + _0x2db1f3['message'],
          'error'
        );
        this['parent']['eventSource']['dispatchEvent']('error');
      }
    }
  }
  ['feed'](_0x2db087) {
    if (this['queue']['length'] > 0x64) this['queue']['shift']();
    this['queue'] = this['queue']['concat'](_0x2db087);
    if (this['sourceBuffer'] && !this['sourceBuffer']['updating']) {
      this['feedNext']();
    }
  }
}
class SDPParser {
  constructor() {
    this['version'] = -0x1;
    this['origin'] = null;
    this['sessionName'] = null;
    this['timing'] = null;
    this['sessionBlock'] = {};
    this['media'] = {};
    this['tracks'] = {};
    this['mediaMap'] = {};
  }
  ['parse'](_0x5b9a57) {
    return new Promise((_0x21b87a, _0x490526) => {
      var _0x461625 = _0x5b9a57;
      var _0x3c7891 = !![];
      var _0x141bf5 = this['sessionBlock'];
      for (let _0x384fe1 of _0x461625['split']('\x0a')) {
        _0x384fe1 = _0x384fe1['replace'](/\r/, '');
        if (0x0 === _0x384fe1['length']) {
          continue;
        }
        switch (_0x384fe1['charAt'](0x0)) {
          case 'v':
            if (-0x1 !== this['version']) {
              console['log']('Version\x20present\x20multiple\x20times\x20in\x20SDP');
              _0x490526();
              return ![];
            }
            _0x3c7891 = _0x3c7891 && this['_parseVersion'](_0x384fe1);
            break;
          case 'o':
            if (null !== this['origin']) {
              console['log']('Origin\x20present\x20multiple\x20times\x20in\x20SDP');
              _0x490526();
              return ![];
            }
            _0x3c7891 = _0x3c7891 && this['_parseOrigin'](_0x384fe1);
            break;
          case 's':
            if (null !== this['sessionName']) {
              console['log']('Session\x20Name\x20present\x20multiple\x20times\x20in\x20SDP');
              _0x490526();
              return ![];
            }
            _0x384fe1 = 's=mychn';
            _0x3c7891 = _0x3c7891 && this['_parseSessionName'](_0x384fe1);
            break;
          case 't':
            if (null !== this['timing']) {
              console['log']('Timing\x20present\x20multiple\x20times\x20in\x20SDP');
              _0x490526();
              return ![];
            }
            _0x3c7891 = _0x3c7891 && this['_parseTiming'](_0x384fe1);
            break;
          case 'm':
            if (null !== _0x141bf5 && this['sessionBlock'] !== _0x141bf5) {
              this['media'][_0x141bf5['type']] = _0x141bf5;
            }
            _0x141bf5 = {};
            _0x141bf5['rtpmap'] = {};
            this['_parseMediaDescription'](_0x384fe1, _0x141bf5);
            break;
          case 'a':
            if (_0x384fe1 == 'a=rtpmap:96\x20H264/90000\x20') {
              console['log']('a=rtpmap:96\x20H264/90000\x20');
            }
            SDPParser['_parseAttribute'](_0x384fe1, _0x141bf5);
            break;
          default:
            console['log']('Ignored\x20unknown\x20SDP\x20directive:\x20' + _0x384fe1);
            break;
        }
        if (!_0x3c7891) {
          _0x490526();
          return;
        }
      }
      this['media'][_0x141bf5['type']] = _0x141bf5;
      _0x3c7891 ? _0x21b87a() : _0x490526();
    });
  }
  ['_parseVersion'](_0x5a4cad) {
    var _0x3f424d = _0x5a4cad['match'](/^v=([0-9]+)$/);
    if (0x0 === _0x3f424d['length']) {
      console['log']('\x27v=\x27\x20(Version)\x20formatted\x20incorrectly:\x20' + _0x5a4cad);
      return ![];
    }
    this['version'] = _0x3f424d[0x1];
    if (0x0 != this['version']) {
      console['log']('Unsupported\x20SDP\x20version:' + this['version']);
      return ![];
    }
    return !![];
  }
  ['_parseOrigin'](_0x26b11f) {
    var _0x284719 = _0x26b11f['match'](/^o=([^ ]+) ([0-9]+) ([0-9]+) (IN) (IP4|IP6) ([^ ]+)$/);
    if (0x0 === _0x284719['length']) {
      console['log']('\x27o=\x27\x20(Origin)\x20formatted\x20incorrectly:\x20' + _0x26b11f);
      return ![];
    }
    this['origin'] = {};
    this['origin']['username'] = _0x284719[0x1];
    this['origin']['sessionid'] = _0x284719[0x2];
    this['origin']['sessionversion'] = _0x284719[0x3];
    this['origin']['nettype'] = _0x284719[0x4];
    this['origin']['addresstype'] = _0x284719[0x5];
    this['origin']['unicastaddress'] = _0x284719[0x6];
    return !![];
  }
  ['_parseSessionName'](_0x406c82) {
    var _0x1f3130 = _0x406c82['match'](/^s=([^\r\n]+)$/);
    if (0x0 === _0x1f3130['length']) {
      console['log']('\x27s=\x27\x20(Session\x20Name)\x20formatted\x20incorrectly:\x20' + _0x406c82);
      return ![];
    }
    this['sessionName'] = _0x1f3130[0x1];
    return !![];
  }
  ['_parseTiming'](_0x455ed2) {
    var _0x47d6c0 = _0x455ed2['match'](/^t=([0-9]+) ([0-9]+)$/);
    if (0x0 === _0x47d6c0['length']) {
      console['log']('\x27t=\x27\x20(Timing)\x20formatted\x20incorrectly:\x20' + _0x455ed2);
      return ![];
    }
    this['timing'] = {};
    this['timing']['start'] = _0x47d6c0[0x1];
    this['timing']['stop'] = _0x47d6c0[0x2];
    return !![];
  }
  ['_parseMediaDescription'](_0x4859d0, _0x4991f6) {
    var _0x79ca6e = _0x4859d0['match'](/^m=([^ ]+) ([^ ]+) ([^ ]+)[ ]/);
    if (0x0 === _0x79ca6e['length']) {
      console['log']('\x27m=\x27\x20(Media)\x20formatted\x20incorrectly:\x20' + _0x4859d0);
      return ![];
    }
    _0x4991f6['type'] = _0x79ca6e[0x1];
    _0x4991f6['port'] = _0x79ca6e[0x2];
    _0x4991f6['proto'] = _0x79ca6e[0x3];
    _0x4991f6['fmt'] = _0x4859d0['substr'](_0x79ca6e[0x0]['length'])
      ['split']('\x20')
      ['map'](function (_0x2a4307, _0x4a5bbe, _0x226699) {
        return parseInt(_0x2a4307);
      });
    for (let _0x3b2037 of _0x4991f6['fmt']) {
      this['mediaMap'][_0x3b2037] = _0x4991f6;
    }
    return !![];
  }
  static ['_parseAttribute'](_0x3b0bf2, _0x9efef4) {
    if (null === _0x9efef4) {
      return !![];
    }
    var _0x4ae681;
    var _0x3b74ef = _0x3b0bf2['indexOf'](':');
    var _0x2c2557 = _0x3b0bf2['substr'](0x0, -0x1 === _0x3b74ef ? 0x7fffffff : _0x3b74ef);
    switch (_0x2c2557) {
      case 'a=recvonly':
      case 'a=sendrecv':
      case 'a=sendonly':
      case 'a=inactive':
        _0x9efef4['mode'] = _0x3b0bf2['substr']('a='['length']);
        break;
      case 'a=range':
        _0x4ae681 = _0x3b0bf2['match'](/^a=range:\s*([a-zA-Z-]+)=([0-9.]+|now)-([0-9.]*)$/);
        _0x9efef4['range'] = [
          Number(_0x4ae681[0x2] == 'now' ? -0x1 : _0x4ae681[0x2]),
          Number(_0x4ae681[0x3]),
          _0x4ae681[0x1],
        ];
        break;
      case 'a=control':
        _0x9efef4['control'] = _0x3b0bf2['substr']('a=control:'['length']);
        break;
      case 'a=rtpmap':
        _0x4ae681 = _0x3b0bf2['match'](/^a=rtpmap:(\d+) (.*)$/);
        if (null === _0x4ae681) {
          console['log']('Could\x20not\x20parse\x20\x27rtpmap\x27\x20of\x20\x27a=\x27');
          return ![];
        }
        var _0x2770e7 = parseInt(_0x4ae681[0x1]);
        _0x9efef4['rtpmap'][_0x2770e7] = {};
        var _0x24f581 = _0x4ae681[0x2]['split']('/');
        _0x9efef4['rtpmap'][_0x2770e7]['name'] = _0x24f581[0x0];
        _0x9efef4['rtpmap'][_0x2770e7]['clock'] = _0x24f581[0x1];
        if (undefined !== _0x24f581[0x2]) {
          _0x9efef4['rtpmap'][_0x2770e7]['encparams'] = _0x24f581[0x2];
        }
        break;
      case 'a=fmtp':
        _0x4ae681 = _0x3b0bf2['match'](/^a=fmtp:(\d+) (.*)$/);
        if (0x0 === _0x4ae681['length']) {
          console['log']('Could\x20not\x20parse\x20\x27fmtp\x27\x20\x20of\x20\x27a=\x27');
          return ![];
        }
        _0x9efef4['fmtp'] = {};
        for (var _0xb22bbc of _0x4ae681[0x2]['split'](';')) {
          var _0x3d480e = _0xb22bbc['indexOf']('=');
          _0x9efef4['fmtp'][_0xb22bbc['substr'](0x0, _0x3d480e)['toLowerCase']()['trim']()] = _0xb22bbc['substr'](
            _0x3d480e + 0x1
          )['trim']();
        }
        break;
    }
    return !![];
  }
  ['getSessionBlock']() {
    return this['sessionBlock'];
  }
  ['hasMedia'](_0x497fa7) {
    return this['media'][_0x497fa7] != undefined;
  }
  ['getMediaBlock'](_0x3d7ebd) {
    return this['media'][_0x3d7ebd];
  }
  ['getMediaBlockByPayloadType'](_0x5eb73a) {
    return this['mediaMap'][_0x5eb73a] || null;
  }
  ['getMediaBlockList']() {
    var _0x46be17 = [];
    for (var _0x1beebf in this['media']) {
      _0x46be17['push'](_0x1beebf);
    }
    return _0x46be17;
  }
}
class RTP {
  constructor(_0x17cd32, _0x4b823b, _0x570b98 = null) {
    let _0x220720 = new DataView(_0x17cd32['buffer'], _0x17cd32['byteOffset'], _0x17cd32['byteLength']);
    this['pt'] = 0x60;
    if (_0x570b98) this['timestamp64'] = _0x570b98;
    else this['timestamp64'] = _0x220720['getFloat64'](0x0);
    this['timestamp'] = Math['round'](
      (this['timestamp64'] >> 0x20) + (this['timestamp64'] & 0xffffffff) / Math['pow'](0x2, 0x20)
    );
    this['csrcs'] = [];
    let _0x25ca6b = 0xa;
    this['media'] = _0x4b823b['getMediaBlockByPayloadType'](this['pt']);
    this['data'] = _0x17cd32['subarray'](_0x25ca6b);
  }
  ['getPayload']() {
    return this['data'];
  }
  ['getTimestampMS']() {
    return this['timestamp'];
  }
  ['toString']() {
    return (
      'RTP(' +
      'version:' +
      this['version'] +
      ',\x20' +
      'padding:' +
      this['padding'] +
      ',\x20' +
      'has_extension:' +
      this['has_extension'] +
      ',\x20' +
      'csrc:' +
      this['csrc'] +
      ',\x20' +
      'marker:' +
      this['marker'] +
      ',\x20' +
      'pt:' +
      this['pt'] +
      ',\x20' +
      'sequence:' +
      this['sequence'] +
      ',\x20' +
      'timestamp:' +
      this['timestamp'] +
      ',\x20' +
      'ssrc:' +
      this['ssrc'] +
      ')'
    );
  }
  ['isVideo']() {
    return this['media']['type'] == 'video';
  }
  ['isAudio']() {
    return this['media']['type'] == 'audio';
  }
}
class MP4 {
  static ['init']() {
    MP4['types'] = {
      avc1: [],
      avcC: [],
      btrt: [],
      dinf: [],
      dref: [],
      esds: [],
      ftyp: [],
      hdlr: [],
      mdat: [],
      mdhd: [],
      mdia: [],
      mfhd: [],
      minf: [],
      moof: [],
      moov: [],
      mp4a: [],
      mvex: [],
      mvhd: [],
      sdtp: [],
      stbl: [],
      stco: [],
      stsc: [],
      stsd: [],
      stsz: [],
      stts: [],
      tfdt: [],
      tfhd: [],
      traf: [],
      trak: [],
      trun: [],
      trex: [],
      tkhd: [],
      vmhd: [],
      smhd: [],
    };
    var _0x409d3c;
    for (_0x409d3c in MP4['types']) {
      if (MP4['types']['hasOwnProperty'](_0x409d3c)) {
        MP4['types'][_0x409d3c] = [
          _0x409d3c['charCodeAt'](0x0),
          _0x409d3c['charCodeAt'](0x1),
          _0x409d3c['charCodeAt'](0x2),
          _0x409d3c['charCodeAt'](0x3),
        ];
      }
    }
    var _0x2d3308 = new Uint8Array([
      0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x76, 0x69, 0x64, 0x65, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
      0x0, 0x0, 0x56, 0x69, 0x64, 0x65, 0x6f, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x0,
    ]);
    var _0x141097 = new Uint8Array([
      0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x73, 0x6f, 0x75, 0x6e, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0,
      0x0, 0x0, 0x53, 0x6f, 0x75, 0x6e, 0x64, 0x48, 0x61, 0x6e, 0x64, 0x6c, 0x65, 0x72, 0x0,
    ]);
    MP4['HDLR_TYPES'] = {
      video: _0x2d3308,
      audio: _0x141097,
    };
    var _0x52531e = new Uint8Array([
      0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0xc, 0x75, 0x72, 0x6c, 0x20, 0x0, 0x0, 0x0, 0x1,
    ]);
    var _0xc1e436 = new Uint8Array([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]);
    MP4['STTS'] = MP4['STSC'] = MP4['STCO'] = _0xc1e436;
    MP4['STSZ'] = new Uint8Array([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]);
    MP4['VMHD'] = new Uint8Array([0x0, 0x0, 0x0, 0x1, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]);
    MP4['SMHD'] = new Uint8Array([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0]);
    MP4['STSD'] = new Uint8Array([0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x0, 0x1]);
    var _0x159fc7 = new Uint8Array([0x69, 0x73, 0x6f, 0x6d]);
    var _0x12cc2c = new Uint8Array([0x61, 0x76, 0x63, 0x31]);
    var _0x98159d = new Uint8Array([0x0, 0x0, 0x0, 0x1]);
    MP4['FTYP'] = MP4['box'](MP4['types']['ftyp'], _0x159fc7, _0x98159d, _0x159fc7, _0x12cc2c);
    MP4['DINF'] = MP4['box'](MP4['types']['dinf'], MP4['box'](MP4['types']['dref'], _0x52531e));
  }
  static ['box'](_0x175008, ..._0x524df5) {
    var _0x31be67 = 0x8,
      _0x237ad5 = _0x524df5['length'],
      _0x5b83c8 = _0x237ad5,
      _0x172b75;
    while (_0x237ad5--) {
      _0x31be67 += _0x524df5[_0x237ad5]['byteLength'];
    }
    _0x172b75 = new Uint8Array(_0x31be67);
    _0x172b75[0x0] = (_0x31be67 >> 0x18) & 0xff;
    _0x172b75[0x1] = (_0x31be67 >> 0x10) & 0xff;
    _0x172b75[0x2] = (_0x31be67 >> 0x8) & 0xff;
    _0x172b75[0x3] = _0x31be67 & 0xff;
    _0x172b75['set'](_0x175008, 0x4);
    for (_0x237ad5 = 0x0, _0x31be67 = 0x8; _0x237ad5 < _0x5b83c8; ++_0x237ad5) {
      _0x172b75['set'](_0x524df5[_0x237ad5], _0x31be67);
      _0x31be67 += _0x524df5[_0x237ad5]['byteLength'];
    }
    return _0x172b75;
  }
  static ['hdlr'](_0x565d78) {
    return MP4['box'](MP4['types']['hdlr'], MP4['HDLR_TYPES'][_0x565d78]);
  }
  static ['mdat'](_0x999e5e) {
    return MP4['box'](MP4['types']['mdat'], _0x999e5e);
  }
  static ['mdhd'](_0x5524bf, _0x33854e) {
    return MP4['box'](
      MP4['types']['mdhd'],
      new Uint8Array([
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x2,
        0x0,
        0x0,
        0x0,
        0x3,
        (_0x5524bf >> 0x18) & 0xff,
        (_0x5524bf >> 0x10) & 0xff,
        (_0x5524bf >> 0x8) & 0xff,
        _0x5524bf & 0xff,
        _0x33854e >> 0x18,
        (_0x33854e >> 0x10) & 0xff,
        (_0x33854e >> 0x8) & 0xff,
        _0x33854e & 0xff,
        0x55,
        0xc4,
        0x0,
        0x0,
      ])
    );
  }
  static ['mdia'](_0x58b62b) {
    return MP4['box'](
      MP4['types']['mdia'],
      MP4['mdhd'](_0x58b62b['timescale'], _0x58b62b['duration']),
      MP4['hdlr'](_0x58b62b['type']),
      MP4['minf'](_0x58b62b)
    );
  }
  static ['mfhd'](_0x5b5175) {
    return MP4['box'](
      MP4['types']['mfhd'],
      new Uint8Array([
        0x0,
        0x0,
        0x0,
        0x0,
        _0x5b5175 >> 0x18,
        (_0x5b5175 >> 0x10) & 0xff,
        (_0x5b5175 >> 0x8) & 0xff,
        _0x5b5175 & 0xff,
      ])
    );
  }
  static ['minf'](_0x4e41ac) {
    if (_0x4e41ac['type'] === 'audio') {
      return MP4['box'](
        MP4['types']['minf'],
        MP4['box'](MP4['types']['smhd'], MP4['SMHD']),
        MP4['DINF'],
        MP4['stbl'](_0x4e41ac)
      );
    } else {
      return MP4['box'](
        MP4['types']['minf'],
        MP4['box'](MP4['types']['vmhd'], MP4['VMHD']),
        MP4['DINF'],
        MP4['stbl'](_0x4e41ac)
      );
    }
  }
  static ['moof'](_0x563b09, _0x48e264, _0x7afb17) {
    return MP4['box'](MP4['types']['moof'], MP4['mfhd'](_0x563b09), MP4['traf'](_0x7afb17, _0x48e264));
  }
  static ['moov'](_0x2aa985, _0x36b093, _0x3bcc24) {
    var _0x284f9b = _0x2aa985['length'],
      _0x21e2c3 = [];
    while (_0x284f9b--) {
      _0x21e2c3[_0x284f9b] = MP4['trak'](_0x2aa985[_0x284f9b]);
    }
    return MP4['box']['apply'](
      null,
      [MP4['types']['moov'], MP4['mvhd'](_0x3bcc24, _0x36b093)]['concat'](_0x21e2c3)['concat'](MP4['mvex'](_0x2aa985))
    );
  }
  static ['mvex'](_0x55bc1f) {
    var _0x14f539 = _0x55bc1f['length'],
      _0x5500e8 = [];
    while (_0x14f539--) {
      _0x5500e8[_0x14f539] = MP4['trex'](_0x55bc1f[_0x14f539]);
    }
    return MP4['box']['apply'](null, [MP4['types']['mvex']]['concat'](_0x5500e8));
  }
  static ['mvhd'](_0x3a932e, _0x3b7911) {
    var _0x5698b2 = new Uint8Array([
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x1,
      0x0,
      0x0,
      0x0,
      0x2,
      (_0x3a932e >> 0x18) & 0xff,
      (_0x3a932e >> 0x10) & 0xff,
      (_0x3a932e >> 0x8) & 0xff,
      _0x3a932e & 0xff,
      (_0x3b7911 >> 0x18) & 0xff,
      (_0x3b7911 >> 0x10) & 0xff,
      (_0x3b7911 >> 0x8) & 0xff,
      _0x3b7911 & 0xff,
      0x0,
      0x1,
      0x0,
      0x0,
      0x1,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x1,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x1,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x40,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0xff,
      0xff,
      0xff,
      0xff,
    ]);
    return MP4['box'](MP4['types']['mvhd'], _0x5698b2);
  }
  static ['sdtp'](_0x56e943) {
    var _0x5be3ee = _0x56e943['samples'] || [],
      _0x28bbb3 = new Uint8Array(0x4 + _0x5be3ee['length']),
      _0x3dbc56,
      _0x7cc0a3;
    for (_0x7cc0a3 = 0x0; _0x7cc0a3 < _0x5be3ee['length']; _0x7cc0a3++) {
      _0x3dbc56 = _0x5be3ee[_0x7cc0a3]['flags'];
      _0x28bbb3[_0x7cc0a3 + 0x4] =
        (_0x3dbc56['dependsOn'] << 0x4) | (_0x3dbc56['isDependedOn'] << 0x2) | _0x3dbc56['hasRedundancy'];
    }
    return MP4['box'](MP4['types']['sdtp'], _0x28bbb3);
  }
  static ['stbl'](_0x5375da) {
    return MP4['box'](
      MP4['types']['stbl'],
      MP4['stsd'](_0x5375da),
      MP4['box'](MP4['types']['stts'], MP4['STTS']),
      MP4['box'](MP4['types']['stsc'], MP4['STSC']),
      MP4['box'](MP4['types']['stsz'], MP4['STSZ']),
      MP4['box'](MP4['types']['stco'], MP4['STCO'])
    );
  }
  static ['avc1'](_0x214d1a) {
    var _0x5b8173 = [],
      _0x278dc0 = [],
      _0x4ed601,
      _0x4fe806,
      _0x10efbd;
    for (_0x4ed601 = 0x0; _0x4ed601 < _0x214d1a['sps']['length']; _0x4ed601++) {
      _0x4fe806 = _0x214d1a['sps'][_0x4ed601];
      _0x10efbd = _0x4fe806['byteLength'];
      _0x5b8173['push']((_0x10efbd >>> 0x8) & 0xff);
      _0x5b8173['push'](_0x10efbd & 0xff);
      _0x5b8173 = _0x5b8173['concat'](Array['prototype']['slice']['call'](_0x4fe806));
    }
    for (_0x4ed601 = 0x0; _0x4ed601 < _0x214d1a['pps']['length']; _0x4ed601++) {
      _0x4fe806 = _0x214d1a['pps'][_0x4ed601];
      _0x10efbd = _0x4fe806['byteLength'];
      _0x278dc0['push']((_0x10efbd >>> 0x8) & 0xff);
      _0x278dc0['push'](_0x10efbd & 0xff);
      _0x278dc0 = _0x278dc0['concat'](Array['prototype']['slice']['call'](_0x4fe806));
    }
    var _0xb9afa9 = MP4['box'](
        MP4['types']['avcC'],
        new Uint8Array(
          [0x1, _0x5b8173[0x3], _0x5b8173[0x4], _0x5b8173[0x5], 0xfc | 0x3, 0xe0 | _0x214d1a['sps']['length']]
            ['concat'](_0x5b8173)
            ['concat']([_0x214d1a['pps']['length']])
            ['concat'](_0x278dc0)
        )
      ),
      _0x15150f = _0x214d1a['width'],
      _0x14f3bb = _0x214d1a['height'];
    return MP4['box'](
      MP4['types']['avc1'],
      new Uint8Array([
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x1,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        (_0x15150f >> 0x8) & 0xff,
        _0x15150f & 0xff,
        (_0x14f3bb >> 0x8) & 0xff,
        _0x14f3bb & 0xff,
        0x0,
        0x48,
        0x0,
        0x0,
        0x0,
        0x48,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x1,
        0x12,
        0x62,
        0x69,
        0x6e,
        0x65,
        0x6c,
        0x70,
        0x72,
        0x6f,
        0x2e,
        0x72,
        0x75,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x18,
        0x11,
        0x11,
      ]),
      _0xb9afa9,
      MP4['box'](
        MP4['types']['btrt'],
        new Uint8Array([0x0, 0x1c, 0x9c, 0x80, 0x0, 0x2d, 0xc6, 0xc0, 0x0, 0x2d, 0xc6, 0xc0])
      )
    );
  }
  static ['esds'](_0x5357c6) {
    var _0x1090d6 = _0x5357c6['config']['byteLength'];
    let _0x9dba44 = new Uint8Array(0x1a + _0x1090d6 + 0x3);
    _0x9dba44['set']([
      0x0,
      0x0,
      0x0,
      0x0,
      0x3,
      0x17 + _0x1090d6,
      0x0,
      0x1,
      0x0,
      0x4,
      0xf + _0x1090d6,
      0x40,
      0x15,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x0,
      0x5,
      _0x1090d6,
    ]);
    _0x9dba44['set'](_0x5357c6['config'], 0x1a);
    _0x9dba44['set']([0x6, 0x1, 0x2], 0x1a + _0x1090d6);
    return _0x9dba44;
  }
  static ['mp4a'](_0x1a6c9d) {
    var _0x564384 = _0x1a6c9d['audiosamplerate'];
    return MP4['box'](
      MP4['types']['mp4a'],
      new Uint8Array([
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x1,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        _0x1a6c9d['channelCount'],
        0x0,
        0x10,
        0x0,
        0x0,
        0x0,
        0x0,
        (_0x564384 >> 0x8) & 0xff,
        _0x564384 & 0xff,
        0x0,
        0x0,
      ]),
      MP4['box'](MP4['types']['esds'], MP4['esds'](_0x1a6c9d))
    );
  }
  static ['stsd'](_0x4c77e5) {
    if (_0x4c77e5['type'] === 'audio') {
      return MP4['box'](MP4['types']['stsd'], MP4['STSD'], MP4['mp4a'](_0x4c77e5));
    } else {
      return MP4['box'](MP4['types']['stsd'], MP4['STSD'], MP4['avc1'](_0x4c77e5));
    }
  }
  static ['tkhd'](_0x168d77) {
    var _0x2dc817 = _0x168d77['id'],
      _0x471ece = _0x168d77['duration'],
      _0x135af1 = _0x168d77['width'],
      _0x57982f = _0x168d77['height'],
      _0x158d97 = _0x168d77['volume'];
    return MP4['box'](
      MP4['types']['tkhd'],
      new Uint8Array([
        0x0,
        0x0,
        0x0,
        0x7,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        (_0x2dc817 >> 0x18) & 0xff,
        (_0x2dc817 >> 0x10) & 0xff,
        (_0x2dc817 >> 0x8) & 0xff,
        _0x2dc817 & 0xff,
        0x0,
        0x0,
        0x0,
        0x0,
        _0x471ece >> 0x18,
        (_0x471ece >> 0x10) & 0xff,
        (_0x471ece >> 0x8) & 0xff,
        _0x471ece & 0xff,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        (_0x158d97 >> 0x0) & 0xff,
        (((_0x158d97 % 0x1) * 0xa) >> 0x0) & 0xff,
        0x0,
        0x0,
        0x0,
        0x1,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x1,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x40,
        0x0,
        0x0,
        0x0,
        (_0x135af1 >> 0x8) & 0xff,
        _0x135af1 & 0xff,
        0x0,
        0x0,
        (_0x57982f >> 0x8) & 0xff,
        _0x57982f & 0xff,
        0x0,
        0x0,
      ])
    );
  }
  static ['traf'](_0x1db3c7, _0x3c4508) {
    var _0x575ecd = MP4['sdtp'](_0x1db3c7),
      _0x3bcbf2 = _0x1db3c7['id'];
    return MP4['box'](
      MP4['types']['traf'],
      MP4['box'](
        MP4['types']['tfhd'],
        new Uint8Array([
          0x0,
          0x0,
          0x0,
          0x0,
          _0x3bcbf2 >> 0x18,
          (_0x3bcbf2 >> 0x10) & 0xff,
          (_0x3bcbf2 >> 0x8) & 0xff,
          _0x3bcbf2 & 0xff,
        ])
      ),
      MP4['box'](
        MP4['types']['tfdt'],
        new Uint8Array([
          0x0,
          0x0,
          0x0,
          0x0,
          _0x3c4508 >> 0x18,
          (_0x3c4508 >> 0x10) & 0xff,
          (_0x3c4508 >> 0x8) & 0xff,
          _0x3c4508 & 0xff,
        ])
      ),
      MP4['trun'](_0x1db3c7, _0x575ecd['length'] + 0x10 + 0x10 + 0x8 + 0x10 + 0x8 + 0x8),
      _0x575ecd
    );
  }
  static ['trak'](_0xa543ef) {
    _0xa543ef['duration'] = _0xa543ef['duration'] || 0xffffffff;
    return MP4['box'](MP4['types']['trak'], MP4['tkhd'](_0xa543ef), MP4['mdia'](_0xa543ef));
  }
  static ['trex'](_0x557594) {
    var _0x3f440d = _0x557594['id'];
    return MP4['box'](
      MP4['types']['trex'],
      new Uint8Array([
        0x0,
        0x0,
        0x0,
        0x0,
        _0x3f440d >> 0x18,
        (_0x3f440d >> 0x10) & 0xff,
        (_0x3f440d >> 0x8) & 0xff,
        _0x3f440d & 0xff,
        0x0,
        0x0,
        0x0,
        0x1,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x0,
        0x1,
        0x0,
        0x1,
      ])
    );
  }
  static ['trun'](_0x2ad4fa, _0x512c34) {
    var _0x398a2b = _0x2ad4fa['samples'] || [],
      _0x363558 = _0x398a2b['length'],
      _0x1b1f3f = 0xc + 0x10 * _0x363558,
      _0xaddc23 = new Uint8Array(_0x1b1f3f),
      _0x47476b,
      _0x2d3a8b,
      _0x1ba1c5,
      _0x1f3b48,
      _0x134bec,
      _0x5262ea;
    _0x512c34 += 0x8 + _0x1b1f3f;
    _0xaddc23['set'](
      [
        0x0,
        0x0,
        0xf,
        0x1,
        (_0x363558 >>> 0x18) & 0xff,
        (_0x363558 >>> 0x10) & 0xff,
        (_0x363558 >>> 0x8) & 0xff,
        _0x363558 & 0xff,
        (_0x512c34 >>> 0x18) & 0xff,
        (_0x512c34 >>> 0x10) & 0xff,
        (_0x512c34 >>> 0x8) & 0xff,
        _0x512c34 & 0xff,
      ],
      0x0
    );
    for (_0x47476b = 0x0; _0x47476b < _0x363558; _0x47476b++) {
      _0x2d3a8b = _0x398a2b[_0x47476b];
      _0x1ba1c5 = _0x2d3a8b['duration'];
      _0x1f3b48 = _0x2d3a8b['size'];
      _0x134bec = _0x2d3a8b['flags'];
      _0x5262ea = _0x2d3a8b['cts'];
      _0xaddc23['set'](
        [
          (_0x1ba1c5 >>> 0x18) & 0xff,
          (_0x1ba1c5 >>> 0x10) & 0xff,
          (_0x1ba1c5 >>> 0x8) & 0xff,
          _0x1ba1c5 & 0xff,
          (_0x1f3b48 >>> 0x18) & 0xff,
          (_0x1f3b48 >>> 0x10) & 0xff,
          (_0x1f3b48 >>> 0x8) & 0xff,
          _0x1f3b48 & 0xff,
          (_0x134bec['isLeading'] << 0x2) | _0x134bec['dependsOn'],
          (_0x134bec['isDependedOn'] << 0x6) |
            (_0x134bec['hasRedundancy'] << 0x4) |
            (_0x134bec['paddingValue'] << 0x1) |
            _0x134bec['isNonSync'],
          _0x134bec['degradPrio'] & (0xf0 << 0x8),
          _0x134bec['degradPrio'] & 0xf,
          (_0x5262ea >>> 0x18) & 0xff,
          (_0x5262ea >>> 0x10) & 0xff,
          (_0x5262ea >>> 0x8) & 0xff,
          _0x5262ea & 0xff,
        ],
        0xc + 0x10 * _0x47476b
      );
    }
    return MP4['box'](MP4['types']['trun'], _0xaddc23);
  }
  static ['initSegment'](_0x113d5d, _0x1abb8a, _0x1d399e) {
    if (!MP4['types']) {
      MP4['init']();
    }
    var _0x2e858c = MP4['moov'](_0x113d5d, _0x1abb8a, _0x1d399e),
      _0x5767e5;
    _0x5767e5 = new Uint8Array(MP4['FTYP']['byteLength'] + _0x2e858c['byteLength']);
    _0x5767e5['set'](MP4['FTYP']);
    _0x5767e5['set'](_0x2e858c, MP4['FTYP']['byteLength']);
    return _0x5767e5;
  }
}
let track_id = 0x1;
class BaseRemuxer {
  static ['PTSNormalize'](_0x3d13da, _0x4b042f) {
    return _0x3d13da;
    let _0x30ca58;
    if (_0x4b042f === undefined) {
      return _0x3d13da;
    }
    if (_0x4b042f < _0x3d13da) {
      _0x30ca58 = -0x200000000;
    } else {
      _0x30ca58 = 0x200000000;
    }
    while (Math['abs'](_0x3d13da - _0x4b042f) > 0x100000000) {
      _0x3d13da += _0x30ca58;
    }
    return _0x3d13da;
  }
  static ['getTrackID']() {
    return track_id++;
  }
  constructor(_0x5a3c2f) {
    this['timeOffset'] = 0x0;
    this['timescale'] = Number(_0x5a3c2f['rtpmap']['' + _0x5a3c2f['fmt'][0x0]]['clock']);
    this['scaleFactor'] = (this['timescale'] | 0x0) / 0x3e8;
    this['readyToDecode'] = ![];
    this['seq'] = 0x1;
  }
  ['msToScaled'](_0x1a2c04) {
    return (_0x1a2c04 - this['timeOffset']) * this['scaleFactor'];
  }
  ['remux'](_0x5d8923) {
    return this['timeOffset'] >= 0x0;
  }
}
class NALU {
  static get ['NDR']() {
    return 0x1;
  }
  static get ['IDR']() {
    return 0x5;
  }
  static get ['SEI']() {
    return 0x6;
  }
  static get ['SPS']() {
    return 0x7;
  }
  static get ['PPS']() {
    return 0x8;
  }
  static get ['FU_A']() {
    return 0x1c;
  }
  static get ['FU_B']() {
    return 0x1d;
  }
  static get ['TYPES']() {
    return {
      [NALU['IDR']]: 'IDR',
      [NALU['SEI']]: 'SEI',
      [NALU['SPS']]: 'SPS',
      [NALU['PPS']]: 'PPS',
      [NALU['NDR']]: 'NDR',
    };
  }
  static ['type'](_0x5ef358) {
    if (_0x5ef358['ntype'] in NALU['TYPES']) {
      return NALU['TYPES'][_0x5ef358['ntype']];
    } else {
      return 'UNKNOWN';
    }
  }
  constructor(_0x24d533, _0xc6e927, _0xf74756, _0x628ff7) {
    this['data'] = _0xf74756;
    this['ntype'] = _0x24d533;
    this['nri'] = _0xc6e927;
    this['timestamp'] = _0x628ff7;
  }
  ['appendData'](_0x520159) {
    this['data'] = appendByteArray(this['data'], _0x520159);
  }
  ['type']() {
    return this['ntype'];
  }
  ['getNri']() {
    return this['nri'] >> 0x6;
  }
  ['getSize']() {
    return 0x4 + 0x1 + this['data']['byteLength'];
  }
  ['getData']() {
    let _0x351b99 = new Uint8Array(0x5 + this['data']['byteLength']);
    let _0x5a918e = new DataView(_0x351b99['buffer']);
    _0x5a918e['setUint32'](0x0, this['data']['byteLength'] + 0x1);
    _0x5a918e['setUint8'](0x4, (0x0 & 0x80) | (this['nri'] & 0x60) | (this['ntype'] & 0x1f));
    _0x351b99['set'](this['data'], 0x5);
    return _0x351b99;
  }
}
class NALUAsm {
  static get ['NALTYPE_FU_A']() {
    return 0x1c;
  }
  static get ['NALTYPE_FU_B']() {
    return 0x1d;
  }
  constructor() {
    this['nalu_l'] = null;
    this['nalu_t'] = null;
    this['dts_l'] = 0x0;
  }
  ['shiftTemp'](_0x579993) {
    let _0x4daf39;
    if (this['nalu_t'] != null) {
      _0x4daf39 = this['nalu_t'];
      this['nalu_t'] = _0x579993;
    } else {
      _0x4daf39 = _0x579993;
    }
    return _0x4daf39 ? [_0x4daf39] : null;
  }
  ['onRTPPacket'](_0x20de50) {
    let _0x56a340 = _0x20de50['getPayload']();
    let _0x1048f9 = _0x20de50['getTimestampMS']();
    if (!_0x20de50['media']) {
      return null;
    }
    let _0x2de2e8 = new DataView(_0x56a340['buffer'], _0x56a340['byteOffset']);
    let _0x4ad85a = _0x2de2e8['getUint8'](0x0);
    let _0x3d07ff = _0x4ad85a & 0x60;
    let _0x22a757 = _0x4ad85a & 0x1f;
    let _0x2a0241 = 0x1;
    let _0x1b16ca = null;
    if ((0x7 > _0x22a757 && 0x0 < _0x22a757) || (0x1c > _0x22a757 && 0x8 < _0x22a757)) {
      if (this['dts_l'] != _0x1048f9) {
        this['dts_l'] = _0x1048f9;
        _0x1b16ca = this['shiftTemp'](this['nalu_l']);
        this['nalu_l'] = new NALU(_0x22a757, _0x3d07ff, _0x56a340['subarray'](_0x2a0241), _0x1048f9);
      } else {
        _0x1b16ca = this['shiftTemp'](null);
        if (this['nalu_l'] != null) {
          this['nalu_l']['appendData'](new Uint8Array([0x0, 0x0, 0x1]));
          this['nalu_l']['appendData'](_0x56a340['subarray'](0x0));
        }
      }
      return _0x1b16ca;
    } else if (_0x22a757 == NALU['SPS'] || _0x22a757 == NALU['PPS']) {
      return [new NALU(_0x22a757, _0x3d07ff, _0x56a340['subarray'](_0x2a0241), _0x1048f9)];
    } else if (NALU['FU_A'] == _0x22a757 || NALU['FU_B'] == _0x22a757) {
      let _0x296215 = _0x2de2e8['getUint8'](0x1);
      let _0x4064cc = (_0x296215 & 0x80) >>> 0x7;
      let _0x2b4038 = (_0x296215 & 0x40) >>> 0x6;
      let _0x9d59e2 = _0x296215 & 0x1f;
      _0x2a0241++;
      let _0x2ff147 = 0x0;
      if (NALU['FU_B'] === _0x22a757) {
        _0x2ff147 = _0x2de2e8['getUint16'](0x2);
        _0x2a0241 += 0x2;
      }
      if (this['dts_l'] != _0x1048f9) {
        if (_0x4064cc) {
          _0x1b16ca = this['shiftTemp'](this['nalu_l']);
          this['nalu_l'] = new NALU(_0x9d59e2, _0x3d07ff + _0x9d59e2, _0x56a340['subarray'](_0x2a0241), _0x1048f9);
          this['dts_l'] = _0x1048f9;
        }
        if (this['nalu_l'] && this['nalu_l']['ntype'] === _0x9d59e2) {
          if (!_0x4064cc) {
            this['nalu_l']['appendData'](_0x56a340['subarray'](_0x2a0241));
          }
          if (_0x2b4038) {
            _0x1b16ca = _0x1b16ca = this['shiftTemp'](this['nalu_l']);
            this['nalu_l'] = null;
          }
        }
      } else {
        if (this['nalu_l'] != null) {
          if (this['nalu_l']['ntype'] == _0x9d59e2) {
            _0x1b16ca = this['shiftTemp'](null);
            if (_0x4064cc) {
              this['nalu_l']['appendData'](new Uint8Array([0x0, 0x0, 0x1, _0x3d07ff + _0x9d59e2]));
              this['nalu_l']['appendData'](_0x56a340['subarray'](_0x2a0241));
            } else {
              this['nalu_l']['appendData'](_0x56a340['subarray'](_0x2a0241));
            }
          } else {
            if (_0x4064cc) {
              _0x1b16ca = this['shiftTemp'](this['nalu_l']);
              this['nalu_l'] = new NALU(_0x9d59e2, _0x3d07ff + _0x9d59e2, _0x56a340['subarray'](_0x2a0241), _0x1048f9);
              this['dts_l'] = _0x1048f9;
            } else {
              _0x1b16ca = this['shiftTemp'](null);
              console['log']('fu\x20packet\x20error');
            }
          }
        } else {
          _0x1b16ca = this['shiftTemp'](null);
          console['log']('fu\x20packet\x20start\x20without\x20head');
        }
      }
      return _0x1b16ca;
    } else {
      console['log']('Undefined\x20NAL\x20unit,\x20type:\x20' + _0x22a757);
      Log('Undefined\x20NAL\x20unit,\x20type:\x20' + _0x22a757, 'error');
      _0x1b16ca = this['shiftTemp'](null);
      return _0x1b16ca;
    }
  }
}
class H264TrackConverter extends BaseRemuxer {
  constructor(_0x4353a2) {
    super(_0x4353a2);
    this['codecstring'] = MSE['CODEC_AVC_BASELINE'];
    this['units'] = [];
    this['_initDTS'] = undefined;
    this['nextAvcDts'] = undefined;
    this['naluasm'] = new NALUAsm();
    this['readyToDecode'] = ![];
    this['firstDTS'] = 0x0;
    this['firstPTS'] = 0x0;
    this['lastDTS'] = undefined;
    this['mp4track'] = {
      id: BaseRemuxer['getTrackID'](),
      type: 'video',
      nbNalu: 0x0,
      fragmented: !![],
      sps: '',
      pps: '',
      width: 0x0,
      height: 0x0,
      samples: [],
    };
    if (_0x4353a2['fmtp']['sprop-parameter-sets']) {
      let _0x200e10 = _0x4353a2['fmtp']['sprop-parameter-sets']['split'](',');
      this['mp4track']['pps'] = [new Uint8Array(base64ToArrayBuffer(_0x200e10[0x1]))];
      this['parseTrackSPS'](base64ToArrayBuffer(_0x200e10[0x0]));
    }
    this['timeOffset'] = 0x0;
  }
  ['parseTrackSPS'](_0x298915) {
    var _0x20c3f2 = new ExpGolomb(new Uint8Array(_0x298915));
    var _0x4ee43e = _0x20c3f2['readSPS']();
    this['mp4track']['width'] = _0x4ee43e['width'];
    this['mp4track']['height'] = _0x4ee43e['height'];
    this['mp4track']['sps'] = [new Uint8Array(_0x298915)];
    this['mp4track']['timescale'] = this['timescale'];
    this['mp4track']['duration'] = this['timescale'];
    var _0x3ab6a1 = new DataView(_0x298915, 0x1, 0x4);
    this['codecstring'] = 'avc1.';
    for (let _0x3ea678 = 0x0; _0x3ea678 < 0x3; _0x3ea678++) {
      var _0x412239 = _0x3ab6a1['getUint8'](_0x3ea678)['toString'](0x10);
      if (_0x412239['length'] < 0x2) {
        _0x412239 = '0' + _0x412239;
      }
      this['codecstring'] += _0x412239;
    }
    this['mp4track']['codec'] = this['codecstring'];
  }
  ['remux'](_0x306198) {
    if (!super['remux']['call'](this, _0x306198)) return;
    let _0x185c70 = this['naluasm']['onRTPPacket'](_0x306198);
    if (_0x185c70) {
      let _0x140c00 = ![];
      _0x185c70 = _0x185c70[0x0];
      switch (_0x185c70['type']()) {
        case NALU['NDR']:
          if (this['readyToDecode']) {
            _0x140c00 = !![];
          }
          break;
        case NALU['IDR']:
          if (!this['readyToDecode']) {
            if (this['mp4track']['pps'] && this['mp4track']['sps']) {
              _0x140c00 = !![];
              this['readyToDecode'] = !![];
              if (this['_initDTS'] === undefined) {
                this['_initPTS'] = this['msToScaled'](_0x185c70['timestamp']);
                this['_initDTS'] = this['msToScaled'](_0x185c70['timestamp']);
              }
            }
          } else {
            _0x140c00 = !![];
          }
          break;
        case NALU['PPS']:
          if (!this['mp4track']['pps']) {
            this['mp4track']['pps'] = [new Uint8Array(_0x185c70['data'])];
          }
          break;
        case NALU['SPS']:
          if (!this['mp4track']['sps']) {
            this['parseTrackSPS'](_0x185c70['data']);
          }
          break;
        default:
          _0x140c00 = ![];
      }
      if (this['readyToDecode']) {
        if (_0x140c00) {
          this['units']['push'](_0x185c70);
        }
      }
    }
  }
  ['getPayload']() {
    this['mp4track']['len'] = 0x0;
    this['mp4track']['nbNalu'] = 0x0;
    for (let _0x270ad9 of this['units']) {
      this['mp4track']['samples']['push']({
        units: {
          units: [_0x270ad9],
          length: _0x270ad9['getSize'](),
        },
        pts: this['msToScaled'](_0x270ad9['timestamp']),
        dts: this['msToScaled'](_0x270ad9['timestamp']),
        key: _0x270ad9['type']() == NALU['IDR'],
      });
      this['mp4track']['len'] += _0x270ad9['getSize']();
      this['mp4track']['nbNalu'] += 0x1;
    }
    let _0xa1d289 = new Uint8Array(this['mp4track']['len']);
    let _0x4e18a7 = 0x0;
    let _0x280403 = [];
    this['mp4track']['samples']['sort'](function (_0xb73721, _0x4c774d) {
      return _0xb73721['pts'] - _0x4c774d['pts'];
    });
    let _0x39e007,
      _0x498c20,
      _0x4deec3 = 0x0,
      _0xf2f690,
      _0x372e8b;
    while (this['mp4track']['samples']['length']) {
      let _0x5b2266 = this['mp4track']['samples']['shift']();
      let _0x40e6ce = 0x0;
      while (_0x5b2266['units']['units']['length']) {
        let _0x26a714 = _0x5b2266['units']['units']['shift']();
        let _0x4f4ecb = _0x26a714['getData']();
        _0xa1d289['set'](_0x4f4ecb, _0x4e18a7);
        _0x4e18a7 += _0x4f4ecb['byteLength'];
        _0x40e6ce += _0x4f4ecb['byteLength'];
      }
      let _0x4ca3c4 = _0x5b2266['pts'] - this['_initPTS'];
      let _0xcda246 = _0x5b2266['dts'] - this['_initDTS'];
      _0xcda246 = Math['min'](_0x4ca3c4, _0xcda246);
      if (_0x372e8b !== undefined) {
        _0x39e007 = BaseRemuxer['PTSNormalize'](_0x4ca3c4, _0x372e8b);
        _0x498c20 = BaseRemuxer['PTSNormalize'](_0xcda246, _0x372e8b);
        _0x4deec3 = _0x498c20 - _0x372e8b;
        if (_0x4deec3 <= 0x0) {
          console['log'](
            'invalid\x20sample\x20duration\x20at\x20PTS/DTS:\x20' +
              _0x5b2266['pts'] +
              '/' +
              _0x5b2266['dts'] +
              '|dts\x20norm:\x20' +
              _0x498c20 +
              '|lastDTS:\x20' +
              _0x372e8b +
              ':' +
              _0x4deec3
          );
        }
      } else {
        var _0x4df611 = this['nextAvcDts'],
          _0x3ec32b;
        _0x39e007 = BaseRemuxer['PTSNormalize'](_0x4ca3c4, _0x4df611);
        _0x498c20 = BaseRemuxer['PTSNormalize'](_0xcda246, _0x4df611);
        if (_0x4df611) {
          _0x3ec32b = Math['round'](_0x498c20 - _0x4df611);
          if (Math['abs'](_0x3ec32b) < 0x258) {
            if (_0x3ec32b) {
              if (_0x3ec32b > 0x1) {
                console['log']('AVC:' + _0x3ec32b + '\x20ms\x20hole\x20between\x20fragments\x20detected,filling\x20it');
              } else if (_0x3ec32b < -0x1) {
                console['log']('AVC:' + -_0x3ec32b + '\x20ms\x20overlapping\x20between\x20fragments\x20detected');
              }
              _0x498c20 = _0x4df611;
              _0x39e007 = Math['max'](_0x39e007 - _0x3ec32b, _0x498c20);
              console['log']('Video/PTS/DTS\x20adjusted:\x20' + _0x39e007 + '/' + _0x498c20 + ',delta:' + _0x3ec32b);
            }
          }
        }
        this['firstPTS'] = Math['max'](0x0, _0x39e007);
        this['firstDTS'] = Math['max'](0x0, _0x498c20);
        _0x4deec3 = 0x1;
      }
      if (_0x4deec3 < 0x0) _0x4deec3 = 0x0;
      _0xf2f690 = {
        size: _0x40e6ce,
        duration: _0x4deec3,
        cts: _0x39e007 - _0x498c20,
        flags: {
          isLeading: 0x0,
          isDependedOn: 0x0,
          hasRedundancy: 0x0,
          degradPrio: 0x0,
        },
      };
      let _0x5b7478 = _0xf2f690['flags'];
      if (_0x5b2266['key'] === !![]) {
        _0x5b7478['dependsOn'] = 0x2;
        _0x5b7478['isNonSync'] = 0x0;
      } else {
        _0x5b7478['dependsOn'] = 0x1;
        _0x5b7478['isNonSync'] = 0x1;
      }
      _0x280403['push'](_0xf2f690);
      _0x372e8b = _0x498c20;
    }
    var _0x357258 = 0x0;
    if (_0x280403['length'] >= 0x2) {
      _0x357258 = _0x280403[_0x280403['length'] - 0x2]['duration'];
      _0x280403[0x0]['duration'] = _0x357258;
    }
    this['nextAvcDts'] = _0x498c20 + _0x357258;
    if (_0x280403['length'] && navigator['userAgent']['toLowerCase']()['indexOf']('chrome') > -0x1) {
      let _0x15e0eb = _0x280403[0x0]['flags'];
      _0x15e0eb['dependsOn'] = 0x2;
      _0x15e0eb['isNonSync'] = 0x0;
    }
    this['mp4track']['samples'] = _0x280403;
    if (_0x280403['length']) {
      this['mp4track']['lastDuration'] = (this['lastDTS'] || 0x0) + _0x280403[_0x280403['length'] - 0x1]['duration'];
    } else {
      this['mp4track']['lastDuration'] = 0x0;
    }
    return _0xa1d289;
  }
  ['flush']() {
    this['seq']++;
    this['mp4track']['samples'] = [];
    this['units'] = [];
  }
}
class TypeStreaming {
  static get ['HLS']() {
    return 'hls';
  }
  static get ['RTP']() {
    return 'rtp';
  }
}
class WebsocketTransport {
  constructor(_0x457808, _0x4f3ce0, _0x562102) {
    this['remuxer'] = _0x457808;
    this['ret'] = this['urlParse'](_0x4f3ce0);
    if (this['ret'] == null) return null;
    this['checkonmessage'] = ![];
    if (_0x562102) {
      let _0x8876d2 = _0x562102['parentNode']['getAttribute']('class')['replace']('loading_cam', '');
      _0x562102['parentNode']['setAttribute']('class', _0x8876d2 + '\x20loading_cam');
    }
    this['socket_url'] = this['ret']['full'];
    this['rtp_url'] = this['ret']['fullg'];
    this['host_id'] = this['ret']['host_id'];
    this['ready'] = this['connect']();
    this['sdpfile'] = null;
    this['count'] = 0x0;
    this['player'] = _0x562102;
    var _0x223b90 = this;
    this['websocket']['onopen'] = function (_0x5edaab) {
      _0x223b90['onOpen'](_0x5edaab);
    };
    this['websocket']['onmessage'] = function (_0x3992da) {
      _0x223b90['onMessage'](_0x3992da);
    };
    this['websocket']['onerror'] = function (_0xe78a97) {
      _0x223b90['onError'](_0xe78a97);
    };
    this['checkReconnect2s']();
  }
  ['connect']() {
    this['RTPClient'] = new RTPClient(this['remuxer']);
    this['websocket'] = new WebSocket(this['socket_url']);
    if (window['MozWebSocket']) {
      window['WebSocket'] = window['MozWebSocket'];
    } else if (!window['WebSocket']) {
      return;
    }
    var _0x1f5522 = this;
    this['websocket']['onopen'] = function (_0x181a25) {
      _0x1f5522['onOpen'](_0x181a25);
    };
    this['websocket']['onclose'] = function (_0x4fd19e) {
      _0x1f5522['onClose'](_0x4fd19e);
    };
    this['websocket']['onmessage'] = function (_0x11e3c0) {
      _0x1f5522['onMessage'](_0x11e3c0);
    };
    this['websocket']['onerror'] = function (_0x1bd438) {
      _0x1f5522['onError'](_0x1bd438);
    };
  }
  ['checkReconnect2s']() {
    var _0x5a55e9 = this;
    this['_reconnect'] = setInterval(function () {
      _0x5a55e9['reconnect']();
    }, 0x7d0);
  }
  ['reconnect']() {
    if (this['websocket'] && this['websocket']['readyState'] < 0x3) return ![];
    this['websocket'] = new WebSocket(this['socket_url']);
    this['websocket']['binaryType'] = 'arraybuffer';
    if (window['MozWebSocket']) {
      window['WebSocket'] = window['MozWebSocket'];
    } else if (!window['WebSocket']) {
      return;
    }
    var _0x388758 = this;
    this['websocket']['onopen'] = function (_0xc61746) {
      _0x388758['onOpen'](_0xc61746);
    };
    this['websocket']['onclose'] = function (_0x44c74b) {
      _0x388758['onClose'](_0x44c74b);
    };
    this['websocket']['onmessage'] = function (_0x4d23d6) {
      _0x388758['onMessage'](_0x4d23d6);
    };
    this['websocket']['onerror'] = function (_0x38a86f) {
      _0x388758['onError'](_0x38a86f);
    };
  }
  ['onOpen'](_0xd023dc) {
    this['websocket']['binaryType'] = 'arraybuffer';
    Log('Kết\x20nối\x20socket\x20thành\x20công,\x20gửi\x20xác\x20thực\x20host_id:' + this['host_id'], 'info');
    this['websocket']['send'](
      '{\x20\x22action\x22:\x22hello\x22,\x20\x22version\x22:\x222.0\x22,\x20\x22host_id\x22:\x22' +
        this['host_id'] +
        '\x22,\x20\x22signature\x22:\x22RESERVED\x22,\x20\x22timestamp\x22:\x221480371820539\x22\x20}'
    );
    this['CheckonMessage']();
  }
  ['onClose'](_0x250bd1) {
    if (_0x250bd1['change_flow']) {
      clearInterval(this['_reconnect']);
      this['player'] = null;
    }
    this['count'] = 0x0;
    this['checkonmessage'] = ![];
    if (this['player'] && !_0x250bd1['change_flow']) {
      let _0x408b01 = this['player']['parentNode']['getAttribute']('class')['replace']('loading_cam', '');
      this['player']['parentNode']['setAttribute']('class', _0x408b01 + '\x20loading_cam');
    }
    Log('Close\x20connnection\x20Server', 'error');
    console['log'](_0x250bd1);
    this['onDisconnect']()
      ['then'](() => {
        this['websocket'] = null;
      })
      ['catch']((_0x22c58d) => {});
  }
  ['onError'](_0x7efcba) {}
  ['onDisconnect'](_0x509ea7) {
    return new Promise((_0x1c91d5, _0x4710e1) => {
      console['log']('DISCONNECTED\x20SUCCESS!!');
      Log('Đóng\x20kết\x20nối\x20đến\x20socket', 'error');
      this['websocket']['close']();
      this['RTPClient']['stopStreamFlush']();
      _0x1c91d5();
    });
  }
  ['onMessage'](_0x4f6b62) {
    if (!this['checkonmessage'] && this['player']) {
      let _0x5f4c98 = this['player']['parentNode']['getAttribute']('class')['replace']('loading_cam', '');
      this['player']['parentNode']['setAttribute']('class', _0x5f4c98);
    }
    this['checkonmessage'] = !![];
    this['RTPClient']['flush'](_0x4f6b62['data']);
  }
  ['urlParse'](_0x2c1ca1) {
    let _0x41cdd6 = null;
    let _0x5b29b0 = /^([^:]+):\/\/([^\/]+)(.*)$/;
    let _0x4f93b6 = _0x5b29b0['exec'](_0x2c1ca1);
    if (!_0x4f93b6) {
      Log('Lỗi\x20URL', 'error');
      return null;
    } else {
      let _0x221135 = {};
      _0x221135['protocol'] = _0x4f93b6[0x1];
      _0x221135['urlpath'] = _0x4f93b6[0x3];
      _0x221135['hostname'] = _0x4f93b6[0x2];
      let _0x2cc142 = _0x221135['urlpath']['split']('/');
      _0x221135['host_id'] = Date['now']();
      _0x221135['channel_id'] = _0x2cc142[0x3];
      this['channel_id'] = _0x221135['channel_id'];
      _0x221135['full'] =
        _0x221135['protocol'] +
        '://' +
        _0x221135['hostname'] +
        '/evup/' +
        _0x221135['host_id'] +
        '/' +
        _0x221135['channel_id'];
      if (_0x221135['protocol'] == 'ws') _0x41cdd6 = 'http';
      else if (_0x221135['protocol'] == 'wss') _0x41cdd6 = 'https';
      else return null;
      _0x221135['fullg'] = _0x41cdd6 + '://' + _0x221135['hostname'] + '/live/g/' + _0x221135['channel_id'] + '/';
      return _0x221135;
    }
  }
  ['CheckonMessage']() {
    this['checkInterval'] = setInterval(() => {
      if (!this['checkonmessage'])
        Log(
          this['channel_id'] +
            ':\x20Kết\x20nối\x20thành\x20công\x20nhưng\x20không\x20nhận\x20được\x20file\x20download,\x20kiểm\x20tra\x20link',
          'error'
        );
      clearInterval(this['checkInterval']);
    }, 0x1770);
  }
  ['hasData']() {
    return this['RTPClient']['sps_pps'];
  }
}
class RTPClient {
  constructor(_0x1b51d5) {
    this['remuxer'] = _0x1b51d5;
    this['sdp'] = new SDPParser();
    this['sps_pps'] = ![];
    this['sps'] = null;
    this['pps'] = null;
    this['seqMap'] = new Map();
    _Helper['_rtp_client'][_Helper['_rtpcount']] = this;
    this['_id'] = _Helper['_rtpcount']++;
    this['startFlush']();
  }
  ['clean']() {
    this['remuxer'] = null;
    this['sdp'] = null;
    _Helper['_rtp_client'][this['_id']] = null;
  }
  ['sdpparse'](_0x1afcc7) {
    this['sdp']
      ['parse'](_0x1afcc7)
      ['catch'](function () {
        throw new Error('Failed\x20to\x20parse\x20SDP');
      })
      ['then'](function () {
        return _0x1afcc7;
      });
    this['tracks'] = this['sdp']['getMediaBlockList']();
    let _0x136fa8 = [];
    for (let _0x5d5d67 of this['tracks']) {
      let _0x564d1b = this['sdp']['getMediaBlock'](_0x5d5d67);
      this['remuxer']['setTrack'](_0x564d1b, _0x136fa8[_0x5d5d67]);
    }
    this['startStreamFlush']();
    this['sps_pps'] = !![];
  }
  ['startStreamFlush']() {
    this['flushStreamInterval'] = setInterval(() => {
      if (this['remuxer']) this['remuxer']['flush']();
    }, 0x190);
  }
  ['startFlush']() {}
  ['stopStreamFlush']() {
    clearInterval(this['flushInterval']);
    clearInterval(this['flushStreamInterval']);
    this['clean']();
  }
  ['rtpdownload'](_0x540131, _0xfccefd) {
    this['seqMap']['set'](Number(_0xfccefd), null);
    try {
      let _0x34f6a8 = new XMLHttpRequest();
      _0x34f6a8['responseType'] = 'arraybuffer';
      _0x34f6a8['timeout'] = 0x1388;
      _0x34f6a8['_id'] = this['_id'];
      _0x34f6a8['_seq'] = Number(_0xfccefd);
      _0x34f6a8['open']('GET', _0x540131, !![]);
      _0x34f6a8['onload'] = function () {
        if (this['status'] == 0xc8) {
          if (_Helper['_rtp_client'][this['_id']]['seqMap']['has'](this['_seq']))
            _Helper['_rtp_client'][this['_id']]['seqMap']['set'](this['_seq'], this['response']);
        } else {
          if (_Helper['_rtp_client'][this['_id']]['seqMap']['has'](this['_seq']))
            _Helper['_rtp_client'][this['_id']]['seqMap']['delete'](this['_seq']);
        }
        _Helper['_rtp_client'][this['_id']]['flush']();
      };
      let _0xb270f7 = function (_0x159cf8) {
        if (_Helper['_rtp_client'][this['_id']]['seqMap']['has'](this['_seq']))
          _Helper['_rtp_client'][this['_id']]['seqMap']['delete'](this['_seq']);
        _Helper['_rtp_client'][this['_id']]['flush']();
      };
      _0x34f6a8['onerror'] = _0xb270f7;
      _0x34f6a8['ontimeout'] = _0xb270f7;
      _0x34f6a8['send'](null);
    } catch (_0x4cebbe) {
      if (this['seqMap']['has'](Number(_0xfccefd))) this['seqMap']['delete'](Number(_0xfccefd));
      console['log'](_0x4cebbe);
    }
  }
  ['flush'](_0x6222b) {
    try {
      let _0x2a3d76 = new Uint8Array(_0x6222b);
      if (_0x2a3d76['length'] < 0xc) return ![];
      if (this['sps_pps']) {
        let _0x40b20c = _0x2a3d76['subarray'](0xa);
        let _0x589a83 = new DataView(_0x40b20c['buffer'], _0x40b20c['byteOffset']);
        let _0x55de19 = _0x589a83['getUint8'](0x0);
        let _0x307b4e = _0x2a3d76['subarray'](0x0, 0x8);
        let _0x2d1dce = new DataView(_0x307b4e['buffer'], _0x307b4e['byteOffset'], _0x307b4e['byteLength']);
        let _0xf0545c = _0x2d1dce['getFloat64'](0x0);
        if ((_0x55de19 & 0x1f) != 0x1 || _0xf0545c != this['lastTS']) {
          this['remuxer']['feedRTP'](new RTP(_0x2a3d76, this['sdp']));
          this['lastTS'] = _0xf0545c;
        } else this['lastTS'] = _0xf0545c;
      } else {
        let _0x46deb5 = _0x2a3d76['subarray'](0xa);
        let _0x583f54 = new DataView(_0x46deb5['buffer'], _0x46deb5['byteOffset']);
        let _0x573de3 = _0x583f54['getUint8'](0x0);
        var _0x44a234 = _0x573de3 & 0x1f;
        if (_0x44a234 == 0x7) {
          this['sps'] = u8ToBase64(_0x46deb5);
        }
        if (_0x44a234 == 0x8) {
          this['pps'] = u8ToBase64(_0x46deb5);
        }
        if (this['pps'] !== null && this['sps'] !== null) {
          let _0x292cba =
            'v=0\x0ao=-\x200\x200\x20IN\x20IP4\x20127.0.0.1\x0as=mychns\x0ac=IN\x20IP4\x20127.0.0.1\x0at=0\x200\x0aa=tool:SonamVision\x0am=video\x200\x20RTP/AVP\x2096\x0aa=rtpmap:96\x20H264/90000\x0aa=fmtp:96\x20packetization-mode=1;\x20sprop-parameter-sets=' +
            this['sps'] +
            ',' +
            this['pps'] +
            ';\x20profile-level-id=4D001E\x0a';
          this['sdpparse'](_0x292cba);
        }
      }
    } catch (_0x36c15a) {
      console['log'](_0x36c15a);
      return ![];
    }
  }
}
export default class SoNamPlayer {
  constructor(_0x94096b, _0x573e3a) {
    if (typeof _0x94096b === typeof '') {
      this['player'] = document['getElementById'](_0x94096b);
    } else {
      this['player'] = _0x94096b;
    }
    this['wsSrc'] = _0x573e3a['transport'];
    this['errorListener'] = this['stop']['bind'](this);
    this['mse'] = new MSE([this['player']]);
    this['setSource']();
    this['transport'] = new WebsocketTransport(this['remuxer'], this['wsSrc'], this['player']);
  }
  ['isPlaying']() {
    return !(this['player']['paused'] || this['client']['paused']);
  }
  ['setSource']() {
    this['remuxer'] = new Remuxer();
    this['remuxer']['attachMSE'](this['mse']);
    this['mse']['eventSource']['addEventListener']('error', this['errorListener']);
  }
  ['start']() {
    this['client']['start']();
  }
  ['stop']() {
    this['remuxer'] = null;
    this['mse'] = null;
    this['player'] = null;
    this['transport']['onClose']({ change_flow: !![] });
  }
  ['hasData']() {
    return this['transport']['hasData']();
  }
  ['initPlayer']() {
    this['mse'] = new MSE([this['player']]);
    this['setSource']();
  }
}
let _Helper = {
  _rtpcount: 0x0,
  _rtp_client: [],
  _seqIdx: 0x0,
  _seqMap: [],
  _version: '1.5e4',
};
function Log(_0x1f15ed, _0x543a95) {
  console['log'](_0x543a95 + ':\x20' + _0x1f15ed);
}
