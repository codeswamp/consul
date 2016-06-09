import { Component }            from 'react';
import { bindActionCreators }   from 'redux';
import { connect }              from 'react-redux';

import Loading                  from '../application/loading.component';

import Meeting                  from '../meetings/meeting.component';

import { fetchRelatedMeetings } from './action_plans.actions';

class ActionPlanMeetings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    }
  }

  componentDidMount() {
    const { actionPlan, fetchRelatedMeetings } = this.props;

    fetchRelatedMeetings(actionPlan.id).then(() => {
      this.setState({ loading: false });
    });
  }

  render() {
    return (
      <div className="row action-plan-meetings-component">
        <div className="small-12 medium-12 column">
          <h2>{ I18n.t("proposals.show.meetings_title") }</h2>
          <Loading show={this.state.loading} />
          {this.renderMeetings()}
        </div>
      </div>
    );
  }

  renderMeetings() {
    const { actionPlan, useServerLinks } = this.props;
    const meetings = actionPlan.meetings || [];

    if (meetings.length > 0) {
      return (
        <div>
          <div className="meetings-directory">
            <div className="meetings-list">
              <ul className="meetings-list-items">
                { 
                  meetings.map((meeting) => 
                    <li key={ meeting.id }>
                      <Meeting meeting={ meeting } useServerLinks={ useServerLinks } />
                    </li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      );
    }
    return null;
  }
}

function mapStateToProps({ actionPlan }) {
  return { actionPlan };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRelatedMeetings }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionPlanMeetings);