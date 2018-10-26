class Ability
  include CanCan::Ability

  def initialize(user)
   
      user ||= User.new
      if user.role == "admin"
        can :manage, :all
      elsif user.role == nil
        cannot :manage, :all
      end

  end
end
