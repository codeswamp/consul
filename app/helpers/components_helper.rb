module ComponentsHelper
  def react_app(name, props = {})
    props.merge!({
      session: {
        signed_in: user_signed_in?,
        user: {
          id: current_user && current_user.id
        },
        is_organization: current_user && current_user.organization?,
        is_reviewer: current_user && current_user.reviewer?,
        can_create_new_proposals: @participatory_process && !@participatory_process_step.feature_enabled?(:proposals_readonly),
        can_create_action_plan: can?(:create, ActionPlan),
        proposal_votes_count: current_user ? current_user.proposal_votes(@participatory_process.proposals).keys.count : 0
      },
      participatory_process: {
        id: @participatory_process_id,
        step: {
          id: @participatory_process_step.id,
          flags: Step::FLAGS.inject({}) do |acc, feature|
            acc[feature] = @participatory_process_step.feature_enabled? feature
            acc
          end,
          settings: {
            proposal_vote_limit: @participatory_process_step.proposal_vote_limit
          }
        }
      },
      decidim_icons_url: asset_url("decidim-icons.svg")
    })
    react_component("#{name}App", props)
  end

  def static_map(options={})
    react_component(
      'StaticMap',
      latitude: options[:latitude],
      longitude: options[:longitude],
      zoom: options[:zoom],
      height: 120
    )
  end

  def autocomplete_input_address(options = {})
    resource = options[:resource]
    resource_name = resource.class.name.downcase

    react_component(
      'AutocompleteInputAddress',
      addressInputName: "#{resource_name}[address]",
      address: resource.address,
      latitudeInputName: "#{resource_name}[address_latitude]",
      latitude: resource.address_latitude,
      longitudeInputName: "#{resource_name}[address_longitude]",
      longitude: resource.address_longitude
    ) 
  end
end
