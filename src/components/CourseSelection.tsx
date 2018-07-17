import * as React from 'react';
import courses from '../courses';

export interface CourseSelectionState {
  [key: string]: boolean;
}

export class CourseSelection extends React.Component<{}, CourseSelectionState> {

  public constructor(props: any) {
    super(props);
    const state: CourseSelectionState = {};
    for (const course in courses) {
      if (courses.hasOwnProperty(course)) {
        state[course] = false;
      }
    }
    this.state = state;
  }

  public handleChange = (event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;
    const value = target.checked;
    const name = target.value;
    this.setState({ [name]: value });
  }

  public selectAll = (event: React.FormEvent<EventTarget>) => {
    const state: CourseSelectionState = {};
    for (const course in courses) {
      if (courses.hasOwnProperty(course)) {
        state[course] = true;
      }
    }
    this.setState(state);
    event.preventDefault(); // why is this needed?
  }

  public render() {
    const coursesList = Object.keys(courses).map((key) => {
      return (
        <div className='form-check'>
          <input
            className='form-check-input'
            type='checkbox'
            name='courses'
            id={'course-' + key}
            key={key}
            value={key}
            checked={this.state[key]}
            onChange={this.handleChange}
          />
          <label className='form-check-label' htmlFor={'course-' + key}>{courses[key]}</label>
        </div>
      );
    });
    return (
      <div>
        <h2>Choose Your Courses</h2>
        <div className='form-group'>
          {coursesList}
        </div>
        <button className='btn' onClick={this.selectAll}>Select All</button>
      </div>
    );
  }
}
