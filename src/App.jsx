import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
    };
  }
  render() {
    return (
      <div
        className="container-fluid d-flex justify-content-center align-items-center w-100 bg-dark"
        style={{ minHeight: "100vh", height: "100%" }}
      >
        <div style={{ height: "90vh" }} className="container-sm row">
          <textarea
            id="editor"
            placeholder="write something..."
            onChange={(e) =>
              this.setState({
                text: e.target.value,
              })
            }
            className="form-control bg-dark text- col mx-3"
            defaultValue={""}
          />
          <div style={{ height: "90vh" }} id="preview" className=" col mx-3">
            <ReactMarkdown
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      children={String(children).replace(/\n$/, "")}
                      style={dark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
              remarkPlugins={[remarkGfm]}
              className="form-control bg-dark text-white "
              readOnly
            >
              {this.state.text}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
