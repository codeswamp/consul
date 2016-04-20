import { Component }          from 'react';
import { connect }            from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchComments}       from './comments.actions';

import AuthorAvatar           from '../application/author_avatar.component';

export class Comments extends Component {
  componentDidMount() {
    const { commentableId, commentableType, fetchComments } = this.props;

    fetchComments({ commentableId, commentableType });
  }

  render() {
    const { comments } = this.props;

    if (comments && comments.length > 0) {
      return (
        <section className="row-full comments">
          <div className="row">
            <div id="comments" className="small-12 column">
              <h2>TODO</h2>
              {
                comments.map(comment => (
                  <div key={comment.id} className="row">
                    <div id={`comment_${comment.id}`} className="comment small-12 column">
                      <AuthorAvatar author={{name: "David"}} />
                      <div className="comment-body">
                        <div className="comment-info">
                          <span className="user-name">David</span>
                          &nbsp;&bull;&nbsp;
                          <time>{comment.created_at}</time>
                        </div>
                        <div className="comment-user">
                          { comment.body }
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </section>
      );
    }
    return null;
  }
}

function mapStateToProps(state, { commentableType }) {
  const resource = state[commentableType.toLowerCase()];
  const comments = resource && resource.comments;

  return { 
    comments
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchComments }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Comments);
//  <div class="row">
//  	<div id="<%= dom_id(comment) %>" class="comment small-12 column <%= comment_class_names comment, comment.commentable.author %>" data-timestamp="<%= comment.created_at.to_i%>">
//
//      <% if comment.hidden? || comment.user.hidden? %>
//        <% if comment.children.size > 0 %>
//          <div class="is-deleted">
//            <p><%= t("comments.comment.deleted") %></p>
//          </div>
//        <% end %>
//      <% else %>
//        <% if comment.as_administrator? %>
//          <%= image_tag("admin_avatar.png", size: 32, class: "admin-avatar left") %>
//        <% elsif comment.as_moderator? %>
//          <%= image_tag("moderator_avatar.png", size: 32, class: "moderator-avatar left") %>
//        <% else %>
//        <% if comment.user.hidden? || comment.user.erased? %>
//            <i class="icon-deleted user-deleted"></i>
//          <% elsif comment.user.organization? %>
//            <%= image_tag("collective_avatar.png", size: 32, class: "avatar left") %>
//          <% else %>
//            <%= avatar_image(comment.user, seed: comment.user_id, size: 32, class: "left") %>
//          <% end %>
//        <% end %>
//
//        <div class="comment-body">
//          <div class="comment-info">
//
//            <% if comment.as_administrator? %>
//              <span class="user-name"><%= t("comments.comment.admin") %> #<%= comment.administrator_id%></span>
//            <% elsif comment.as_moderator? %>
//              <span class="user-name"><%= t("comments.comment.moderator") %> #<%= comment.moderator_id%></span>
//            <% else %>
//
//              <% if comment.user.hidden? || comment.user.erased? %>
//                <span class="user-name"><%= t("comments.comment.user_deleted") %></span>
//              <% else %>
//                <span class="user-name"><%= link_to comment.user.name, user_path(comment.user) %></span>
//                <% if comment.user.official? %>
//                  &nbsp;&bull;&nbsp;
//                  <span class="label round level-<%= comment.user.official_level %>">
//                    <%= official_position(comment.user) %>
//                  </span>
//                <% end %>
//              <% end %>
//
//              <% if comment.commentable.arguable? && comment.alignment %>
//                &nbsp;&bull;&nbsp;
//                <% if comment.alignment > 0 %>
//                  <span class="success round label">
//                    <%= t('comments.form.alignment.positive') %>
//                  </span>
//                <% elsif comment.alignment < 0 %>
//                  <span class="alert round label">
//                    <%= t('comments.form.alignment.negative') %>
//                  </span>
//                <% else %>
//                  <span class="secondary round label">
//                    <%= t('comments.form.alignment.neutral') %>
//                  </span>
//                <% end %>
//              <% end %>
//
//              <% if comment.user.verified_organization? %>
//                &nbsp;&bull;&nbsp;
//                <span class="label round is-association">
//                  <%= t("shared.collective") %>
//                </span>
//              <% end %>
//              <% if comment.user_id == comment.commentable.author_id %>
//                &nbsp;&bull;&nbsp;
//                <span class="label round is-author">
//                  <%= t("comments.comment.author") %>
//                </span>
//              <% end %>
//
//            <% end %>
//
//            &nbsp;&bull;&nbsp;<time><%= l comment.created_at.to_datetime, format: :datetime %></time>
//          </div>
//
//          <div class="comment-user">
//            <%= simple_format text_with_links comment.body %>
//          </div>
//
//          <div id="<%= dom_id(comment) %>_reply" class="reply">
//            <span id="<%= dom_id(comment) %>_votes" class="comment-votes right">
//              <%= render 'comments/votes', comment: comment %>
//            </span>
//
//            <%= t("comments.comment.responses", count: comment.children.size) %>
//
//            <% if user_signed_in? %>
//              <span class="divider">&nbsp;|&nbsp;</span>
//              <%= link_to(comment_link_text(comment), "",
//                          class: "js-add-comment-link", data: {'id': dom_id(comment)}) %>
//
//              <%= render 'comments/actions', comment: comment %>
//
//              <%= render 'comments/form', {commentable: comment.commentable, parent_id: comment.id, toggeable: true} %>
//            <% end %>
//          </div>
//        </div>
//      <% end %>
//
//      <div class="comment-children">
//        <% child_comments_of(comment).each do |child| %>
//          <%= render 'comments/comment', comment: child %>
//        <% end %>
//      </div>
//    </div>
//  </div>
//<% end %>
