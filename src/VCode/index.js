import * as React from 'react';
import options from './config';
import './style.scss';

class VCode extends React.Component {
  static defaultProps = {
    // id: `${new Date().getTime()}_${Math.random().toFixed(4) * 1e5}`,
    className: '',
    len: 4, // 生成几位字符串
    lines: 10, // 生成多少根线
    width: 100, // 宽度
    height: 40, // 高度
    options,
    onChange: (value) => { console.log(value); },
  };
  constructor(props) {
    super(props);
    this.canvasDom = '';
    this.state = {
      ...props,
    };
  }
  componentWillMount() {
    const newOptions = {
      ...this.state.options,
      codes: [
        ...this.generateCodes(48, 58),
        ...this.generateCodes(65, 91),
        ...this.generateCodes(97, 123),
      ],
    };
    this.setState({
      options: newOptions,
    });
  }

  componentDidMount() {
    this.onDraw();
  }

  onDraw = () => {
    const context = this.canvasDom.getContext('2d');
    const { len, lines, width, height } = this.state;
     /* const ImgObj = new Image(); // eslint-disable-line
      ImgObj.src = this.props.value;
      ImgObj.onload = () => {
        context.drawImage(ImgObj, 0, 0, 100, 40);
      }; */
    const uW = width / len / 1.01; // 每个字符占的宽度
    context.fillStyle = '#e3e3e3';
    context.fillRect(0, 0, width, height);
    const codeValue = [];
    for (let i = 0; i < len; i++) { // eslint-disable-line
      codeValue.push(this.randomResource(this.state.options.codes));
      this.drawText(uW * i, height - 10, codeValue[i]);
    }

    for(let j = 0; j < lines; j++) { // eslint-disable-line
      this.drawLine(width, height);
    }
    this.props.onChange(codeValue.join(''));
  }

  onRefresh = () => {
    const context = this.canvasDom.getContext('2d');
    context.height = this.state.height;
    this.onDraw(this.state.value);
  }

  drawText = (x, y, value) => {
    const ctx = this.canvasDom.getContext('2d');
    ctx.save();
    const { fonts, fontSizeMin, fontSizeMax } = this.state.options;
    const fontSize = this.randInt(fontSizeMin, fontSizeMax);
    ctx.font = `${fontSize}px ${this.randomResource(fonts)}`;
    ctx.fillStyle = this.randomColor();
    ctx.textAlign = 'center';
    ctx.translate(x + (fontSize / 2), (y + fontSize) / 2);
    const rotateDeg = (this.randInt(0, 60) / 180) * Math.PI;
    ctx.rotate(this.randInt(0, 1) ? rotateDeg : -rotateDeg);
    ctx.fillText(value, 0, 0);
    ctx.restore();
  }

  drawLine(x, y) {
    const ctx = this.canvasDom.getContext('2d');
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.lineCap = 'round';
    ctx.moveTo(this.randInt(0, x), this.randInt(0, y));
    ctx.lineTo(this.randInt(0, x), this.randInt(0, y));
    ctx.strokeStyle = this.randomColor();
    ctx.stroke();
    ctx.restore();
  }

  randomResource(resource) {
    return resource[this.randInt(0, resource.length - 1)];
  }

  randInt = (n, m) => {
    const c = (m - n) + 1;
    return Math.floor((Math.random() * c) + n);
  }

  randomColor = () => {
    const elements = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];
    const colors = [];
    while (colors.length < 6) {
      colors.push(elements[Math.floor(Math.random() * elements.length)]);
    }
    return `#${colors.join('')}`;
  }

  generateCodes = (start, end) => {
    let index = start;
    const result = [];
    while (index < end) {
      result.push(String.fromCharCode(index));
      index += 1;
    }
    return result;
  }

  render() {
    const { className, width, height } = this.state;
    const classNames = className ? 'v-capture' : ['v-capture', className].join(' ');
    return (
      <div
        className={classNames}
        onClick={() => this.onRefresh()}
      >
        <canvas
          ref={(canvasDom) => {
            this.canvasDom = canvasDom;
          }}
          width={width}
          height={height}
        >
          您的浏览器不支持canvas标签。
        </canvas>
        <div className="v-tip">
          看不清？<span>换一张</span>
        </div>
      </div>
    );
  }
}

export default VCode;
