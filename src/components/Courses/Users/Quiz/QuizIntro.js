import React, { Component } from 'react'

export default class QuizStart extends Component {
  render() {
    return (
      <div>
        <div className="card p-4 mt-4">
        <h4>Test Syllabus</h4>
        <ul>
            <li>JavaScript Basics</li>
            <li>Javascript built-in objects</li>
            <li>Regular expressions</li>
            <li>Advanced topics</li>
            <li>Object oriented javascript</li>
            <li>Es6</li>
        </ul>
        </div>

        <div className="card p-4">
        <h4>Duration</h4>
        <ul>
            <li>40 Mins</li>
        </ul>
        </div>

        <div className="card p-4">
        <h4>Questions</h4>
        <ul>
            <li>40 multiple choice questions.</li>
        </ul>
        </div>

        <div className="card p-4">
        <h4>Instructions</h4>
        <ul>
            <li>Each question has between 2 and 8 options; one or more may be correct.</li>
            <li>In order to pass, you will need to answer at least 60% of the questions correctly.</li>
            <li>The clock timing of your test is located at the top of the test window.</li>
            <li>This test is best viewed using Internet Explorer version 11.0 or higher or Mozilla Firefox 45.0 or higher or
            Google Chrome 48 or higher.</li>
            <li>Questions will be displayed one at a time. A next button is provided at the bottom of the test page for
            navigating to the next question. Do not press the next button if you have not answered the question.</li>
            <li>Once you have answered a question, you cannot go back and change your answer.</li>
            <li>Do not use the shortcut menu options (mouse right-click) or the keyboard for navigating backwards or forwards
            within the test.</li>
            <li><b>There is a 1 day waiting period between test retakes. You can only take a test twice in a three months time
                window.</b></li>
        </ul>
        </div>
      </div>
    )
  }
}
