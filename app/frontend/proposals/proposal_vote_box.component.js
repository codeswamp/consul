import { Component }          from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';

import { voteProposal }       from './proposals.actions';

class ProposalVoteBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCantVoteOverlay: false
    };
  }

  render() {
    return (
      <div className="text-center"
        onMouseLeave={() => { this.setState({ showCantVoteOverlay: false }) }}>
        <div className="supports vote-box">
          <div className="support-progress">
            <span className="total-supports">
              <span className="supports-count">{ this.props.totalVotes }</span>
              {I18n.t("proposals.proposal.supports", { count: "" })}&nbsp;
            </span>
            <div className="proposal-comments">
              <i className="icon-comments"></i>&nbsp;
              <a>{I18n.t("proposals.proposal.comments", { count: this.props.totalComments })}</a>
            </div>
          </div>
          <div className="in-favor">
            {this.renderVoteButton()}
          </div>
          {this.renderShare()}
          {this.renderCantVoteOverlay()}
        </div>
      </div>
    )
  }

  renderVoteButton() {
    if(this.props.voted) { 
      return (
        <div className="supported">
          {I18n.t("proposals.proposal.already_supported")}
        </div>
      )
    } else {
      return (
        <button 
          className="button button-support tiny radius expand" 
          title={I18n.t('proposals.proposal.support_title')}
          onClick={() => { this.props.voteProposal(this.props.proposalId) }}
          onMouseEnter={() => { this.setState({ showCantVoteOverlay: true }) }}>
          {I18n.t("proposals.proposal.support")}
        </button>
      )
    }
  }

  renderShare() {
      if(this.props.voted) { 
        return (
          <div className="share-supported">
            <div className="share-buttons">
              <div className="social-share-button">
                <a
                  rel="nofollow" 
                  data-site="twitter" 
                  className="social-share-button-twitter" 
                  onClick={(event) => { SocialShareButton.share(event.target) }} 
                  title="Comparteix a Twitter"/>
                <a
                  rel="nofollow" 
                  data-site="facebook" 
                  className="social-share-button-facebook" 
                  onClick={(event) => { SocialShareButton.share(event.target) }} 
                  title="Comparteix a Facebook"/>
                <a
                  rel="nofollow" 
                  data-site="google_plus" 
                  className="social-share-button-google_plus" 
                  onClick={(event) => { SocialShareButton.share(event.target) }} 
                  title="Comparteix a Google+"/>
              </div>
              <a 
                className="whatsapp-share" 
                href="whatsapp://send?text=#{proposal.title} #{proposal_url(proposal)}" 
                data-action="share/whatsapp/share">
                <i className="fa fa-whatsapp" />
              </a>
            </div>
          </div>
        )
      }
      return null;
  }

  renderCantVoteOverlay() {
    let session = this.props.session,
        cantVote = !session.signed_in ||
          session.signed_in && !this.props.votable ||
          session.signed_in && session.is_organization;

    if (cantVote && this.state.showCantVoteOverlay) {
      if (session.signed_in && session.is_organization) {
        return (
          <div className="organizations-votes">
            <p>{ I18n.t("votes.organizations") }</p>
          </div>
        );
      } else if (session.signed_in && !this.props.votable) {
        return (
          <div className="anonymous-votes">
            <p dangerouslySetInnerHTML={{ __html: I18n.t('votes.verified_only', {
              verify_account: `<a href="/verification">${I18n.t("votes.verify_account")}</a>`,
            })}} />
          </div>
        );
      } else if (!session.signed_in) {
        return (
          <div 
            className="not-logged" 
            dangerouslySetInnerHTML={{ __html: I18n.t('votes.unauthenticated', {
              signin: `<a href="/users/sign_in">${I18n.t("votes.signin")}</a>`,
              signup: `<a href="/users/sign_up">${I18n.t("votes.signup")}</a>`
            })}} />
        )
      }
    }
    return null;
  }
}

function mapStateToProps({ session }) {
  return { session };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ voteProposal }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ProposalVoteBox);

//if(this.state.loading) {
//  return (
//    <div className="loading-component votes">
//      <span className="fa fa-spinner fa-spin"></span>
//    </div>
//  )
//} else {
//}