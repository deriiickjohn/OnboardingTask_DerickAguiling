import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div >
        <h1>Home Page</h1>
        <p>Welcome to my Onboarding Task, built with:</p>
        <ul>
          <li><a href='https://get.asp.net/'>ASP.NET Core</a> and <a href='https://msdn.microsoft.com/en-us/library/67ef8sbd.aspx'>C#</a> for cross-platform server-side code</li>
          <li><a href='https://facebook.github.io/react/'>React</a> for client-side code</li>
          <li><a href='https://react.semantic-ui.com'>Semanti UI React</a> for layout and styling</li>
        </ul>
              </div>
    );
  }
}
