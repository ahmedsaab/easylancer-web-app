import React from "react";
import { MDBSticky, MDBStickyContent } from "mdbreact";

const StickyPage = () => {
  return (
    <div style={{ height: '3500px' }}>
      <MDBStickyContent style={{ background: "#fff", height: "465px" }}>
        <MDBSticky>
          {({
              style,
            }) => {
            return (
              <div style={{
                ...style
              }}>
                <div style={{
                  width: "50%",
                  background: "#2f93ce",
                  color: "#fff",
                  padding: "10px 20px",
                  margin: "0"
                }}>
                  <h1>MDBSticky Content demo</h1>
                  <h4>Scroll down to see the effect</h4>
                </div>
              </div>
            );
          }}
        </MDBSticky>
        <div style={{ float: "left", width: "230px", padding: "10px 15px" }}>
          <h2>Static Widget</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam interdum luctus eros sed pretium. Proin turpis odio,
            viverra et tincidunt nec, tincidunt sed nisl.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam interdum luctus eros sed pretium.
          </p>
        </div>
        <div style={{
          width: "458px",
          padding: "0 20px",
          borderLeft: "1px solid #ccc",
          borderRight: "1px solid #ccc",
          float: "left"
        }}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            vestibulum lacus sed velit luctus tempus. Ut bibendum
            gravida rutrum. Phasellus et ipsum id ante interdum laoreet.
            Vivamus pharetra tortor sed libero interdum at volutpat arcu
            cursus. Vestibulum ante ipsum primis in faucibus orci luctus
            et ultrices posuere cubilia Curae; Maecenas porta tempor
            ullamcorper. Curabitur quis elit nisl. In tincidunt, purus
            eget commodo pretium, libero mauris egestas sem, in
            vestibulum sem lacus ac odio. Donec pharetra tristique
            nulla, non scelerisque mauris auctor in. Sed elit mauris,
            pellentesque sed iaculis id, condimentum eget sem. Maecenas
            at enim mi. Duis non nunc justo, vitae tristique purus.
            Quisque sagittis convallis elementum.
          </p>
        </div>
        <div style={{ float: "left", width: "230px", padding: "10px 15px" }}>
          <h2>Static Widget</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam interdum luctus eros sed pretium. Proin turpis odio,
            viverra et tincidunt nec, tincidunt sed nisl.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Etiam interdum luctus eros sed pretium.
          </p>
        </div>
      </MDBStickyContent>
    </div>
  );
}

export default StickyPage;
