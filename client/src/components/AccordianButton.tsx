import React, { Children, ReactElement, useState } from "react";

export type AccordianButtonProps = {
  name: string;
  children: ReactElement;
};

export function AccordianButton({ name, children }: AccordianButtonProps) {
  const [expanded, setExpanded] = useState(true);

  function toggle() {
    setExpanded(!expanded);
  }

  return (
    <div className={`accordian ${expanded ? "expanded" : "collapsed"}`}>
      <div className="section-title" onClick={toggle}>
        <h2 className="sectionName">{name} </h2>
        {expanded ? (
          <i className="fa fa-chevron-up"></i>
        ) : (
          <i className="fa fa-chevron-down"></i>
        )}
      </div>
      {expanded && <div className="accordian-children">{children}</div>}
    </div>
  );
}
