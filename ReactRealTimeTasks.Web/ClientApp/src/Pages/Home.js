import React, { Component } from 'react';
import { AuthContext } from '../AuthContext';
import { HubConnectionBuilder } from '@aspnet/signalr';

class Home extends Component {

  state = {
    connection: null,
    taskText: '',
    tasks: []
  }

  componentDidMount = async () => {
    const connection = new HubConnectionBuilder()
      .withUrl("/tasksHub").build();

    await connection.start();

    connection.on('RenderTasks', tasks => this.setState({ tasks }));

    connection.invoke("GetAll");

    this.setState({ connection });
  }

  onTaskSubmit = async () => {
    const { connection } = this.state;
    await connection.invoke("NewTask", this.state.taskText);
    this.setState({ taskText: '' });
  }

  onDoingItClick = id => {
    const { connection } = this.state;
    connection.invoke("setDoing", id);
  }

  onDoneClick = id => {
    const { connection } = this.state;
    connection.invoke("setDone", id);
  }

  getButton = (userId, task) => {
    if (task.handledBy && task.handledBy === userId) {
      return <button className='btn btn-success' onClick={() => this.onDoneClick(task.id)}>I'm done!</button>;
    }
    if (task.handledBy) {
      return <button className='btn btn-warning' disabled>{task.userDoingIt} is doing this</button>;
    }

    return <button className='btn btn-info doing' onClick={() => this.onDoingItClick(task.id)}>I'm doing this one!</button>
  }

  render() {
    return (
      <AuthContext.Consumer>
        {({ user }) => {
          return (
            <div>
              <div className="row">
                <div className="col-md-10">
                  <input type="text"
                    className="form-control"
                    placeholder="Task Title"
                    value={this.state.taskText}
                    onChange={e => this.setState({ taskText: e.target.value })} />
                </div>
                <div className="col-md-2">
                  <button className="btn btn-primary btn-block" onClick={this.onTaskSubmit}>Add Task</button>
                </div>
              </div>
              <table className="table table-hover table-striped table-bordered">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map(task => {
                    return <tr key={task.id}>
                      <td>{task.title}</td>
                      <td>
                        {this.getButton(user.id, task)}
                      </td>
                    </tr>
                  })}
                </tbody>
              </table>
            </div>
          )
        }}
      </AuthContext.Consumer>
    );
  }
}

export default Home;