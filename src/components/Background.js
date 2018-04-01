import React, { Component } from 'react';
import PropTypes from 'prop-types';
import slimeDrop from '../Images/slime_drop.svg';

let animation = null;
const maxWarp = 0.4; // Max factor for eye warp
const warpSpeed = 80.0; // Higher = slower
const numOfDrops = 20;

function mutatePoint(x, xBase, y, yBase, increase) {
  const newPoint = {
    x,
    y,
    increase,
  };
  if (newPoint.increase) {
    newPoint.x += (Math.random() / warpSpeed);
    newPoint.y += (Math.random() / warpSpeed);

    if (newPoint.x >= xBase + maxWarp) {
      newPoint.x = xBase + maxWarp;
      newPoint.increase = false;
    }

    if (newPoint.y >= yBase + maxWarp) {
      newPoint.y = yBase + maxWarp;
      newPoint.increase = false;
    }
  } else {
    newPoint.x -= (Math.random() / warpSpeed);
    newPoint.y -= (Math.random() / warpSpeed);

    if (newPoint.x <= xBase - maxWarp) {
      newPoint.x = xBase - maxWarp;
      newPoint.increase = true;
    }

    if (newPoint.y <= yBase - maxWarp) {
      newPoint.y = yBase - maxWarp;
      newPoint.increase = true;
    }
  }
  return newPoint;
}

class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slimeDrops: [],
      upperEyeMP:
      {
        cp1xBase: 3,
        cp1yBase: 1.25,
        cp1Increase: true,
        cp2xBase: 6,
        cp2yBase: 2.25,
        cp2Increase: true,
        cp1x: 3,
        cp1y: 1.25,
        cp2x: 6,
        cp2y: 2.25,
      },
      lowerEyeMP:
      {
        cp1xBase: 3,
        cp1yBase: 7,
        cp1Increase: true,
        cp2xBase: 1.5,
        cp2yBase: 3.8,
        cp2Increase: true,
        cp1x: 3,
        cp1y: 7,
        cp2x: 1.5,
        cp2y: 3.8,
      },
    };
  }
  componentDidMount() {
    this.drawTheEye();
  }
  componentWillUnmount() {
    if (animation) cancelAnimationFrame(animation);
  }
  drawTheSlime(c, ctx) {
    const slimeImage = new Image();
    slimeImage.src = slimeDrop;

    ctx.beginPath();
    ctx.rect(0, 0, c.width, c.height);
    ctx.fillStyle = '#e809bf';
    ctx.fill();

    for (let x = 0; x < this.state.slimeDrops.length; x += 1) {
      const drop = this.state.slimeDrops[x];

      ctx.drawImage(slimeImage, drop.x, drop.y);
    }

    this.mutateTheSlime(c);
  }
  mutateTheSlime(c) {
    const newDrops = this.state.slimeDrops.slice(0);

    if (newDrops.length === 0) {
      // Generate some slime drops
      for (let x = 0; x < numOfDrops; x += 1) {
        newDrops.push({ x: Math.random() * c.width, y: Math.random() * c.height });
      }
    } else {
      for (let x = 0; x < newDrops.length; x += 1) {
        const drop = newDrops[x];

        if (drop.y < c.height) {
          drop.y = drop.y < 0 ? drop.y + 1 : drop.y + 2;
        } else {
          drop.y = -60;
          drop.x = Math.random() * c.width;
        }
      }
    }

    this.setState({ ...this.State, slimeDrops: newDrops });
  }
  drawTheEye() {
    const c = document.getElementById('background');
    const ctx = c.getContext('2d');

    const cYSeg = c.height / 8;
    const cXSeg = c.width / 8;

    ctx.clearRect(0, 0, c.width, c.height);

    this.drawTheSlime(c, ctx);

    // eye
    ctx.fillStyle = `rgb(${this.props.baseColorR}, ${this.props.baseColorG}, ${this.props.baseColorB})`;
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(cXSeg, 4 * cYSeg);
    // bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y)
    // eslint-disable-next-line max-len
    ctx.bezierCurveTo(this.state.upperEyeMP.cp1x * cXSeg, this.state.upperEyeMP.cp1y * cYSeg, this.state.upperEyeMP.cp2x * cXSeg, this.state.upperEyeMP.cp2y * cYSeg, 7 * cXSeg, 4 * cYSeg);
    // eslint-disable-next-line max-len
    ctx.bezierCurveTo(this.state.lowerEyeMP.cp1x * cXSeg, this.state.lowerEyeMP.cp1y * cYSeg, this.state.lowerEyeMP.cp2x * cXSeg, this.state.lowerEyeMP.cp2y * cYSeg, cXSeg, 4 * cYSeg);

    ctx.stroke();
    ctx.fill();

    // pupil
    ctx.fillStyle = 'black';
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    // arc(x, y, radius, startAngle, endAngle, anticlockwise)
    ctx.arc(4 * cXSeg, 4 * cYSeg, 0.75 * cYSeg, 0, Math.PI * 2, false);
    ctx.fill();

    this.mutateTheEye();

    animation = requestAnimationFrame(this.drawTheEye.bind(this));
  }
  mutateTheEye() {
    const up = Object.assign({}, this.state.upperEyeMP);
    const low = Object.assign({}, this.state.lowerEyeMP);

    let mutatedPoint = mutatePoint(up.cp1x, up.cp1xBase, up.cp1y, up.cp1yBase, up.cp1Increase);
    up.cp1x = mutatedPoint.x;
    up.cp1y = mutatedPoint.y;
    up.cp1Increase = mutatedPoint.increase;

    mutatedPoint = mutatePoint(up.cp2x, up.cp2xBase, up.cp2y, up.cp2yBase, up.cp2Increase);
    up.cp2x = mutatedPoint.x;
    up.cp2y = mutatedPoint.y;
    up.cp2Increase = mutatedPoint.increase;

    mutatedPoint = mutatePoint(low.cp1x, low.cp1xBase, low.cp1y, low.cp1yBase, low.cp1Increase);
    low.cp1x = mutatedPoint.x;
    low.cp1y = mutatedPoint.y;
    low.cp1Increase = mutatedPoint.increase;

    mutatedPoint = mutatePoint(low.cp2x, low.cp2xBase, low.cp2y, low.cp2yBase, low.cp2Increase);
    low.cp2x = mutatedPoint.x;
    low.cp2y = mutatedPoint.y;
    low.cp2Increase = mutatedPoint.increase;

    this.setState({
      upperEyeMP: up,
      lowerEyeMP: low,
    });
  }
  render() {
    return (
      <canvas id="background" width={window.innerWidth} height={window.innerHeight} />
    );
  }
}

componentName.propTypes = {
  baseColorR: PropTypes.number.isRequired,
  baseColorG: PropTypes.number.isRequired,
  baseColorB: PropTypes.number.isRequired,
};

export default componentName;
