"use strict";

var React = require('react');

var About = React.createClass({

    render: function () {
        return (<div>
                <h1>About</h1>
                <p>
                    This application uses the following technologies and libraries:
                    <ul>
                        <li>React</li>
                        <li>React Router</li>
                        <li>Flux</li>
                        <li>NodeJS</li>
                        <li>Gulp</li>
                    </ul>
                </p>
            </div>
        );
    }
});

module.exports = About;
