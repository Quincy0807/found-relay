import React from 'react';
import warning from 'warning';

export default function renderElement(
  match, Component, hasComponent, readyState,
) {
  const { route } = match;
  const { props } = readyState;

  if (!route.render) {
    warning(
      hasComponent,
      'Route with query %s has no render method or component.',
      route.query().name,
    );

    if (!Component || !props) {
      return null;
    }

    return <Component {...match} {...props} />;
  }

  return route.render({
    ...readyState,
    match,
    Component,
    props: props && { ...match, ...props },
  });
}
