import React, { Component, createRef } from "react";
import logo from "./logo.svg";
import { TextSvg } from "./text-svg";
import Button from "antd/lib/button";
import "./App.css";

class App extends Component<{}, { isAnimating: boolean }> {
  private svgElement = createRef<SVGElement>();

  constructor(props: {}) {
    super(props);
    this.state = {
      isAnimating: false
    };
  }

  handleAnimateClick = () => {
    this.setState({ isAnimating: true });

    const svg = this.svgElement.current;
    if (svg) {
      svg.childNodes.forEach((x, i) => {
        const path = x as SVGGeometryElement;
        // In certain cases, length here might be longer than the actual paths, e.g. 'A' in the example
        const length = path.getTotalLength();
        const delayPerLetter = 0.2;
        const delay = i * delayPerLetter; // in seconds
        const duration = 2; // in seconds
        this.addAnimateStyle(path, length, duration, delay);
        setTimeout(() => {
          this.removeAnimateStyle(path);
        }, (duration + delay) * 1000);
      });
    }
    setTimeout(() => {
      this.setState({
        isAnimating: false
      });
    }, 2400);
  };

  addAnimateStyle = (
    element: SVGGeometryElement,
    elementLength: number,
    duration: number,
    delay: number
  ) => {
    element.style.strokeDasharray = elementLength.toString();
    element.style.strokeDashoffset = elementLength.toString();
    // Add animation start delay for each character
    element.style.animation = `stroke-animation ${duration}s ease forwards ${delay}s`;
  };

  removeAnimateStyle = (element: SVGGeometryElement) => {
    element.style.strokeDasharray = null;
    element.style.strokeDashoffset = null;
    element.style.animation = "";
  };

  render() {
    const { isAnimating } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <a href="https://reactjs.org/" target="_blank">
            <img src={logo} alt="react-link" className="React-link" />
          </a>
          <a
            href="https://github.com/davidcui2/svg-text-animation"
            target="_blank"
          >
            <img
              src="https://github.com/fluidicon.png"
              alt="github-link"
              className="Github-link"
            />
          </a>

          <TextSvg className="Svg-logo" svgRef={this.svgElement} />
          <div>
            <Button
              className="Action-button"
              onClick={this.handleAnimateClick}
              disabled={isAnimating}
            >
              Animate
            </Button>
          </div>
        </header>
      </div>
    );
  }
}

export default App;
